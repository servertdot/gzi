<script lang="ts" setup>
  defineProps<{
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
  }>()
</script>

<template>
  <button 
    :disabled="disabled"
    class="button"
    @click="onClick" 
    :class="className"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    outline: 0;
    border: 0;
    font-size: 16px;
    /* width: calc(100% - 32px); */
    width: 120px;
    height: 100%;
    border-radius: 4px;

    background-color: var(--base-white);
    border: 1px solid #E4E4E7;
    /* box-shadow: 0 0 1px rgba(0,0,0,0.5); */

    /* box-shadow: 0px 1px 2px 0px #1018280D; */

    color: var(--base-black);
    transition: all .3s ease-in-out;
    
  }

  .button:hover {
    /* box-shadow: 0 0 2px rgba(0,0,0,0.5); */
    box-shadow: 0px 1px 2px 0px #1018280d;

    /* color: var(--base-accent); */
  }

  .button:active {
    color: var(--base-accent);
  }

  .button:disabled {
    color: var(--base-gray);
  }
</style>