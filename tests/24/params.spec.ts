import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' })
test.describe('Params @test_me', async () => {


    ['one', 'two', 'three'].forEach(element => {
        test(`Use storage state ${element}`, async ({ page }) => {
            await page.goto('https://www.saucedemo.com/inventory.html');

            function consoleIntoBrowser(myVariable: string) {
                console.log(myVariable)
            }

            await page.evaluate(consoleIntoBrowser, element) // function('one)

            // consoleIntoBrowser('one')
            // consoleIntoBrowser('two')

            console.log(element)

            // await page.evaluate(() => console.log('test me'))
            // const tableContent = await page.evaluate(() => document.cookie)
            // expect(tableContent.split('=')[1]).toEqual('standard_user')
        });
    })

});
