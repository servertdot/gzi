<script lang="ts" setup>
import { Hotkey } from './types';

  const props = defineProps<{
    hotkey: Hotkey
  }>()
</script>

<template>
  <div class="hotkey-wrapper">
    <div class="hotkey-title">{{ hotkey.title }}</div>
    <div class="hotkey-keys">{{ hotkey.keys }}</div>
  </div>
</template>

<style scoped>
  .hotkey-wrapper {
    /* display: flex;
    justify-content: space-between; */
    align-items: center;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    margin-bottom: 8px;
    padding: 4px 8px;
  }

  .hotkey-title {
    text-align: center;
    padding: 0 8px;
    border-radius: 12px;
    background-color: var(--base-accent);
  }

  .hotkey-arrow {
    text-align: center;
  }

  .hotkey-keys {
    text-align: center;
    padding: 0 8px;
    border-radius: 12px;
    background-color: var(--base-accent);
  }
</style>