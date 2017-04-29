const fs = require("fs");

const farm = require("./input/foodAreaLocalAuth");
const pop = require("./input/populationCounty");
const mapping = require("./input/authsByCounty");

const farmFullLength = Object.keys(farm).length;
let data = {};

for (let i = 0; i < mapping.length; i++) {
    let item = mapping[i];

    let authname = item.LAD15NM;
    if (!authname) continue;

    let countyname = item.CTY15NM;
    if (!countyname) continue;

    let countycode = item.LAD15CD;
    if (!countycode) continue;

    let countypop = getPop(countycode) || 0;

    let farmland = getFarm(authname) || 0;

    if (data[countyname]) {
        data[countyname].farmland += farmland;
        if (!data[countyname].population) data[countyname].population = countypop;
    } else {
        data[countyname] = {
            population: countypop,
            farmland: farmland
        };
    }
}
let json = JSON.stringify(data, null, 4);
fs.writeFile('counties.json', json, 'utf8', function () {
    console.log("--------------- UNMATCHED AUTHORITIES ---------------");
    console.log(Object.keys(farm).length + " / " + farmFullLength);
    console.log(JSON.stringify(farm, null, 4));
});

function getPop(code) {
    for (let i = 0; i < pop.length; i++) {
        if (pop[i].code === code) {
            let str = pop[i].pop;
            pop.splice(i, 1);
            let strnum = str.replace(",", "");
            return Number(strnum);
        }
    }
    return;
}

function getFarm(auth) {

    // Exact match
    if (farm[auth] !== undefined) {
        let f = farm[auth];
        delete farm[auth];
        return f;
    }

    // Partial match
    let keys = Object.keys(farm);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (matchStr(key, auth)) {
            console.log("PARTIAL MATCHED " + key + " TO " + auth);
            let f = farm[key];
            delete farm[key];
            return f;
        }
    }
    return;
}

function matchStr(a, b) {
    let a1 = matchableStr(a);
    let b1 = matchableStr(b);
    return a1 === b1 || a1.includes(b1) || b1.includes(a1);
}

function matchableStr(str) {
    return str
        .toLowerCase()
        .replace(".", "")
        .replace("-", " ")
        .replace(" and ", " ")
        .replace(" & ", " ")
        .replace(",", "")
        .replace(" ", "");
}