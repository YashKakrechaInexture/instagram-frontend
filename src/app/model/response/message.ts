import { MessageStatus } from "./message-status";

export class Message {
    sender?: string;
    recipient?: string;
    message?: string;
    timestamp?: Date;
    status: MessageStatus;
    
    constructor(sender: string, recipient: string, message: string, timestamp: Date, status: MessageStatus){
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
        this.timestamp = timestamp;
        this.status = status;
    }
}