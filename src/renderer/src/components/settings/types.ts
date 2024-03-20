export type PreferencesType = 'chat' | 'settings';

export type Preferences = {
  id: number;
  title: string;
  type: PreferencesType
}

export type Hotkey = {
  title: string;
  keys: string;
  id: number;
}