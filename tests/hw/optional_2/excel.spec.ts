import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custom-fixture';
import { rmSync } from 'fs';
import path, { dirname } from 'node:path';
import xlsx from 'xlsx'
import fs from 'fs'

// Optional task_2:
// 1. Добавьте еще одну фикстуру
//      - фикстура должна аутентифицироваться (пункт 2) и сохранять токен в файл в .auth папке
//      - для получения токена можете использовать метод page.request.post()
//      - фикстура должна добавлять дополнительный HTTP заголовок (page.setExtraHTTPHeaders()) для авторизации с помощью токена
//      - фикстура должна добавлять дополнительный HTTP заголовок (page.setExtraHTTPHeaders()) для авторизации с помощью токена (в виде `Bearer ${token}`)
//      - новый токен должен запрашиваться только если существующий в файле уже просрочен. Токен состоит из трех частей, вторая часть - payload, в нем есть поле exp с временем истечения в секундах. Для декодирования можете использовать метод JSON.parse(Buffer.from(<вторая_часть_токена>, 'base64url').toString())
// 2. Аутентифицируйтесь по адресу https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/auth
//      - в качестве имени используйте ваше <имя_фамилия>
//      - в качестве пароля используйте название вашего аккаунта в гитхабе
// 3. Если фикстура реализована правильно, то в тесте вы сможете скачать файл по адресу https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/get_file
//      - перейти на страницу в бразуере и поймать событие скачивания файла
//      - скачанный файл сохранить в папку downloads рядом с тестом
// 4. Прочитать excel файл
//      - проверить что в первой ячейке первого столбца первого листа написано "Congratulations!"
//      - проверить что наименования листов ожидаемые
//      - для чтения excel файла использовать библиотеку xlsx https://www.npmjs.com/package/xlsx#processing-json-and-js-data
//      - пример чтения файла:
//          xlsx.readFile(filePath);
//          xlsx.utils.sheet_to_json(fileContent.Sheets.sheetName);

let dirName: string
let fileName: string

test.afterAll(({ }) => {
    rmSync(dirName, { recursive: true, force: true })
})

test('Optional task_2 - Excel', async ({ page, excelUser: _excelUsers }, testInfo) => {
    dirName = path.dirname(testInfo.file) + '/downloads/'

    await test.step('Download file', async () => {
        const downloadPromise = page.waitForEvent('download', { timeout: 3_000 });
        await page.goto('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/get_file');
        const download = await downloadPromise
        fileName = download.suggestedFilename();
        await download.saveAs(dirName + fileName);
    });

    await test.step('Validate excel', async () => {
        const fileContent = xlsx.readFile(dirName + fileName);
        const sheetNames = fileContent.SheetNames;
        const firstSheetData: Array<Record<string, string>> = xlsx.utils.sheet_to_json(fileContent.Sheets[sheetNames[0]]);
        expect(firstSheetData[0]['First column']).toEqual('Congratulations!')
    });
});
