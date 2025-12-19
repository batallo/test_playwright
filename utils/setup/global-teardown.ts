import { test as teardown } from '@playwright/test';
import { readFileSync, rmSync } from 'fs';

teardown('console.log context', async ({ browserName }) => {
    // const myFile = readFileSync('.auth/standard_user.txt', 'utf-8');
    // rmSync('.auth', { recursive: true, force: true })
    console.log('Passed with ' + browserName);
});