export class Message {
    sender?: string;
    recipient?: string;
    message?: string;
    timestamp?: Date;
    
    constructor(sender: string, recipient: string, message: string, timestamp: Date){
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
        this.timestamp = timestamp;
    }
}
