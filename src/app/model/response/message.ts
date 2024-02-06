import { MessageStatus } from "./message-status";

export class Message {
    sender?: string;
    recipient?: string;
    message?: string;
    timestamp: Date;
    status: MessageStatus;
    date?: string;
    
    constructor(sender: string, recipient: string, message: string, timestamp: Date, status: MessageStatus, date: string){
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
        this.timestamp = timestamp;
        this.status = status;
        this.date = date;
    }
}