export class EnableUserRequest {
    email: string;
    otp: string;

    constructor(email: string, otp: string){
        this.email = email;
        this.otp = otp;
    }
}
