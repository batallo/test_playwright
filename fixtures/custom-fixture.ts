import { test as baseTest } from '@playwright/test';
import { readFileSync, writeFileSync } from 'fs';
import { RestfulController } from '../tests/hw/25/controller-api';
import { SwagLabs } from '../tests/hw/26/page_object/page_factory';

type MyFixture = {
    standardUser: undefined,
    excelUser: { header: Record<string, any>, payload: Record<string, any> },
    youngestUser: User,
    testFixture: string,
    adminFixture: string,
    regularUserFixture: string,
    restfullController: RestfulController,
    swagLabs: SwagLabs,
}

export type User = {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    gender: "female" | "male",
    username: string,
    password: string,
    birthDate: string,
    eyeColor: "Green" | "Red" | "Hazel" | "Amber" | "Blue" | "Brown" | "Violet" | "Gray",
    hair: {
        color: "Brown" | "Green" | "White" | "Blonde" | "Gray" | "Red" | "Purple" | "Blue" | "Black",
        type: "Curly" | "Straight" | "Wavy" | "Kinky"
    },
    role: "admin" | "moderator" | "user"
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
    excelUser: async ({ page }, use) => {
        let token: string = '';
        let header: Record<string, any> = {};
        let payload: Record<string, any> = {};

        try {
            token = readFileSync('.auth/excel_user_token.txt', 'utf-8');
            const parts = token.split('.'); // header . payload . secret  -> [header, payload]
            const [headerB64, payloadB64] = parts;
            header = JSON.parse(Buffer.from(headerB64, 'base64url').toString());
            payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
        } catch (e) {
            console.log(e, '\nToken file not found, proceeding to fetch a new one.');
        }

        const isExpired = (payload.exp ?? 0) * 1000 < Date.now();

        if (isExpired) {
            console.log('Downloading new token');
            const baseUrl = 'https://pu5hds6usi.execute-api.us-east-1.amazonaws.com';
            token = (await (await page.request.post(baseUrl + '/auth', {
                data: {
                    username: 'odmin',
                    password: 'any'
                }
            })).json()).token;

            writeFileSync('.auth/excel_user_token.txt', token);
        }

        page.setExtraHTTPHeaders({
            Authorization: `Bearer ${token}`
        })

        await use({ header, payload });
    },
    youngestUser: async ({ request }, use) => {
        let user: User
        const getUsers = async (skip = 0) => (await (await request.get(`https://dummyjson.com/users?skip=${skip}`)).json());

        const firstResponse = await getUsers();
        const batchRequests = [];

        while (batchRequests.length < Math.floor(firstResponse.total / firstResponse.limit)) {
            const count: number = batchRequests.length + 1;
            batchRequests.push(getUsers(firstResponse.limit * count));
        }
        const batchResponse = (await Promise.all(batchRequests));
        const usersResponse = [...firstResponse.users, ...batchResponse.flatMap(resp => resp.users)];
        const foundUser = usersResponse.reduce((curr: User, acc: User) => (curr.age < acc.age) && curr.role == 'user' ? curr : acc);

        // shorter, but won't always work due to limitations for other endpoints
        // const usersResponseLimit = await (await request.get('https://dummyjson.com/users?limit=250')).json()
        // const foundUser = usersResponseLimit.users.reduce((curr: User, acc: User) => (curr.age < acc.age) && curr.role == 'user' ? curr : acc);

        const authUser = await (await request.post('https://dummyjson.com/auth/login', {
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                username: foundUser.username,
                password: foundUser.password
            }),
        })).json()

        user = await (await request.get(`https://dummyjson.com/user/me`, {
            headers: {
                Authorization: `Bearer ${authUser.accessToken}`
            },
        })).json()

        await use(user);
    },
    testFixture: ({ }, use) => {
        const now = new Date();

        use(now.toISOString());
    },
    adminFixture: async ({ }, use) => {
        const text = 'I am an admin'
        console.log(text)
        await use(text);
    },
    regularUserFixture: async ({ }, use) => {
        const text = 'I am a user'
        console.log(text)
        await use(text);
    },
    restfullController: async ({ request }, use) => {
        const initialUrl = 'https://api.restful-api.dev';
        const controller = new RestfulController(request, initialUrl);
        await use(controller);
    },
    swagLabs: async ({ page }, use) => {
        await use(new SwagLabs(page));
    }
})
