import { expect } from "@playwright/test";
import { test } from '../../../fixtures/custom-fixture';

test.describe('Test restful', () => {
    test('test of single object', async ({ restfullController }) => {
        const response = await restfullController.getSingleObject();
        const expectedObject = {
            id: '7',
            name: 'Apple MacBook Pro 16',
            data: {
                year: 2019,
                price: 1849.99,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '1 TB'
            }
        };
        expect(await response.json()).toEqual(expectedObject);
    });

    test('test list of all items', async ({ restfullController }) => {
        const response = await restfullController.getListOfAllItems();
        expect(Array.isArray(await response.json())).toBe(true);
        expect(await response.json()).toHaveLength(13);
    });

    test('test list of items by Ids', async ({ restfullController }) => {
        const response = await restfullController.getListOfItemsByIds();
        expect(response.status()).toEqual(200);
    });

    test('get single object', async ({ restfullController }) => {
        const response = await restfullController.getSingleObject();
        expect(typeof await response.json()).toBe('object');
        expect((await response.json()).data.year).toEqual(2019);
        expect((await response.json()).name).toEqual('Apple MacBook Pro 16');
    });

    test('test of adding single object', async ({ restfullController }) => {
        const response = await restfullController.addSingleObject();
        expect(typeof await response.json()).toBe('object');
        expect((await response.json()).data.year).toEqual(2019);
        expect(response.status()).toEqual(200);
    });

    test('test of Put request', async ({ restfullController }) => {
        const response = await restfullController.putNewDataToTheObject();
        expect(response.status()).toEqual(200);
        expect((await response.json()).data.year).toEqual(2020);
    });

    test('test of patch', async ({ restfullController }) => {
        const response = await restfullController.patchToObject();
        expect((await response.json()).name).toEqual('Apple MacBook Pro 16 (Updated Name)');
    });

    test('test of object delete', async ({ restfullController }) => {
        const { dedeletedObject: response, id } = await restfullController.deleteObject();
        expect((await response.json()).message).toEqual(`Object with id = ${id} has been deleted.`);
    });
});