export class TokenResponse {
    public sub: string;
    public username: string;
    public id: number;
    public role: boolean;

    constructor(sub: string, username: string, id: number, role: boolean){
        this.sub = sub;
        this.username = username;
        this.id = id;
        this.role = role;
    }
}
