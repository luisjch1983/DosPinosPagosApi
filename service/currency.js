const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

async function getCurrency() {
    return new Promise( (resolve, reject) => {
        const endpoint = "https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt";
        try {
            var client = new XMLHttpRequest();
            client.open('GET', endpoint);
            client.send();
            client.onload = () => {
                if (client.status >= 200 && client.status < 400) { 
                    resolve(client.responseText);
                } else {
                    console.log("Error in getting currency data: " + error);
                    reject("Error in getting currency data: " + error);
                }
            }            
        }
        catch (error) {
            console.log("Error in getting currency data: " + error);
            reject("Error in getting currency data: " + error);
        }
    })
}

var currency = {
    findCURR: async function (req, res) {
        const found = await getCurrency();
        const currencyname = req.params.currname;
        let result = '';
        if (found) {
            console.log("Currency found");
            const arr = found.split("\n");
            arr.forEach(element => {
                const column = element.split("|");
                if (column[3] == currencyname.toUpperCase()) {
                    result = JSON.parse('{"' + column[3] + '":"' + column[2] + '","CZK":"' + column[4] + '"}');                    
                }
            });
            res.send(result);
        } else {
            console.log(currencyname + " not found");
            res.status(404).send(currencyname + " not found");
        }
    },

    findALL: async function (req, res) {
        const found = await getCurrency();
        let result = '';
        if (found) {
            console.log("Currencies found");
            const arr = found.split("\n");
            var i;
            for (i = 2; i < arr.length-1; i++) {
                const column = arr[i].split("|");
                if (result == "") {
                    result = result + "[";                    
                } else {
                    result = result + ",";
                }                    
                result = result + '{"' + column[3] + '":"' + column[2] + '","CZK":"' + column[4] + '"}';                    
            }
            result = result + "]";
            res.send(JSON.parse(result));
        } else {
            console.log("Currency not found");
            res.status(404).send("Currency not found");
        }
    },
};

module.exports = currency;
