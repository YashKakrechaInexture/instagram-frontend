export class SearchUserResponse {
    username: string;
    fullName?: string;
    profilePic?: string;
    following?: boolean;

    constructor(username: string, fullName: string, profilePic: string, following: boolean){
        this.username = username;
        this.fullName = fullName;
        this.profilePic = profilePic;
        this.following = following;
    }
}
