import { MessageStatus } from "./message-status";

export class Message {
    id: string;
    sender?: string;
    recipient?: string;
    message?: string;
    timestamp: Date;
    status: MessageStatus;
    date?: string;
    
    constructor(id: string, sender: string, recipient: string, message: string, timestamp: Date, status: MessageStatus, date: string){
        this.id = id;
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
        this.timestamp = timestamp;
        this.status = status;
        this.date = date;
    }
}