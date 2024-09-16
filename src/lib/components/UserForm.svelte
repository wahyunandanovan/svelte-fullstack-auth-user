<script lang="ts">
  import { UserRole, type User } from '$lib/interfaces/user';
  import { createEventDispatcher } from 'svelte';

  export let user: Omit<User, 'id'> | null = null;
  export let onSubmit: () => void;

  const dispatch = createEventDispatcher();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    dispatch('submit');
    onSubmit();
  };
</script>

{#if user}
  <form on:submit|preventDefault={handleSubmit} class="user-form">
    <input type="text" bind:value={user.name} placeholder="Name" required />
    <input type="email" bind:value={user.email} placeholder="Email" required />
    {#if user.password !== undefined}
      <input type="password" bind:value={user.password} placeholder="Password" required />
    {/if}
    <select bind:value={user.role}>
      <option value={UserRole.USER}>User</option>
      <option value={UserRole.ADMIN}>Admin</option>
    </select>
    <button type="submit">{'id' in user ? 'Update User' : 'Create User'}</button>
  </form>
{/if}

<style>
  .user-form input, .user-form select {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .user-form button {
    padding: 10px;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }

  .user-form button:hover {
    background-color: #218838;
  }
</style>
