var fs = require("fs");
const startfile = 'const towns = [\n\n';
const endfile = '];\n\nmodule.exports = towns;\n';

fs.readFile("./someCountries.txt","utf8", function(err, data){
    var rows = data.split("\n");
    var json = [];
    var keys = [];

    rows.forEach((value, index)=>{
        if(index < 1){// get the keys from the first row in the tab space file
            keys = value.split("\t");
        }else {// put the values from the following rows into object literals
            values = value.split("\t");
            json[index-1] = values.map((value, index) => {
                return {
                    [keys[index]]: value
                }
            }).reduce((currentValue, previousValue) => {
                return {
                    ...currentValue,
                    ...previousValue
                }
            });
        }
    })


    // convert array of objects into json str, and then write it back out to a file
    let jsonStr = JSON.stringify(json);
    fs.writeFileSync("./allCountries.json", startfile + jsonStr + endfile, {encoding: "utf8"})
});