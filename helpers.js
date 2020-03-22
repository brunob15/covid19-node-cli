const DEFAULT_STATUSES = ['confirmed', 'deaths', 'recovered'];

exports.buildStatuses = program => {
    let statuses;
    if (program.deaths) {
        return ['deaths'];
    } else if (program.recovered) {
        return ['recovered'];
    } else if (program.confirmed) {
        return ['confirmed'];
    } else {
        return DEFAULT_STATUSES;
    }
};

const printStatus = result => {
    if (result && !result.error) {
        const { status, cases } = result;
        console.log(`${status}: ${cases}`);
    } else if (result.error) {
        console.log(result.error);
    }
};

const printLastUpdate = results => {
    const validResult = results.find(result => !result.error);
    if (validResult) {
        console.log('Last update:', validResult.lastUpdate);
    }
}

const printDeathPercentage = results => {
    let deaths = results.find(result => result.status === 'deaths');
    let confirmed = results.find(result => result.status === 'confirmed');
    deaths = deaths ? parseInt(deaths.cases) : 0;
    confirmed = confirmed ? parseInt(confirmed.cases) : 0

    if (deaths > 0 && confirmed > 0) {
        const deathPercentage = deaths / confirmed * 100;
        console.log('death percentage:', Math.round((deathPercentage + Number.EPSILON) * 100) / 100, '%');
    }
};

exports.printResults = (results) => {
    console.log('');
    results.forEach(printStatus);
    printDeathPercentage(results);
    printLastUpdate(results);
};

