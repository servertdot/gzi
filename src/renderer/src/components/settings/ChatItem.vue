<script lang="ts" setup>
  import { effect, onMounted, onUnmounted, ref } from 'vue';
  import { Chat } from '../../assets/types';
  import { chats, isCreating } from '../../store'
  import { handleRemoveChat } from '../../store/utils';

  const props = defineProps<{
    chat: Chat,
    isSelected: boolean;
    isFocused: boolean;
    updateSelectedId: (id:number | string) => void;
    updateFocusableId: (id:number | string) => void;
    id: string | number;
    tabIndex: number;
  }>();

  const inputRef = ref();
  const block = ref();
  const activeBlock = ref();

  const updateChatTitle = () => {
    const chat = chats.value.find((chat) => chat.id === props.chat.id)!;
    chat.title = inputRef.value.value;

    if (!chat.title && !chat.url) {
      handleRemoveChat(props.chat.id)
    }
    if (isCreating.value) {
      isCreating.value = false
    }
    props.updateSelectedId(0);
    props.updateFocusableId(0);
  }

  const onClickOutside = (event: MouseEvent) => {
    if (inputRef.value && !inputRef.value.contains(event.target as Node)) {
      updateChatTitle()
    }
  };

  effect(() => {
    document.removeEventListener('click', onClickOutside)
    if (inputRef.value && props.isSelected) {
      inputRef.value.focus();
    }
  })

  const onEscape = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && props.isSelected) {
      updateChatTitle()
    }

    if (event.key === 'Escape' && props.isSelected) {
      updateChatTitle();
    }
  }

  const handleRemove = (e: KeyboardEvent) => {
    if (!props.isSelected && props.isFocused) {
      if (e.metaKey && e.code === 'Backspace') {
        handleRemoveChat(props.chat.id);
        props.updateFocusableId(0);
      }
    }
  }

  effect(() => {
    document.removeEventListener('keydown', onEscape)
    if (props.isSelected) {
      document.addEventListener('keydown', onEscape);
    }
  })

  onMounted(() => {
    document.addEventListener('keydown', handleRemove)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onEscape);
    document.removeEventListener('keydown', handleRemove)
  })

</script>

<template>
  <div
    draggable="true"
    :tabindex="tabIndex"
    :id="id.toString()"
    :key="chat.id"
    v-if="!isSelected"
    ref="block"
    class="chat-item"
    :class="{'chat-item_focusable': isFocused}"
    @dblclick="() => updateSelectedId(chat.id)"
    @click="() => updateFocusableId(chat.id)"
  >
    {{ chat.title || chat.url }}
  </div>
  <div 
    @click="() => updateFocusableId(chat.id)" 
    class="chat-item_active"  
    ref="activeBlock" 
    v-if="isSelected"
  >
    <input 
      ref="inputRef"
      class="chat-item__input"
      v-model="chat.title"
      placeholder="Enter title"
    />
    <input 
      class="chat-item__input"
      v-model="chat.url"
      placeholder="Enter url"
    />
  </div>
</template>

<style scoped>
  .chat-item {
    padding: 4px 8px;
    /* padding: 16px 12px; */
    /* border-bottom: 1px solid transparent; */
    transition: border .1s;
    border: 1px solid transparent;
  }

  .chat-item_focusable {
    border: 1px solid #d3613570;
    border-radius: 4px;
  }

  .chat-item_active {
    border-radius: 4px;
    border: 1px solid #E4E4E7;
    box-shadow: 0 1px 3px 0 #1018280d;
  }

  .chat-item__input {
    background-color: transparent;
    outline: 0;
    border: 0;
    border: 1px solid transparent;
    padding: 7px;
    font-size: 16px;
    width: calc(100% - 24px);
  }

</style>