import { DataStore } from "../AsyncStore";
import { APIErrorHandlerFactory, IEndPoint, PostRequest, PutRequest, RemoveRequest, strings } from "../Types";
import { PalmyraGridStore } from "./PalmyraGridStore";

class PalmyraDataStore<T> extends PalmyraGridStore implements DataStore<T>{
    constructor(request: Record<string, string>, endPoint: IEndPoint, factory: APIErrorHandlerFactory, idProperty?: strings) {
        super(request, endPoint,factory, idProperty);
    }

    save(data: any, request?: PostRequest): Promise<T> {
        var urlFormat = this.target + this.postUrl();
        var url: any = this.formatUrl(urlFormat, request);

        return this.isUrlValid(url) || this.getClient().post(url, data, { headers: { action: 'save' } })
            .then(response => { return response.data?.result })
            .catch(error => {this.handleError(request, error)});
    }

    post(data: any, request?: PostRequest): Promise<T> {
        var urlFormat = this.target + this.postUrl();
        var url: any = this.formatUrl(urlFormat, request);
        return this.isUrlValid(url) || this.getClient().post(url, data)
            .then(response => { return response.data?.result })
            .catch(error => {this.handleError(request, error)});
    }

    put(data: any, request?: PutRequest): Promise<T> {
        var urlFormat = this.target + this.putUrl();
        var url: any = this.formatUrl(urlFormat, request);
        return this.isUrlValid(url) || this.getClient().put(url, data)
            .then(response => { return response.data?.result })
            .catch(error => {this.handleError(request, error)});
    }

    remove(key: any, request?: RemoveRequest): Promise<T> {
        var urlFormat = this.target + this.deleteUrl();
        var url: any = this.formatUrl(urlFormat, key);
        return this.isUrlValid(url) || this.getClient().delete(url, { data: {} })
            .then(response => { return response.data?.result })
            .catch(error => {this.handleError(request, error)});
    }

    postUrl(): string {
        const ep: IEndPoint = this.getEndPoint();
        if (typeof ep == 'string') {
            return ep;
        } else {
            return ep.post ? ep.post : ep.get;
        }
    }

    putUrl(): string {
        const ep: IEndPoint = this.getEndPoint();
        if (typeof ep == 'string') {
            return ep;
        } else {
            return ep.put;
        }
    }

    deleteUrl(): string {
        const ep: IEndPoint = this.getEndPoint();
        if (typeof ep == 'string') {
            return ep;
        } else {
            return ep.delete ? ep.delete : ep.put;
        }
    }
}

export { PalmyraDataStore };
