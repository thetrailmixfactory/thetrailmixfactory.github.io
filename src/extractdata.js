convertExcel = require('excel-as-json2').processFile;
const fs = require("fs");

fs.unlinkSync("./data.json");


const prodoptions = {
    sheet: '1',
    omitEmptyFields: false,
}

const premadeoptions = {
    sheet: '2',
    omitEmptyFields: false,
}

const defualtoptions = {
    sheet: '3',
    omitEmptyFields: false,
}

var res = {};

convertExcel("options.xlsx", undefined, prodoptions, (err, data) => {
    res.prod = data;
    //console.log(data);

    convertExcel("options.xlsx", undefined, premadeoptions, (err, data2) => {
        res.premade = data2;

        convertExcel("options.xlsx", undefined, defualtoptions, (err, data3) => {
            res.defaults = data3;

            fs.writeFileSync("data.json", JSON.stringify(res));
        })
    })
})



