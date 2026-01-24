import { APIRequestContext } from '@playwright/test'

export const baseUrl = "https://api.restful-api.dev/";

export class MyFancyClassName {
    apiContext: APIRequestContext;
    objectsUrl: string;

    constructor(apiContext: APIRequestContext) {
        this.objectsUrl = baseUrl + "objects";
        this.apiContext = apiContext;
    }

    async getAllObjects() {
        return this.apiContext.get(this.objectsUrl);
    }

    async getListOfObjectsByIds(...args: number[]) {
        // const urlEnd = args.reduce((acc,curr)=>acc + '&id=' + curr, '?id')

        // return this.apiContext.get(this.objectsUrl + urlEnd);
        return this.apiContext.get(this.objectsUrl, { params: { id: args.toString() } });
    }

    async getSingleObject(id: number) {
        const url = this.objectsUrl + `/${id}`;
        return this.apiContext.get(url);
    }

    async addObject(newObj: object) {
        return this.apiContext.post(this.objectsUrl, { data: newObj });
    }

    async updateObject(id: number, newData: object) {
        const url = this.objectsUrl + `/${id}`;
        return this.apiContext.put(url, { data: newData });
    }

    async patchObject(id: number, updatedData: object) {
        const url = this.objectsUrl + `/${id}`;
        return this.apiContext.patch(url, { data: updatedData });
    }

    async deleteObject(id: string) {
        const url = this.objectsUrl + `/${id}`;
        return this.apiContext.delete(url);
    }
}