export class UserProfile {
    email?: String;
    username?: string;
    fullName?: String;
    description?: String;
    postCount?: number;
    followers?: number;
    following?: number;
    profilePic?: String;
    selfUser?: boolean;
    followedThisUser?: boolean;
    verified?: boolean;

    constructor(email: String, username: string, fullName: String, description: String, 
            postCount: number, followers: number, following: number, profilePic: String, 
            selfUser: boolean, followedThisUser: boolean, verified: boolean){
        this.email = email;
        this.username = username;
        this.fullName = fullName;
        this.description = description;
        this.postCount = postCount;
        this.followers = followers;
        this.following = following;
        this.profilePic = profilePic;
        this.selfUser = selfUser;
        this.followedThisUser = followedThisUser;
        this.verified = verified;
    }
}
