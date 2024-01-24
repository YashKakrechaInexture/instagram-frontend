export class LoginResponse {
    token: String;
    username: String;

    constructor(token: String, username: String) {
        this.token = token;
        this.username = username;
    }
}
