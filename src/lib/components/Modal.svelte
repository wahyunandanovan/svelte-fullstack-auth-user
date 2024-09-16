<script lang="ts">
   export let show: boolean;
   export let onClose: () => void;
 </script>
 
 {#if show}
   <div class="modal" on:click={onClose} role="dialog" aria-modal="true">
     <div class="modal-content" on:click|stopPropagation>
       <slot></slot>
       <button class="close" on:click={onClose} aria-label="Close">Close</button>
     </div>
   </div>
 {/if}

 <style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: white;
    padding: 3rem 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
  }

  .close:hover {
    background: #c82333;
  }

</style>
 