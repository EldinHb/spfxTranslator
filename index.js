#! /usr/bin/env node

const requireJS = require('requirejs');
const fs = require('fs');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const providers = require('./config.json');

const args = process.argv.slice(2);

const getParam = (text) => {
    for (const arg of args) {
        const splitArg = arg.split('=');
        if (splitArg[0] === text) return splitArg[1];
    }
    return null;
}

const setAzureKeyParam = getParam('-set-azure-key');

const setAzureKey = () => {
    const config = require('./config.json');
    config.azure.key = setAzureKeyParam;
    fs.writeFile('./config.json', JSON.stringify(config, null, 4), function () {
        console.log('Azure key set to ' + setAzureKeyParam);
    });
}

const translateSpfx = () => {
    const locPath = getParam('-path');
    const mainFileName = getParam('-main-file') ? getParam('-main-file') : 'en-us.js';
    const mainFile = requireJS(`${locPath}/${mainFileName}`);
    const keys = Object.keys(mainFile);
    const force = getParam('-force') ? getParam('-force') : false;
    const provider = getParam('-provider') ? providers[getParam('-provider').toLowerCase()] : providers.azure;
    
    const translateWithAzure = async (to, text) => {
        console.log(provider.key);
        const response = await axios({
            baseURL: provider.endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': provider.key,
                'Ocp-Apim-Subscription-Region': provider.location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': mainFileName.replace('.js', ''),
                'to': to
            },
            data: text,
            responseType: 'json'
        });
    
        return response.data;
    }
    
    const translate = (provider, to, text) => {
        switch (provider) {
            case 'azure':
                return translateWithAzure(to, text);
            default:
                console.log('something went wrong');
                break;
        }
    }
    
    fs.readdir(locPath, async function (err, files) {
        const langs = [];
    
        for (const file of files) {
            if (file === 'mystrings.d.ts') continue;
            const lang = file.replace('.js', '');
            langs.push(lang);
        }
    
        for (const key of keys) {
            const toTrans = [{ text: mainFile[key] }];
            const data = await translate('azure', langs, toTrans);
            for (const trans of data[0].translations) {
                const langFile = files.find(x => x.startsWith(trans.to));
                const langObj = requireJS(`${locPath}/${langFile}`);
    
                if (langObj[key] && !force) continue;
    
                langObj[key] = trans.text;
                const stringResult = JSON.stringify(langObj, null, 8);
                fs.writeFile(`${locPath}/${langFile}`, `define([], function() { \n    return ${stringResult};\n});`, function () {
                    console.log(`Translated file: ${langFile}`);
                });
            }
        }
    });
}

if (setAzureKeyParam) {
    setAzureKey();
} else {
    translateSpfx();
}