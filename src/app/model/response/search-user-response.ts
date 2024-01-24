export class SearchUserResponse {
    username?: string;
    fullName?: string;
    profilePic?: string;
    following?: boolean;
    selfUser?: boolean;
    verified?: boolean;

    constructor(username: string, fullName: string, profilePic: string, following: boolean, 
                selfUser: boolean, verified: boolean){
        this.username = username;
        this.fullName = fullName;
        this.profilePic = profilePic;
        this.following = following;
        this.selfUser = selfUser;
        this.verified = verified;
    }
}
