var sql = require("mssql");

var config = {
    user: 'sa',
    password: process.env.SQLPASS,
    server: 'localhost',
    port: 1434, 
    database: 'node-ms' 
    };

async function selectAllFromSQL() {
    const query = "SELECT * FROM cities";

    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "{"+ err +"}";
    }
}

async function selectFromSQL(column, value) {
    const query = "SELECT * FROM cities WHERE " + column + "='" + value + "'";

    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "[{"+ err +"}]";
    }
}

var town = {
    list: async function (req, res) {
        const found = await selectAllFromSQL();
        if (found) {
            console.log("All Towns found");
            res.send(found);
        } else {
            console.log("Towns not found");
            res.status(404).send("Towns not found");
        }
    },

    findId: async function (req, res) {
        const townId = req.params.id;
        const found = await selectFromSQL("geonameid", townId);
        if (found) {
            console.log("Town found by ID: " + townId);
            res.send(found);
        } else {
            console.log("Town not found by ID: " + townId);
            res.status(404).send("Town not found by ID: " + townId);
        }
    },

    findName: async function (req, res) {
        const townName = req.params.name;
        const found = await selectFromSQL("name", townName);
        // console.log(found);

        if (found) {
            console.log("Town found by name: " + townName);
            res.send(found);
        } else {
            console.log("Town not found by name: " + townName);
            res.status(404).send("Town not found by name: " + townName);
        }
    },

    findCC: async function (req, res) {
        const townCC = req.params.cc;
        const found = await selectFromSQL("country_code", townCC);
        // console.log(found);

        if (found) {
            console.log("Town found by country code: " + townCC);
            res.send(found);
        } else {
            console.log("Town not found by country code: " + townCC);
            res.status(404).send("Town not found by country code: " + townCC);
        }[]
    },
};

module.exports = town;
