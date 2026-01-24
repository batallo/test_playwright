import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custom-fixture';

let arrayWIthIds: string[] = [];

test.describe("Test for myAweseomeFixture", () => {

    test.afterAll(async ({ myAweseomeFixture }) => {
        for (const argument of arrayWIthIds) {
            await myAweseomeFixture.deleteObject(argument);
        }
    })

    test("Test for getAllObjects", async ({ myAweseomeFixture }) => {
        await test.step('Check that all objects can be gotten', async () => {
            const response = await myAweseomeFixture.getAllObjects();
            expect(response.status()).toBe(200);
        });
    });

    test("Test for getListOfObjectsByIds", async ({ myAweseomeFixture }) => {
        await test.step('Check that the first and second objects can be gotten', async () => {
            const response = await myAweseomeFixture.getListOfObjectsByIds(3, 5, 10);
            expect(response.status()).toBe(200);
            expect((await response.json()).length).toBeGreaterThan(0);
        });
    });

    test("Test for getSingleObject", async ({ myAweseomeFixture }) => {
        await test.step('Check that the fifth object can be gotten', async () => {
            const response = await myAweseomeFixture.getSingleObject(5);
            expect(response.status()).toBe(200);
            expect((await response.json()).id).toBe("5");
        });
    });

    test("Test for addObject", async ({ myAweseomeFixture }) => {
        await test.step('Check that new object was added', async () => {
            const newObjForTest = {
                "name": "Anton Apple MacBook Pro 16",
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB"
                }
            }
            const response = await myAweseomeFixture.addObject(newObjForTest);
            const idForNewObj = (await response.json()).id;
            arrayWIthIds.push(idForNewObj);
            expect(response.status()).toBe(200);
            expect((await response.json()).name).toBe("Anton Apple MacBook Pro 16");
        });
    });

    test("Test for updateObject", async ({ myAweseomeFixture }) => {
        await test.step('Check that object can be updated', async () => {
            const newObjForTest = {
                "name": "AntonK Apple MacBook Pro 16",
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB"
                }
            }
            const updatedObjForTest = {
                "name": "UpdatedAntonK Apple MacBook Pro 16",
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB"
                }
            }
            const res = await myAweseomeFixture.addObject(newObjForTest);
            const idForNewObj = (await res.json()).id;
            arrayWIthIds.push(idForNewObj);
            const response = await myAweseomeFixture.updateObject(idForNewObj, updatedObjForTest);
            expect(response.status()).toBe(200);
            expect((await response.json()).name).toBe("UpdatedAntonK Apple MacBook Pro 16");
        });
    });

    test("Test for patchObject", async ({ myAweseomeFixture }) => {
        await test.step('Check that object can be patched', async () => {
            const newObjForTest = {
                "name": "AntonK Apple MacBook Pro 16",
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB"
                }
            }
            const res = await myAweseomeFixture.addObject(newObjForTest);
            const idForNewObj = (await res.json()).id;
            arrayWIthIds.push(idForNewObj);
            const response = await myAweseomeFixture.patchObject(idForNewObj, { name: "Patched Apple MacBook Pro 16" });
            expect(response.status()).toBe(200);
            expect((await response.json()).name).toBe("Patched Apple MacBook Pro 16");
        });
    });

    test("Test for deleteObject", async ({ myAweseomeFixture }) => {
        await test.step('Check that object can be deleted', async () => {
            const newObjForTest = {
                "name": "AntonK Apple MacBook Pro 16",
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB"
                }
            }
            const res = await myAweseomeFixture.addObject(newObjForTest);
            const idForNewObj = (await res.json()).id;
            const response = await myAweseomeFixture.deleteObject(idForNewObj);
            expect(response.status()).toBe(200);
        });
    });
});