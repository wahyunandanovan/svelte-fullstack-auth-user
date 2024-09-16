<script lang="ts">
   import { goto } from '$app/navigation';
  import Modal from '$lib/components/Modal.svelte';
  import UserForm from '$lib/components/UserForm.svelte';
  import UserList from '$lib/components/UserList.svelte';
   import { UserRole, type User } from '$lib/interfaces/user';
   import { onMount } from 'svelte';

 
   let users: User[] = [];
   let newUser: Omit<User, 'id'> = { name: '', email: '', password: '', role: UserRole.USER };
   let selectedUser: User | null = null;
   let showCreateModal = false;
   let showEditModal = false;
 
   const fetchUsers = async () => {
     try {
       const res = await fetch('/api/users');
       if (res.ok) {
         users = await res.json();
       } else {
         console.error('Failed to fetch users');
       }
     } catch (error) {
       console.error('Error fetching users:', error);
     }
   };
 
   const createUser = async () => {
     try {
       const res = await fetch('/api/users', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newUser)
       });
       if (res.ok) {
         await fetchUsers();
         newUser = { name: '', email: '', password: '', role: UserRole.USER };
         showCreateModal = false;
       } else {
         console.error('Failed to create user');
       }
     } catch (error) {
       console.error('Error creating user:', error);
     }
   };
 
   const updateUser = async () => {
     if (!selectedUser) return;
     try {
       const res = await fetch('/api/users', {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(selectedUser)
       });
       if (res.ok) {
         await fetchUsers();
         selectedUser = null;
         showEditModal = false;
       } else {
         console.error('Failed to update user');
       }
     } catch (error) {
       console.error('Error updating user:', error);
     }
   };
 
   const deleteUser = async (id: string) => {
     try {
       const res = await fetch('/api/users', {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id })
       });
       if (res.ok) {
         await fetchUsers();
       } else {
         console.error('Failed to delete user');
       }
     } catch (error) {
       console.error('Error deleting user:', error);
     }
   };
 
   const logout = async () => {
     try {
       const res = await fetch('/api/auth', { method: 'DELETE' });
       if (res.ok) {
         goto('/');
       } else {
         console.error('Failed to logout');
       }
     } catch (error) {
       console.error('Error logging out:', error);
     }
   };
 
   const checkAuth = async () => {
     try {
       const res = await fetch('/api/auth');
       if (res.ok) {
         return await res.json();
       } else {
         goto('/users');
       }
     } catch (error) {
       console.error('Error checking authentication:', error);
       goto('/users');
     }
   };
 
   onMount(() => {
     fetchUsers();
     checkAuth();
   });
 </script>
 
 <div class="user-management">
   <h2>User List</h2>
   <div class="btn-group">
     <button class="create-btn" on:click={() => showCreateModal = true}>Create User</button>
     <button class="logout-btn" on:click={logout}>Logout</button>
   </div>
 
   <UserList {users} onEdit={(user) => { selectedUser = { ...user }; showEditModal = true; }} onDelete={deleteUser} />
 
   <Modal show={showCreateModal} onClose={() => showCreateModal = false}>
     <UserForm user={newUser} onSubmit={createUser} />
   </Modal>
 
   <Modal show={showEditModal} onClose={() => showEditModal = false}>
     {#if selectedUser}
       <UserForm user={selectedUser} onSubmit={updateUser} />
     {/if}
   </Modal>
 </div>
 
 <style>
   .user-management {
     padding: 20px;
     max-width: 800px;
     margin: 0 auto;
   }
 
   h2 {
     margin-bottom: 16px;
     color: #333;
   }
 
   .btn-group {
     display: flex;
     justify-content: end;
     width: 100%;
     gap: 1rem;
   }
 
   .create-btn, .logout-btn {
     padding: 12px;
     border: none;
     border-radius: 4px;
     font-size: 16px;
     font-weight: 700;
     cursor: pointer;
   }
 
   .create-btn {
     background-color: #28a745;
     color: white;
   }
 
   .logout-btn {
     background-color: #dc3545;
     color: white;
   }
 
   .btn-group button:hover {
     opacity: 0.8;
   }
 </style>
 