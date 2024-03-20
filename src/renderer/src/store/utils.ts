import { chats } from ".";
import { RemoveParams } from "./types";

export const handleRemoveChat = (
    id: number | string, 
    params: RemoveParams = {shouldInstantlyRemove: true}
  ) => {
  const chat = chats.value.find((chat) => chat.id === id)!;
  const chatIndex = chats.value.indexOf(chat)

  if (params.shouldInstantlyRemove) {
    chats.value.splice(chatIndex, 1);
  }
}