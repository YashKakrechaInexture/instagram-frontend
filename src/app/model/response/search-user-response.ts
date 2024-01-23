export class SearchUserResponse {
    username: string;
    fullName?: string;
    profilePic?: string;
    following?: boolean;
    selfUser?: boolean;

    constructor(username: string, fullName: string, profilePic: string, following: boolean, selfUser: boolean){
        this.username = username;
        this.fullName = fullName;
        this.profilePic = profilePic;
        this.following = following;
        this.selfUser = selfUser;
    }
}
