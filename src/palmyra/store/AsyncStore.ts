import { ExportRequest, GetRequest, PostRequest, PutRequest, QueryRequest, QueryResponse, RemoveRequest, strings } from "./Types";

interface LookupStore<T> extends AbstractQueryStore<T> {

}

interface AbstractQueryStore<T> {
    query(request: QueryRequest): Promise<QueryResponse<T>>;
}

interface QueryStore<T> extends AbstractQueryStore<T> {
    queryLayout(request: QueryRequest): Promise<any>;
    get(request: GetRequest): Promise<T>;
    getIdentity(o: T): any;
    getIdProperty(): strings;
}

interface GridStore<T> extends QueryStore<T> {
    export(request: ExportRequest): void;
}

interface TreeQueryStore<T, R> {
    getChildren(data: T): Promise<QueryResponse<R>>;
    getRoot(): Promise<R>;
}

interface DataStore<T> extends QueryStore<T> {
    post(data: T, request?: PostRequest): Promise<T>;
    put(data: T, request?: PutRequest): Promise<T>;
    save(data: T, request?: PutRequest): Promise<T>;
    remove(key: T | any, request?: RemoveRequest): Promise<T>;
}

interface ChartStore<T> {
    query(request: QueryRequest): Promise<T[]>;
}

interface AuthDecorator {
    decorate(request: any): void;
}

interface DefaultQueryParams {
    filter?: Record<any, any>,
    sort?: strings
}

export type {
    DataStore, QueryStore, TreeQueryStore, AbstractQueryStore, GridStore,
    ChartStore, AuthDecorator, LookupStore, DefaultQueryParams
};