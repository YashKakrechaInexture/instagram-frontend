import { SearchUserResponse } from "./search-user-response";

export class PostResponse {
    id: number;
    image: string;
    caption: string;
    likes: number;
    likedByCurrentUser: boolean;
    user: SearchUserResponse;

    constructor(id: number, image: string, caption: string, 
                likes: number, likedByCurrentUser: boolean, user: SearchUserResponse){
        this.id = id;
        this.image = image;
        this.caption = caption;
        this.likes = likes;
        this.likedByCurrentUser = likedByCurrentUser;
        this.user = user;
    }
}
