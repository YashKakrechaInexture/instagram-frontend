export class MessageRequest {
    public sender: string;
    public recipient: string;
    public message: string;

    constructor(sender: string, recipient: string, message: string){
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
    }
}
