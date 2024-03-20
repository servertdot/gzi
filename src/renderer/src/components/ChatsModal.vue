<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { selectedChatId, isShowChatsModal, chats, isSettingsOpen } from '../store';
  import SettingsIcon from './settings/SettingsIcon.vue';

  const chatModalRef = ref();

  const handleClickOutside = (event: MouseEvent) => {
    if (chatModalRef.value && !chatModalRef.value.contains(event.target as Node)) {
      isShowChatsModal.value = false
    }
  }

  const handleOpenSettings = () => {
    isShowChatsModal.value = false;
    isSettingsOpen.value = true;
  }

  const keyboardListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isShowChatsModal.value) {
      isShowChatsModal.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', keyboardListener)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', keyboardListener)
  })


</script>

<template>
  <div class="chat-list-modal" @click="handleClickOutside">
    <div class="chat-list" ref="chatModalRef">
    <div class="chat-list__wrapper">
      <div 
        class="chat-list__item" 
        v-for="chat in chats"
        :class="{ 'selected': chat.id === selectedChatId }"
        @click="() => selectedChatId = chat.id"
      >
        {{ chat.title }}
      </div>
    </div>

    <button @click="handleOpenSettings" class="settings__button">
      <SettingsIcon />
    </button>
  </div>
  </div>
</template>

<style scoped>

  .chat-list-modal {
    position: absolute;
    background-color: transparent;
    width: 100%;
    height: 100%;
    top: 0;
  }

  .chat-list {
    position: fixed;
    background-color: var(--base-white);
    padding: 8px;
    bottom: 30px;
    left: 50%;

    width: 160px;
    height: 300px;
    transform: translate(-50%, 0);
    border-radius: 8px;
    /* box-shadow: 0 0 2px var(--base-black); */

    border: 1px solid #E4E4E7;
    box-shadow: 0px 1px 2px 0px #1018280D;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .chat-list__wrapper {
    overflow-y: scroll;
    max-height:268px;
  }

  .chat-list__wrapper::-webkit-scrollbar {
    display: none;
  }

  .chat-list__item {
    margin-bottom: 8px;
    padding: 8px;
    border-bottom: 1px solid var(--base-black);
    color: var(--base-black)
  }

  .chat-list__item.selected {
    color: var(--base-accent);
  }

  .settings__button {
    outline: 0;
    border: 0;
    background-color: transparent;
    color: var(--base-gray);
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .settings__button:hover {
    color: var(--base-accent);
  }

</style>./settings/SettingsIcon.vue