export class SignupRequest {
    public email: String;
    public username: String;
    public password: String;

    constructor(email: String, username: String, password: String) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
