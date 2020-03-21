#!/usr/bin/env node
'use strict';

const commander = require('commander');
const request = require('request');
const DEFAULT_STATUS = 'confirmed';

const program = new commander.Command();
program.version('0.0.1');

program
    .option('-c, --country <country>', 'country to query')
    .option('-d, --deaths', 'query for deaths')
    .option('-r, --recovered', 'query for recovered');

program.parse(process.argv);

if (program.country) {
    let status;
    if (program.deaths) {
        status = 'deaths';
    } else if (program.recovered) {
        status = 'recovered';
    } else {
        status = DEFAULT_STATUS;
    }

    const endpoint = `https://api.covid19api.com/total/dayone/country/${program.country}/status/${status}`;
    request(endpoint, function (error, response, body) {
        if (error) {
            console.log('An error occured while fetching data from API.');
        }

        const results = JSON.parse(body);
        if (results) {
            const lastStats = results.slice(-1)[0];
            const lastUpdate = lastStats.Date;
            const cases = lastStats.Cases;

            console.log(`${status}:`, cases);
            console.log('Last update:', lastUpdate);
        } else {
            console.log('No results found for your query.');
        }
    });
} else {
    console.log('Error parsing your query :)');
}
