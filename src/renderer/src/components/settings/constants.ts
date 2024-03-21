import { type Hotkey, type Preferences } from './types';

export const SETTINGS_TABS: Preferences[] = [
    {
        id: 1,
        title: 'Chats',
        type: 'chat'
    },
    {
        id: 2,
        title: 'Settings',
        type: 'settings'
    }
];

export const HOTKEYS: Hotkey[] = [
    {
        title: 'Open preferences',
        keys: 'Cmd/Ctl + ,',
        id: 1
    },
    {
        title: 'Create new chat',
        keys: 'Cmd/Ctl + N',
        id: 2
    }
];
