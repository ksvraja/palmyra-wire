import { AuthDecorator } from "..";

class BasicAuthProvider implements AuthDecorator {
    username:string;
    password:string;

    BasicAuthProvider(username:string, password:string){
        this.username = username;
        this.password = password;
    }

    decorate(request: any): void {
        
    }
}

class OauthProvider implements AuthDecorator {
    decorate(request: any): void {
        
    }
}


export { BasicAuthProvider, OauthProvider };