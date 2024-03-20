<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { v4 as uuid } from '@lukeed/uuid'
  import { isSettingsOpen, chats, isCreating } from '../../store'
  import ChatItem from './ChatItem.vue';
  import Button from '../Button.vue';
  import { Chat } from '../../assets/types';
  import { handleRemoveChat } from '../../store/utils';
  import { SETTINGS_TABS, HOTKEYS } from './constants';
  import { PreferencesType } from './types';
  import Hotkey from './Hotkey.vue';

  const activeSettingTab = ref<PreferencesType>('chat');
  const selectedId = ref<string | number>(0);
  const focusableId = ref<string | number>(0)

  const updateSelectedId = (id: number | string) => {
    selectedId.value = id;
  }

  const updateFocusableId = (id: number | string) => {
    focusableId.value = id;
  }


  const onCreateChat = () => {
    if (isCreating.value) return;
    const newChat: Chat = {
      id: uuid(),
      title: '',
      url: '',
      status: 'done'
    };

    chats.value.push(newChat);
    updateSelectedId(newChat.id);
    updateFocusableId(newChat.id);
    isCreating.value = true;
  }

  const click = (e: MouseEvent) => {
    if (!selectedId) return;
    if (e.target?.id === 'wrapper' || e.target?.id === 'content-wrapper') {
     
      isCreating.value = false;

      const chat = chats.value.find((chat) => chat.id === selectedId.value)!;
      if (chat && !chat.title && !chat.url) {
        handleRemoveChat(selectedId.value)
      }

      updateSelectedId(0);
      updateFocusableId(0);
    }
  }

  const keyboardListener = (event: KeyboardEvent) => {
     if (event.key === 'Escape' && !selectedId.value && isSettingsOpen.value) {
      isSettingsOpen.value = false;
    }
    if (event.metaKey && event.code === 'KeyN') {
      onCreateChat();
    }
  }
  
  onMounted(() => {
    document.addEventListener('keydown', keyboardListener)
    document.addEventListener('click', click)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', keyboardListener)
    document.removeEventListener('click', click)
  })


</script> 

<template>
  <div class="settings">
    <!-- <button @click="() => isSettingsOpen = false" class="settings-back-button">Back</button> -->
    <div class="settings-wrapper" id="wrapper">
      <div class="settings-menu">
        <Button
          v-for="tab in SETTINGS_TABS" 
          :key="tab.id"
          class="settings-menu__item"
          :id="tab.id === 1 ? 'first' : 'second'"
          :class="{ 
            'settings-menu__item_active': activeSettingTab === tab.type,
          }"
          @click="activeSettingTab = tab.type"
        >
          {{ tab.title }}
        </Button>
      </div>

      <div v-if="activeSettingTab === 'chat'" class="settings-content chat" id="content-wrapper">
        <ChatItem
          v-for="(chat, index) in chats" 
          :id="chat.id"
          :key="chat.id"
          :chat="chat" 
          :isSelected="chat.id === selectedId"
          :isFocused="chat.id === focusableId"
          :tabIndex="index + 1"
          :updateSelectedId="updateSelectedId"
          :updateFocusableId="updateFocusableId"
        />
      </div>

      <div v-if="activeSettingTab === 'settings'" class="settings-content settings-tab">
        <Hotkey v-for="hotkey in HOTKEYS" :hotkey="hotkey" />
      </div>

      <div class="settings-buttons">
        <Button class="settings-button_create" v-if="activeSettingTab === 'chat'" :onClick="onCreateChat">New chat</Button>
        <Button class="settings-button_back" :onClick="() => isSettingsOpen = false">Back</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .settings {
    position: fixed;
    background-color: var(--base-white);
    width: 100%;
    height: 100%;
    cursor: default;
    overflow: auto;
  }

  .settings-wrapper {
    height: 100%;
    gap: 16px;
  }

  .settings-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding-top: 8px;
    user-select: none;
  }

  .settings-menu__item {
    max-width: 80px;
    box-shadow: none;
  }

  .settings-menu__item#first {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }

  .settings-menu__item#second {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .settings-menu__item_active {
    color: var(--base-accent);
  }

  .settings-content {
    display: flex;
    flex-direction: column;
    padding: 16px 16px 84px;
    gap: 6px;
  }

  .settings-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 14px 16px;
    gap: 12px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--base-white);
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>