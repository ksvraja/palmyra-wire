import { TreeQueryStore } from "../../../main";
import { AxiosRequestConfig } from 'axios';
import { PalmyraAbstractStore } from "./AbstractStore";
import { QueryResponse, QueryParams, QueryRequest, APIErrorHandlerFactory, strings, IEndPoint } from "../Types";

interface IChildTreeRequest {
    parent?: number
}

class PalmyraTreeStore extends PalmyraAbstractStore implements TreeQueryStore<IChildTreeRequest, any> {
    idProperty: strings

    constructor(options: Record<string, any>, endPoint: IEndPoint, factory: APIErrorHandlerFactory, idProperty?: strings) {
        super(options, endPoint, factory);
        this.idProperty = idProperty || 'id';
    }
    getChildren(data: IChildTreeRequest): Promise<QueryResponse<any>> {
        const request: QueryRequest = { filter: { parent: data.parent } };
        return this.query(request);
    }
    getRoot(): Promise<any> {
        const request: QueryRequest = {};
        return this.query(request);
    }

    queryUrl(): string {
        const endPoint = this.getEndPoint();
        if (typeof endPoint == 'string') {
            return endPoint;
        } else {
            return endPoint.query;
        }
    }

    query(request: QueryRequest): Promise<QueryResponse<any>> {
        var urlFormat = this.target + this.queryUrl();
        var url: any = this.formatUrl(urlFormat, request);
        const urlSortParams = (convertQueryParams(request));
        const params: AxiosRequestConfig = { params: urlSortParams, headers: { action: 'nativeQuery' } };
        return this.getClient().get(url, params)
            .then(response => { return response.data })
            .catch(error => { this.handleError(request, error) });
    }
}

export { PalmyraTreeStore };

function convertQueryParams(queryParams: QueryParams): any {
    const sortOrder = queryParams?.sortOrder || {};
    const orderBy = Object.keys(sortOrder).map(field => {
        const order = sortOrder[field] === "asc" ? "+" : "-";
        return order + field;
    });

    const _total: boolean = queryParams.total ? true : false;

    const _f = queryParams.filter || {};

    const _offset = queryParams.offset || 0;
    const _limit = queryParams.limit || 15;

    return { ..._f, _total, _orderBy: orderBy.length ? orderBy.join(',') : [], _offset, _limit };
}

export type { IChildTreeRequest }