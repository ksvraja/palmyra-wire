
import { ChartStore, DataStore, GridStore, LookupStore, TreeQueryStore } from "../AsyncStore";
import { APIErrorHandlerFactory, IEndPoint, StoreFactory, strings } from "../Types";
import { PalmyraChartStore } from "./PalmyraChartStore";
import { PalmyraDataStore } from "./PalmyraDataStore";
import { PalmyraGridStore } from "./PalmyraGridStore";
import { PalmyraLookupStore } from "./PalmyraLookupStore";
import { PalmyraTreeStore } from "./PalmyraTreeStore";

interface PalmyraStoreFactoryArg {
    baseUrl?: string
    errorHandlerFactory?: APIErrorHandlerFactory
}

const NoopErrorHandler = () => {return false}
const NoopErrorHandlerFactory = () => NoopErrorHandler;

class PalmyraStoreFactory implements StoreFactory<any> {
    baseUrl: string = '/palmyra';
    errorHandlerFactory: APIErrorHandlerFactory = NoopErrorHandlerFactory;

    constructor(props: PalmyraStoreFactoryArg) {
        this.baseUrl = props.baseUrl || '/palmyra';
        this.errorHandlerFactory = props.errorHandlerFactory || NoopErrorHandlerFactory;
    }

    getGridStore(options: Record<string, string>, endPoint: IEndPoint, idProperty?: strings): GridStore<any> {
        var storeOptions = { target: this.baseUrl, ...options }
        return new PalmyraGridStore(storeOptions, endPoint, this.errorHandlerFactory, idProperty);
    }

    getFormStore(options: Record<string, string>, endPoint: IEndPoint, idProperty?: strings): DataStore<any> {
        var storeOptions = { target: this.baseUrl, ...options }
        return new PalmyraDataStore(storeOptions, endPoint, this.errorHandlerFactory, idProperty);
    }
    getChartStore(options: Record<string, string>, endPoint: IEndPoint, idProperty?: strings): ChartStore<any> {
        var storeOptions = { target: this.baseUrl, ...options }
        return new PalmyraChartStore(storeOptions, endPoint, this.errorHandlerFactory, idProperty);
    }
    getLookupStore(options: Record<string, string>, endPoint: IEndPoint, idProperty: strings): LookupStore<any> {
        var storeOptions = { target: this.baseUrl, ...options }
        return new PalmyraLookupStore(storeOptions, endPoint, this.errorHandlerFactory, idProperty);
    }
    getTreeStore(options: Record<string, string>, endPoint: IEndPoint): TreeQueryStore<any, any> {
        var storeOptions = { target: this.baseUrl, ...options }
        return new PalmyraTreeStore(storeOptions, endPoint, this.errorHandlerFactory);
    }
}

export { PalmyraStoreFactory };