import { ChartStore } from "../AsyncStore";
import { QueryRequest, QueryParams, APIErrorHandlerFactory, strings, IEndPoint } from "../Types";
import { PalmyraAbstractStore } from "./AbstractStore";

class PalmyraChartStore extends PalmyraAbstractStore implements ChartStore<any>{
        
    idProperty: strings

    constructor(request: Record<string, string>, endPoint: IEndPoint, factory: APIErrorHandlerFactory, idProperty?: strings) {
        super(request, endPoint, factory);
        this.idProperty = idProperty || 'id';
    }

    getEndPoint(): IEndPoint {
        return this.endPoint;
    }

    queryUrl(): string {
        if (typeof this.endPoint == 'string') {
            return this.endPoint;
        } else {
            return this.endPoint.query;
        }
    }

    getUrl(): string {
        if (typeof this.endPoint == 'string') {
            return this.endPoint;
        } else {
            return this.endPoint.get;
        }
    }

    query(request: QueryRequest): Promise<any> {
        var urlFormat = this.target + this.queryUrl();
        var url: any = this.formatUrl(urlFormat, request);
        const urlSortParams = (convertQueryParams(request));
        const params = { params: urlSortParams };
        return this.getClient().get(url, params)
            .then(response => { return response.data?.result })
            .catch(error => {this.handleError(request, error)});
    }
}

export { PalmyraChartStore };

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

    return { ..._f, _total, _offset, _limit, _orderBy: orderBy.length ? orderBy.join(',') : [] };
}