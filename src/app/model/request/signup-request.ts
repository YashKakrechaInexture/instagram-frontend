export class SignupRequest {
    public fullName: String;
    public email: String;
    public username: String;
    public password: String;

    constructor(fullName: String, email: String, username: String, password: String) {
        this.fullName = fullName;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
