import axios from 'axios';

class AbstractDataStore {
    baseUrl: string;
    instance: ReturnType<typeof axios.create>;

    constructor(baseURL: string) {
        var base = baseURL || '';
        this.baseUrl = base;
        this.instance = axios.create({
            baseURL: base
        });
    }

    query(url: string, params: any, callback: Function) {
        this.instance.get(url, params)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                this.globalHandleError(error);
            });
    }

    save(url: string, data: string, callback: Function) {
        this.instance.post(url, data)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                this.globalHandleError(error);
            });
    }

    update(url: string, data: string, callback: Function) {
        this.instance.put(url, data)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                this.globalHandleError(error);
            });
    }

    globalHandleError = (error: any) => {
        console.error(error);
    }
}

export default AbstractDataStore;