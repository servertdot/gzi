<script lang="ts" setup>
    import { type VNodeRef, onMounted, onUnmounted, ref } from 'vue';
    import { selectedChatId, isShowChatsModal, chats, isSettingsOpen } from '../../store';
    import SettingsIcon from '../../assets/icons/SettingsIcon.vue';

    const chatModalRef = ref<VNodeRef>();

    const handleClickOutside = (event: MouseEvent): void => {
        // @ts-expect-error
        if (chatModalRef.value && !chatModalRef.value.contains(event.target as Node)) {
            isShowChatsModal.value = false;
        }
    };

    const handleOpenSettings = (): void => {
        isShowChatsModal.value = false;
        isSettingsOpen.value = true;
    };

    const keyboardListener = (event: KeyboardEvent): void => {
        if (event.key === 'Escape' && isShowChatsModal.value) {
            isShowChatsModal.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener('keydown', keyboardListener);
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', keyboardListener);
    });
</script>

<template>
  <div class="chat-list-modal" @click="handleClickOutside">
    <div class="chat-list" ref="chatModalRef">
    <div class="chat-list__wrapper">
      <div
        class="chat-list__item"
        v-for="chat in chats"
        :key="chat.id"
        :class="{ 'selected': chat.id === selectedChatId }"
        @click="() => selectedChatId = chat.id"
      >
        {{ chat.title || chat.url }}
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
