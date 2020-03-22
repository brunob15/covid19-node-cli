#!/usr/bin/env node
'use strict';

const commander = require('commander');
const api = require('./api');
const helpers = require('./helpers');

const program = new commander.Command();
program.version('0.0.1');

program
    .option('-c, --country <country>', 'country to query')
    .option('--deaths', 'query only deaths')
    .option('--recovered', 'query only recovered')
    .option('--confirmed', 'query only confirmed');

program.parse(process.argv);

if (program.country) {
    const statuses = helpers.buildStatuses(program);
    const results = [];

    statuses.forEach(status => {
        api.fetchStats(program.country, status, res => {
            results.push(res);
            if (results.length === statuses.length) {
                helpers.printResults(results);
            }
        });
    });
    
} else {
    console.log('Error parsing your query :)');
}
