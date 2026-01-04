import { test, expect } from '@playwright/test';


// Task9: Для сайта https://the-internet.herokuapp.com/tables
// 1. Создать скрипт на получение заголовка сайта(title)
// 2. Запустить скрипт через page.evaluate()
// 3. Проверить что полученные title совпадает с ожидаемым
// 4.(опционально, сложная задача) Создать функцию которая будет принимать в себя число 1 или 2
//     На выходе функция должна собирать данные из соответствующей таблицы(Example 1 или Example 2)
//     Выходные данные должны иметь вид массива(порядок свойств объектов не важен, порядок объектов в массиве - соответствует порядку строк в таблице)

test('Task 9 - Eval @problem', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    const expectedContent = [
        {
            "Last Name": "Smith",
            "First Name": "John",
            "Email": "jsmith@gmail.com",
            "Due": "$50.00",
            "Web Site": "http://www.jsmith.com",
            "Action": "edit delete"
        },
        {
            "Last Name": "Bach",
            "First Name": "Frank",
            "Email": "fbach@yahoo.com",
            "Due": "$51.00",
            "Web Site": "http://www.frank.com",
            "Action": "edit delete"
        },
        {
            "Last Name": "Doe",
            "First Name": "Jason",
            "Email": "jdoe@hotmail.com",
            "Due": "$100.00",
            "Web Site": "http://www.jdoe.com",
            "Action": "edit delete"
        },
        {
            "Last Name": "Conway",
            "First Name": "Tim",
            "Email": "tconway@earthlink.net",
            "Due": "$50.00",
            "Web Site": "http://www.timconway.com",
            "Action": "edit delete"
        }
    ]

    const code = (tableNumber: number) => {
        const table = document.querySelector(`#table${tableNumber}`)
        if (!table) throw new Error('No table found');

        const headers = Array.from(table.querySelectorAll('th')).map(el => el.innerText)
        if (!headers) throw new Error('No headers found');

        const rows = table.querySelectorAll('tbody tr')
        if (!rows) throw new Error('No rows found');

        const tableData = Array.from(rows).map(row => Array.from(row.querySelectorAll('td')).map(el => el.innerText))

        return tableData.map(row => Object.fromEntries((headers.map((h, i) => [h, row[i]]))))
    }

    console.time('a')
    const tableContent = await page.evaluate(code, 1)
    console.timeEnd('a')
    expect(tableContent).toMatchObject(expectedContent)
});


test('Task 9 - Eval - native PW', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    const expectedContent = [
        {
            "Last Name": "Smith",
            "First Name": "John",
            "Email": "jsmith@gmail.com",
            "Due": "$50.00",
            "Web Site": "http://www.jsmith.com",
            "Action": "edit delete"
        },
        {
            "Last Name": "Bach",
            "First Name": "Frank",
            "Email": "fbach@yahoo.com",
            "Due": "$51.00",
            "Web Site": "http://www.frank.com",
            "Action": "edit delete"
        },
        {
            "Last Name": "Doe",
            "First Name": "Jason",
            "Email": "jdoe@hotmail.com",
            "Due": "$100.00",
            "Web Site": "http://www.jdoe.com",
            "Action": "edit delete"
        },
        {
            "Last Name": "Conway",
            "First Name": "Tim",
            "Email": "tconway@earthlink.net",
            "Due": "$50.00",
            "Web Site": "http://www.timconway.com",
            "Action": "edit delete"
        }
    ]

    const tableNumber = 1;

    console.time('b');
    const table = page.locator(`#table${tableNumber}`)
    const headers = await table.locator('th').allTextContents();
    const rows = table.locator('tbody tr');

    const tableContent = [];

    for (let i = 0; i < await rows.count(); i++) {
        const row = await rows.nth(i).locator('td').allInnerTexts();
        tableContent.push(Object.fromEntries((headers.map((h, i) => [h, row[i]]))))
    }
    console.timeEnd('b');

    expect(tableContent).toMatchObject(expectedContent)
});


// [] time difference
