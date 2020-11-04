convertExcel = require('excel-as-json2').processFile;
const fs = require("fs");

fs.unlinkSync("./data.json");


const prodoptions = {
    sheet: 'options',
    omitEmptyFields: false,
}

const premadeoptions = {
    sheet: 'premade',
    omitEmptyFields: false,
}

var res = {};

convertExcel("options.xlsx", undefined, prodoptions, (err, data) => {
    res.prod = data;
    //console.log(data);

    convertExcel("options.xlsx", undefined, premadeoptions, (err, data) => {
        res.premade = data;

        fs.writeFileSync("data.json", JSON.stringify(res));
    })
})



