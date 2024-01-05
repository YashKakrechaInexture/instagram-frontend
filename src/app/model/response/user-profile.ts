export class UserProfile {
    email?: String;
    username?: String;
    fullName?: String;
    description?: String;
    postCount?: number;
    followers?: number;
    following?: number;
    profilePic?: String;

    constructor(email: String, username: String, fullName: String, description: String, 
            postCount: number, followers: number, following: number, profilePic: String){
        this.email = email;
        this.username = username;
        this.fullName = fullName;
        this.description = description;
        this.postCount = postCount;
        this.followers = followers;
        this.following = following;
        this.profilePic = profilePic;
    }
}
