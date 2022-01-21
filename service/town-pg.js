const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.LOCALPGUSER,
    host: process.env.LOCALPGSERVER,
    database: process.env.LOCALPGDATABASE,
    password: process.env.LOCALPGPASS,
    port: 5432,
});

async function selectFromPG(column, value) {
    // await client.connect();
    const query = "SELECT * FROM alltowns WHERE " + column + "='" + value + "'";
    const result = await pool.query(query);
    // await client.end();
    // console.log(result.rows);
    return result.rows;
}

var town = {
    list: async function (req, res) {
        const found = await selectFromPG("1", "1");
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
        const found = await selectFromPG("geonameid", townId);
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
        const found = await selectFromPG("name", townName);
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
        const found = await selectFromPG("country_code", townCC);
        // console.log(found);

        if (found) {
            console.log("Town found by country code: " + townCC);
            res.send(found);
        } else {
            console.log("Town not found by country code: " + townCC);
            res.status(404).send("Town not found by country code: " + townCC);
        }
    },
};

module.exports = town;
