import { test, expect } from '@playwright/test';

test.describe('Objects API - Playwright', () => {
    let createdId: string;

    test.beforeEach(async ({ request }) => {
        const res = await request.post('https://api.restful-api.dev/objects', {
            data: {
                name: 'HW25 object',
                data: { price: 11111122222222 },
            },
        });

        // If it fails again, this text will immediately show why
        expect(res.status(), await res.text()).toBe(200);

        const body = await res.json();
        createdId = body.id;
        expect(createdId).toBeTruthy();
    });

    test.afterEach(async ({ request }) => {
        const del = await request.delete(`https://api.restful-api.dev/objects/${createdId}`);
        // if test already deleted it, 404 is ok
        expect([200, 404]).toContain(del.status());
    });

    test('GET /objects - should return list', async ({ request }) => {
        const res = await request.get('https://api.restful-api.dev/objects');
        expect(res.status(), await res.text()).toBe(200);

        const body = await res.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test('GET /objects/:id - should return object by id', async ({ request }) => {
        const res = await request.get(`https://api.restful-api.dev/objects/${createdId}`);
        expect(res.status(), await res.text()).toBe(200);

        const body = await res.json();
        expect(body.id).toBe(createdId);
        expect(body).toHaveProperty('name');
    });

    test('GET /objects?id=...&id=... - should return multiple objects by ids', async ({ request }) => {
        const res = await request.get('https://api.restful-api.dev/objects?id=1&id=2');
        expect(res.status(), await res.text()).toBe(200);

        const body = await res.json();
        expect(body[0].id).toBe('1');
        expect(body[1].id).toBe('2');
    });

    test('PUT /objects/:id - should update (full)', async ({ request }) => {
        const res = await request.put(`https://api.restful-api.dev/objects/${createdId}`, {
            data: { name: 'Updated Name', data: { price: 999 } },
        });

        expect(res.status(), await res.text()).toBe(200);
        const body = await res.json();
        expect(body.name).toBe('Updated Name');
    });

    test('PATCH /objects/:id - should patch (partial)', async ({ request }) => {
        const res = await request.patch(`https://api.restful-api.dev/objects/${createdId}`, {
            data: { data: { price: 555 } },
        });

        expect(res.status(), await res.text()).toBe(200);
        const body = await res.json();
        expect(body.data.price).toBe(555);
    });

    test('DELETE /objects/:id - should delete', async ({ request }) => {
        const del = await request.delete(`https://api.restful-api.dev/objects/${createdId}`);
        expect(del.status(), await del.text()).toBe(200);

        const getAfter = await request.get(`https://api.restful-api.dev/objects/${createdId}`);
        expect(getAfter.status()).toBe(404);
    });
});