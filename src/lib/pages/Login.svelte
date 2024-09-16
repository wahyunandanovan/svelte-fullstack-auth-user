<script lang="ts">
   import { onMount } from 'svelte';
	import '../../app.css';
  import { goto } from '$app/navigation';


   let email = '';
   let password = '';
   let loggedInUser: { email: string } | null = null;
   let errorMessage = '';

   const login = async () => {
      const res = await fetch('/api/auth', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
         await checkAuth();
         goto('/users')
         errorMessage = '';
      } else {
         const error = await res.json();
         errorMessage = error.message;
      }
   };


   const checkAuth = async () => {
      const res = await fetch('/api/auth');
      if (res.ok) {
         const data = await res.json();
         loggedInUser = data.user;
         if (loggedInUser) {
            goto('/users');
         }
      } else {
         loggedInUser = null;
      }
   };

   onMount(() => {
      checkAuth();
   });
</script>

<div class="container">
      <form class="login-form" on:submit|preventDefault={login}>
         <h2>Login</h2>
         <div class="input-group">
            <label for="email">email</label>
            <input id="email" type="email" bind:value={email} placeholder="Enter your email" required />
         </div>
         <div class="input-group">
            <label for="password">Password</label>
            <input id="password" type="password" bind:value={password} placeholder="Enter your password" required />
         </div>
         {#if errorMessage}
            <p class="error">*{errorMessage}</p>
         {/if}
         <button type="submit" class="btn login">Login</button>
      </form>
  
</div>

<style lang="css">
   .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 1rem;
   }

   .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
      box-sizing: border-box; 
   }

   .input-group {
      margin-bottom: 1rem;
      text-align: left;
      width: 100%;
   }

   .input-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
   }

   .input-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
      box-sizing: border-box; 
   }

   .input-group input:focus {
      border-color: #007BFF;
      outline: none;
   }

   .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
      box-sizing: border-box;
   }

   .btn.login {
      background-color: #007BFF;
      color: white;
   }

   .btn.login:hover {
      background-color: #0056b3;
   }

  

   .error {
      color: #dc3545;
      margin-bottom: 1rem;
		text-align: start;
   }

   @media (max-width: 500px) {
      .login-form {
         padding: 1.5rem;
      }
   }
</style>

