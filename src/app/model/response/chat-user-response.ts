export class ChatUserResponse {
    username: string;
    fullName: string;
    profilePic: string;
    verified: boolean;

    constructor(username: string, fullName: string, profilePic: string, verified: boolean){
        this.username = username;
        this.fullName = fullName;
        this.profilePic = profilePic;
        this.verified = verified;
    }
}
