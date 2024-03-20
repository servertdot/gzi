<script setup lang="ts">
  import Chat from "./components/Chat.vue";
  import Settings from "./components/settings/Settings.vue";
  import {isSettingsOpen} from './store'

  window.electron.ipcRenderer.on('is-show-settings', (_, data: boolean) => {
    isSettingsOpen.value = data;
  });
</script>

<template>
  <div>
    <div class="titlebar"></div>
  </div>
  <div class="wrapper">
    <!-- <Sidebar /> -->
    <Chat />
    <Settings v-if="isSettingsOpen" />
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    gap: 16px;
    /* height: 100vh; */
    /* padding: 20px; */
  }

  .titlebar {
    position: absolute;
    height: 24px;
    width: 100%;
    z-index: 10000;
    top: 0;
    -webkit-app-region: drag;
  }
</style>
