/**
 * @fileoverview Custom test client for API test demo server.
 * @author Joey Whelan <joey.whelan@gmail.com>
 */

'use strict';
'use esversion 6';
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:8888/page'; //replace with actual URL to REST API

async function createTest(url, body) {
    console.log(`Create Test: ${url}, ${JSON.stringify(body)}`);

    const start = Date.now();
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    const finish = Date.now();
    const respTime = finish - start;

    let result;
    try {
        result = JSON.stringify(await response.json());
    }
    catch (err) {
        result = err;
    }
    console.log(`Response status: ${response.status}`);
    console.log(`Response value: ${result}`);
    console.log(`Response time: ${respTime} ms`);
    console.log('****************');
}

async function retrieveTest(url) {
    console.log(`Retrieve Test: ${url}`);

    const start = Date.now();
    const response = await fetch(url, {
        method: 'GET'
    });
    const finish = Date.now();
    const respTime = finish - start;
    
    let result;
    try {
        result = JSON.stringify(await response.json());
    }
    catch (err) {
        result = err;
    }
    console.log(`Response status: ${response.status}`);
    console.log(`Response value: ${result}`);
    console.log(`Response time: ${respTime} ms`);
    console.log('****************');
}

async function updateTest(url) {
    console.log(`Update Test: ${url}`);

    const start = Date.now();
    const response = await fetch(url, {
        method: 'PATCH'
    });
    const finish = Date.now();
    const respTime = finish - start;
    
    let result;
    try {
        result = JSON.stringify(await response.json());
    }
    catch (err) {
        result = err;
    }
    console.log(`Response status: ${response.status}`);
    console.log(`Response value: ${result}`);
    console.log(`Response time: ${respTime} ms`);
    console.log('****************');
}

async function deleteTest(url) {
    console.log(`Delete Test: ${url}`);

    const start = Date.now();
    const response = await fetch(url, {
        method: 'DELETE'
    });
    const finish = Date.now();
    const respTime = finish - start;
    
    let result;
    try {
        result = JSON.stringify(await response.json());
    }
    catch (err) {
        result = err;
    }
    console.log(`Response status: ${response.status}`);
    console.log(`Response value: ${result}`);
    console.log(`Response time: ${respTime} ms`);
    console.log('****************');
}

(async () => {
    try {
        const pageId = 'testpage';
        await createTest(BASE_URL, {'pageId': pageId});
        await retrieveTest(`${BASE_URL}/${pageId}/hitCount`);
        await updateTest(`${BASE_URL}/${pageId}/hitCount`);
        await deleteTest(`${BASE_URL}/${pageId}`);
    }
    catch(err) {
        console.error(err);
    }
})();