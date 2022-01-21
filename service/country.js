const countries = require('./countrydata')

const notFound = 'Country not found';

/*
[
    {
    "name":"Germany",
    "topLevelDomain":[".de"],
    "alpha2Code":"DE",
    "alpha3Code":"DEU",
    "callingCodes":["49"],
    "capital":"Berlin",
    "altSpellings":
        ["DE",
        "Federal Republic of Germany",
        "Bundesrepublik Deutschland"
        ],
    "region":"Europe",
    "subregion":"Western Europe",
    "population":81770900,
    "latlng":[51,9],
    "demonym":"German",
    "area":357114,
    "gini":28.3,
    "timezones":["UTC+01:00"],
    "borders":["AUT","BEL","CZE","DNK","FRA","LUX","NLD","POL","CHE"],
    "nativeName":"Deutschland",
    "numericCode":"276",
    "currencies":
        [{  "code":"EUR",
            "name":"Euro",
            "symbol":"€"
        }],
    "languages":
        [{  "iso639_1":"de",
            "iso639_2":"deu",
            "name":"German",
            "nativeName":"Deutsch"
        }],
    "translations":
        {   "de":"Deutschland",
            "es":"Alemania",
            "fr":"Allemagne",
            "ja":"ドイツ",
            "it":"Germania",
            "br":"Alemanha",
            "pt":"Alemanha",
            "nl":"Duitsland",
            "hr":"Njemačka",
            "fa":"آلمان"
        },
    "flag":"https://restcountries.eu/data/deu.svg",
    "regionalBlocs":
        [{  "acronym":"EU",
            "name":"European Union",
            "otherAcronyms":[],
            "otherNames":[]
        }],
    "cioc":"GER"
    }
]
*/


function getCountryById2(id) {
    return countries.filter(
        function(countryfound) {
            return countryfound.alpha2Code == id
        }
    );
}

function getCountryByName(name) {
    return countries.filter(
        function(countryfound) {
            return countryfound.name == name
        }
    );
}

var country = {
    list: function(req, res) {
        res.send(countries);    
    },

    findId2: function(req, res) {
        const countryId2 = req.params.id2;
        const found = getCountryById2(countryId2.toUpperCase());
        if (found) {
            found.forEach(element => {
                console.log('Countryid2 found: ' + element.alpha2Code + "="+ element.name);            
            });
            res.send(found);
        } else {
            console.log(notFound);
            res.status(404).send(notFound);
        }
   },

   findName: function(req, res) {
    const countryName = req.params.name;
    const found = getCountryByName(countryName);
    if (found) {
        found.forEach(element => {
            console.log('Countryname found: ' + element.name);            
        });
        res.send(found);
    } else {
        console.log(notFound);
        res.status(404).send(notFound);
    }
}
};

module.exports = country;