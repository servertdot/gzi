import { ref } from 'vue'
import { getFromStorage, setToStorage } from '../assets/utils'
import { Chat } from '../assets/types'

export const selectedChatId = ref<string | number>(1)
export const chats = ref<Chat[]>(Array.isArray(getFromStorage('chats')) ? getFromStorage('chats') : setToStorage('chats', [
  {
    id: 1,
    title: 'Perplexity',
    url: 'https://www.perplexity.ai/',
    status: 'done'
  },
  {
    id: 2,
    title: 'Perplexity Labs',
    url: 'https://labs.perplexity.ai/',
    status: 'done'
  },
  {
    id: 3,
    title: 'Pi Chat',
    url: 'https://heypi.com/talk',
    status: 'done'
  },
  {
    id: 4,
    title: 'ChatGPT',
    url: 'https://chat.openai.com/chat',
    status: 'done'
  },
  {
    id: 5,
    title: 'Stable Diff',
    url: 'https://huggingface.co/spaces/stabilityai/stable-diffusion',
    status: 'done'
  },
]))
export const isSettingsOpen = ref(false)
export const isShowChatsModal = ref(false)
export const isCreating = ref(false);
