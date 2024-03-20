<script lang="ts" setup>
  import { computed, effect, ref } from 'vue'
  import { selectedChatId, isShowChatsModal, chats } from '../store'
  import ChatsModal from './ChatsModal.vue';

  const selectedChat = computed(() => chats.value[selectedChatId.value - 1]);
  const webviewRef = ref();

  // webviewRef.value && webviewRef.value.executeJavaScript(`var a = 'foo'; console.log(a);`)

</script>

<template>
  <div class="chat">
    <webview
      id="webview"
      ref="webviewRef"
      :key="selectedChat.id"
      v-bind:src="selectedChat.url"
      allowpopups
      disablewebsecurity
    ></webview>
    <div class="chat__menu" @click="() => isShowChatsModal = !isShowChatsModal"></div>
    <ChatsModal v-if="isShowChatsModal" />
  </div>
</template>

<style scoped>
  .chat {
    height: 100vh;
    width: 100%;
    position: relative;
    background-color: var(--base-white);
  }

  .chat-loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    font-size: 24px;
  }

  .chat webview {
    width: 100%;
    height: 100%;
  }

  .chat__menu {
    position: absolute;
    left: 50%;
    bottom: -20px;
    transform: translate(-50%, 0%);

    width: 40px;
    height: 40px;
    background-color: var(--base-accent);
    border-radius: 50%;
    transition: all 0.3s;
  }

  .chat__menu:hover {
    transform: scaleY(1.15) translate(-50%, 0%);
  }
</style>
