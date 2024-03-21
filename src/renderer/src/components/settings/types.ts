import { type Chat } from '../../store/types';

export type PreferencesType = 'chat' | 'settings'

export interface Preferences {
  id: number
  title: string
  type: PreferencesType
}

export interface Hotkey {
  title: string
  keys: string
  id: number
}

export interface ChatItemProps {
  chat: Chat
  isSelected: boolean
  isFocused: boolean
  updateSelectedId: (id: number | string) => void
  updateFocusableId: (id: number | string) => void
  id: string | number
  tabIndex: number
}
