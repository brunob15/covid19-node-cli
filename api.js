const request = require('request');

exports.fetchStats = (country, status, callback) => {
    const endpoint = `https://api.covid19api.com/live/country/${country}/status/${status}`;
    request(endpoint, function (error, response, body) {
        if (error) {
            callback({
                error: `Could not find ${status}.`
            });
        }

        const results = JSON.parse(body);
        if (results && results.length) {
            const lastStats = results.slice(-1)[0];

            callback({
                cases: lastStats.Cases,
                lastUpdate: lastStats.Date,
                status
            });
        } else {
            callback({
                error: `Could not find ${status}.`
            });
        }
    });
};
