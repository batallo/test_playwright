import { test as baseTest } from '@playwright/test';

type MyFixture = {
    standardUser: undefined,
    secondFixture: undefined,
}

export const test = baseTest.extend<MyFixture>({
    standardUser: async ({ context }, use) => {
        context.addCookies([{
            name: 'session-username',
            value: 'standard_user',
            domain: "www.saucedemo.com",
            path: "/",
        }])

        const token = 'abc123';
        await use(undefined);
    },
    secondFixture: async ({ context }, use) => {
        context.addCookies([{
            name: 'session-username',
            value: 'standard_user',
            domain: "www.saucedemo.com",
            path: "/",
        }])

        const token = 'abc123';
        await use(undefined);
    },
})
