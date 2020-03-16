const fs = require("fs"),
path = require("path"),
notePath = path.join(__dirname, "notes.json"),
chalk = require("chalk");
const { Parser } = require('json2csv');
const csvToJson = require("csvtojson");
const dateFormat = require('dateformat');

function getNotes(){
    try{
        return JSON.parse(fs.readFileSync(notePath, "utf8"));
    } catch (error){
        fs.writeFileSync(notePath,'[]');
        return JSON.parse(fs.readFileSync(notePath, "utf8"));
    }
};

function addNote(title, body) {
    const time = getTime();
    obj = {
        title,
        body,
        time
    };
    const arrayJson = getNotes(),
    duplicateNote = arrayJson.find(el => el.title === title);
    if (duplicateNote) {
        console.log("Sorry there is such title in json");
    } else {
        arrayJson.push(obj);
        fs.writeFileSync(notePath, JSON.stringify(arrayJson, null, " "));
    }
}

function listNote() {
    const arrayJson = getNotes();
    if(arrayJson.length > 0){
    console.log(chalk.blue.inverse("ALL NOTES"));
    console.log(fs.readFileSync(notePath, "utf8"));
    } else {
        console.log("there is no notes");
    }
}

function readNote(title) {
    const arrayJson = getNotes(),
    note = arrayJson.find(element => element.title === title)
    if (note) {
        console.log(chalk.blue.inverse("title:") + " " + note.title) 
        console.log(chalk.yellow.inverse("body:") + " " + note.body)
    } else(
        console.log('there is no such title')
    )
}

function removeNote(title) {
    const arrayJson = getNotes(),
    titleFinder = arrayJson.find(item => item.title === title),
        indexOfTitle = arrayJson.indexOf(titleFinder);
    if (titleFinder) {
        arrayJson.splice(indexOfTitle, 1);
        console.log(titleFinder)
        console.log(chalk.red.inverse("DELETED"))
        fs.writeFileSync("notes.json", JSON.stringify(arrayJson, null, " "));
    } else {
        console.log("nothing to delete");
    }
}



function sortWithParams(text, order){

    const arrayJson = getNotes();
    

    if(text === "title" && order === "ascending") {
        arrayJson.sort((a,b) => a.title.length - b.title.length);
    } 
    else if(text === "title" && order === "descending") {
        arrayJson.sort((a,b) => b.title.length - a.title.length);
    }
    if(text === "body" && order === "ascending") {
        arrayJson.sort((a,b) => a.body.length - b.body.length);
    }
    else if(text === "body" && order === "descending") {
        arrayJson.sort((a,b) => b.body.length - a.body.length);
    }
    if(text === "time" && order === "ascending") {
        arrayJson.sort((a,b) => a.time < b.time ? -1 : 1);
    }
    else if(text === "time" && order === "descending") {
        arrayJson.sort((a,b) => a.time > b.time ? -1 : 1);
    }
    if(text === "al" && order === "ascending") {
        arrayJson.sort((a,b) => a.title < b.title ? -1 : 1);
    }
    else if(text === "al" && order === "descending") {
        arrayJson.sort((a,b) => a.title > b.title ? -1 : 1);
    }

    fs.writeFileSync("notes.json", JSON.stringify(arrayJson, null, " "));
}

function writeNotesToCSV() { 
    const fields = ["title", "body", "time"],
    arrayJson = getNotes(),
    json2csvParser = new Parser({
            fields
        }),
    csv = json2csvParser.parse(arrayJson);
    fs.writeFileSync("file.csv", csv);
}

function readFromExcel(){
    csvToJson().fromFile('file.csv').then(source => {
        fs.writeFileSync('notesFromCsv.json', JSON.stringify(source, null, " "));
    })
}

function findAndUpdate(title, body){
    const arrayJson = getNotes(),
    note = arrayJson.find(element => element.title === title)
    if (note) {
        note.body = body;
        fs.writeFileSync("notes.json", JSON.stringify(arrayJson, null, " "));
    } else {
        console.log('Sorry, there is no duplicate titles to change')
    }
}

function getTime(){
        const now = new Date;
        return dateFormat(now, "dd/mm/yyyy, hh:MM:ss TT");
    }

module.exports = {
    addNote,
    listNote,
    readNote,
    removeNote,
    sortWithParams,
    writeNotesToCSV,
    readFromExcel,
    findAndUpdate
}