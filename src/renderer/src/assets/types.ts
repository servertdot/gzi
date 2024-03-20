export type Chat = {
  id: number | string;
  title: string;
  url: string;
  status: 'done' | 'draft';
}