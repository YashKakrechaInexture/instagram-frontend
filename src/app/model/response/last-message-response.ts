export class LastMessageResponse {
    sender: string;
    message: string;
    timestamp: Date;

    constructor(sender: string, message: string, timestamp: Date) {
        this.sender = sender;
        this.message = message;
        this.timestamp = timestamp;
    }
}
