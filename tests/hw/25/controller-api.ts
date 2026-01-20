import { APIRequestContext } from "@playwright/test";

const testObject: Object = {
    id: 6,
    name: 'Apple MacBook Pro 16',
    data: {
        year: 2019,
        price: 2049.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
        color: 'silver'
    }
};

const newTestObject: Object = {
    id: '7',
    name: 'Apple MacBook Pro 16',
    data: {
        year: 2020,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB'
    }
};

export class RestfulController {
    private objectsUrl: string;
    private request: APIRequestContext;

    constructor(request: APIRequestContext, initialUrl: string) {
        this.objectsUrl = initialUrl + '/objects';
        this.request = request;
    }

    async getListOfAllItems() {
        const url = this.objectsUrl;
        return this.request.get(url);
    }

    async getListOfItemsByIds() {
        const url = this.objectsUrl + '/?id=4&id=7&id=10';
        return this.request.get(url);
    }

    async getSingleObject() {
        const url = this.objectsUrl + '/7';
        return this.request.get(url);
    }

    async addSingleObject() {
        const url = this.objectsUrl;
        return this.request.post(url, { data: testObject });
    }

    async putNewDataToTheObject() {
        const url = this.objectsUrl;
        const newObjectByPost = await this.request.post(url, { data: testObject });
        const id = (await newObjectByPost.json()).id;
        const updatedObject = await this.request.put(`${url}/${id}`, { data: newTestObject });
        return updatedObject;
    }

    async patchToObject() {
        const url = this.objectsUrl;
        const obJectTobePatchet = await this.request.post(url, { data: newTestObject });
        const id = (await obJectTobePatchet.json()).id;
        const patchedObject = await this.request.patch(`${url}/${id}`, { data: { name: 'Apple MacBook Pro 16 (Updated Name)' } });
        return patchedObject;
    }

    async deleteObject() {
        const url = this.objectsUrl;
        const objectToBeDeleted = await this.request.post(url, { data: testObject });
        const id = (await objectToBeDeleted.json()).id;
        const dedeletedObject = await this.request.delete(`${url}/${id}`);
        return { dedeletedObject, id };
    }
}