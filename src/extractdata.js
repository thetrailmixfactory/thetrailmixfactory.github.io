const XLSX = require('xlsx');
const fs = require("fs");

if (fs.existsSync("./data.json")) {
    fs.unlinkSync("./data.json");
}

var workbook = XLSX.readFile('options.xlsx');

res = {}

res.prod = XLSX.utils.sheet_to_json(workbook.Sheets["Options"]);
res.premade = XLSX.utils.sheet_to_json(workbook.Sheets["Premade"]);
res.defaults = XLSX.utils.sheet_to_json(workbook.Sheets["Defaults"]);

fs.writeFileSync("./data.json", JSON.stringify(res));






