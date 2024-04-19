import { AuthDecorator } from "..";

class NoAuthDecorator implements AuthDecorator {
    decorate(_request: any): void {
        
    }
}

const NOOPDecorator = new NoAuthDecorator();

export {NOOPDecorator};