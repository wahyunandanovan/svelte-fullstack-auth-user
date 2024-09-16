<script lang="ts">
  import type { User } from "$lib/interfaces/user";

 
   export let users: User[] = [];
   export let onEdit: (user: User) => void;
   export let onDelete: (id: string) => void;
 </script>
 
 <table class="user-table">
   <thead>
     <tr>
       <th>Name</th>
       <th>Email</th>
       <th>Role</th>
       <th>Actions</th>
     </tr>
   </thead>
   <tbody>
     {#each users as user}
       <tr>
         <td>{user.name}</td>
         <td>{user.email}</td>
         <td>{user.role}</td>
         <td>
           <button on:click={() => onEdit(user)}>Edit</button>
           <button on:click={() => onDelete(user.id)}>Delete</button>
         </td>
       </tr>
     {/each}
   </tbody>
 </table>
 

 <style>
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  .user-table th, .user-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .user-table th {
    background-color: #f4f4f4;
  }

  .user-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }


  .user-table button {
    margin-right: 5px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  .user-table button:hover {
    background-color: #0056b3;
  }


</style>