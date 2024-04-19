import axios, { AxiosInstance } from 'axios';

import { AbstractRequest, APIErrorHandlerFactory, IEndPoint } from '../Types';
import { hasUnfilledParameter, StringFormat } from '../../utils/StringUtil';

class PalmyraAbstractStore {
    options: Record<string, any>
    target: string
    endPoint: IEndPoint
    axiosInstance: AxiosInstance

    constructor(options: Record<string, any>, endPoint: IEndPoint, handlerFactory?: APIErrorHandlerFactory) {
        this.axiosInstance = axios.create({
            timeout: 5000
        });

        const factory = handlerFactory || (() => (error) => {
            const url = error.request.responseURL || error.config.url
            console.log(error.response.status + ":" + error.code + "-requestUrl:" + url);
            console.log(error.message + " -- response data:'" + error.response.data + "'");
        });

        axios.interceptors.response.use(undefined, function (error) {
            error.handleGlobally = factory(error);
            return Promise.reject(error);
        })

        this.options = options;
        this.target = options.target;
        this.endPoint = endPoint;
    }

    getClient(): AxiosInstance {
        return axios;
    }

    getEndPoint(): IEndPoint {
        return this.endPoint;
    }

    getOptions(): Record<string, any> {
        return this.options;
    }

    getTarget(): string {
        return this.target;
    }

    formatUrl(urlFormat: string, request?: AbstractRequest): string {
        if (request)
            return StringFormat(StringFormat(urlFormat, request.options), request.endPointVars);
        else
            return urlFormat;
    }

    isUrlValid(url: string): any {
        if (hasUnfilledParameter(url)) {
            return Promise.reject("endPoint options yet to be populated " + url);
        }
        return false;
    }

    handleError(request: AbstractRequest = {}, error: any): void {
        if (request.errorHandler) {
            if (request.errorHandler(error))
                return;
        }

        error.handleGlobally(error)
    }
}

export { PalmyraAbstractStore };
