export class MessagePageProfileResponse {
    username?: string;
    verified?: boolean;
    profilePic?: string;

    constructor(username: string, verified: boolean, profilePic: string){
        this.username = username;
        this.verified = verified;
        this.profilePic = profilePic;
    }
}
