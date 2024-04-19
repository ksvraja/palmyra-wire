
import { TreeQueryStore } from "../AsyncStore";
import { QueryRequest, GetRequest, Tree, QueryResponse } from "../Types";

abstract class MemoryTreeStore<T extends Tree<T>> implements TreeQueryStore<T, T>{
    root: T;
    constructor(data: T) {
        this.root = data;
    }
    query(request: QueryRequest): Promise<QueryResponse<T>> {
        throw new Error("Method not implemented.");
    }
    queryLayout(request: QueryRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
    get(request: GetRequest): Promise<T> {
        throw new Error("Method not implemented.");
    }
    abstract getIdentity(o: T): any;

    getRoot(): Promise<T> {
        return Promise.resolve(this.root);
    }

    getChildren(data: T): Promise<QueryResponse<T>> {
        if (data.children) {
            const response: QueryResponse<T> = {
                result: data.children
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject({
                "message": "Empty Children"
            })
        }
    }

    getIdProperty(): string {
        return "id";
    }
}

export default MemoryTreeStore;