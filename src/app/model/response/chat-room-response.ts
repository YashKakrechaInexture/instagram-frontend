import { ChatUserResponse } from "./chat-user-response";
import { LastMessageResponse } from "./last-message-response";

export class ChatRoomResponse {
    chatId: string;
    sender: ChatUserResponse;
    lastMessage: LastMessageResponse;
    unreadMessages: number;

    constructor(chatId: string, sender: ChatUserResponse, lastMessage: LastMessageResponse, unreadMessages: number){
        this.chatId = chatId;
        this.sender = sender;
        this.lastMessage = lastMessage;
        this.unreadMessages = unreadMessages;
    }
}
