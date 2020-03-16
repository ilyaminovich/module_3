const axios = require('axios');
const fs = require('fs');
chalk = require("chalk");

function downloadRickAndMortyApi() {

    let arrayJson = [];

    let numberOfPages;
    axios({
        method: 'get',
        url: `https://rickandmortyapi.com/api/character/?page=1`,
        responseType: 'json'
    }).then(response => {

        numberOfPages = response.data.info.pages;
    }).then(() => {
        for (let i = 1; i <= numberOfPages; i++) {
            axios({
                method: 'get',
                url: `https://rickandmortyapi.com/api/character/?page=${i}`,
                responseType: 'json'
            })
                .then(response => {
                    arrayJson = arrayJson.concat(response.data.results).sort((a, b) => a.id - b.id);
                    fs.writeFileSync('rickAndMorty.json', JSON.stringify(arrayJson, null, " "))
                });

        }

    });
}

function getData() {
    try {
        return JSON.parse(fs.readFileSync('rickAndMorty.json', 'utf8'));
    } catch (error) {
        fs.writeFileSync('rickAndMorty.json', '[]');
        return JSON.parse(fs.readFileSync('rickAndMorty.json', 'utf8'));
    }
};

function multipleSearch(...args) {

    let arrayWithCommandLineArguments = [];
    let arrayForFirstSort = [];
    let arrayWithJsonData = getData();

    for (let o = 0; o < args[0].length; o++) {
        arrayWithCommandLineArguments.push(args[0][o]);
    }

    for (let i = 0; i < arrayWithCommandLineArguments.length; i += 2) {
        const characteristic = arrayWithCommandLineArguments[i];

        if (arrayForFirstSort.length === 0) {

            for (let element in arrayWithJsonData) {
                if (arrayWithJsonData[element][characteristic].toString() === arrayWithCommandLineArguments[i + 1]) {
                    arrayForFirstSort.push(arrayWithJsonData[element]);
                    fs.writeFileSync('sortedDataRickAndMorty.json', JSON.stringify(arrayForFirstSort, null, ' '));
                }
            }
        } else {
            arrayForFirstSort = JSON.parse(fs.readFileSync('sortedDataRickAndMorty.json', 'utf8'));
            let arrayForOtherSorts = [];

            for (let element in arrayForFirstSort) {
                if (arrayForFirstSort[element][characteristic].toString() === arrayWithCommandLineArguments[i + 1]) {
                    arrayForOtherSorts.push(arrayForFirstSort[element]);
                    fs.writeFileSync('sortedDataRickAndMorty.json', JSON.stringify(arrayForOtherSorts, null, ' '));
                }
            }
        }
    }
}

module.exports = {
    multipleSearch
}

downloadRickAndMortyApi();