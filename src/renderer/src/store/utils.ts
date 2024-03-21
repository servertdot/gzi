import { chats } from '.';
import { type Chat, type RemoveParams } from './types';
import { v4 as uuid } from '@lukeed/uuid';

/// ////////////
export function getFromStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? '{}');
}

export function setToStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));

    return data;
}

const removeChatFromStorage = (id: string | number) => {
    const chats: Chat[] = getFromStorage('chats');

    setToStorage('chats', chats.filter(item => item.id !== id));
};

const addChatToStorage = (chat: Chat) => {
    const chats: Chat[] = getFromStorage('chats');

    setToStorage('chats', [...chats, chat]);
};

export const updateChatInStorage = (chat: Chat) => {
    const chats: Chat[] = getFromStorage('chats');

    setToStorage('chats', chats.map(item => item.id === chat.id ? chat : item));
};

/// ////////////
export const handleRemoveChat = (
    id: number | string,
    params: RemoveParams = { shouldInstantlyRemove: true }
) => {
    const chat = chats.value.find((chat) => chat.id === id);
    if (!chat) return;

    const chatIndex = chats.value.indexOf(chat);

    if (params.shouldInstantlyRemove) {
        chats.value.splice(chatIndex, 1);
        removeChatFromStorage(id);
    }
};

export const addNewChat = () => {
    const newChat: Chat = {
        id: uuid(),
        title: '',
        url: '',
        status: 'done'
    };
    chats.value.push(newChat);
    addChatToStorage(newChat);

    return newChat;
};
