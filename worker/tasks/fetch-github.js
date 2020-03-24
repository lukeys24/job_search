const { promisify } = require("util");

var fetch = require("node-fetch");
var redis = require('redis')
var client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
// const getAsync = promisify(client.get).bind(client);

const baseURL = `https://jobs.github.com/positions.json`;

async function fetchGithub() {
    let sizeOfPage = 0,
        onPage = 0;
    const allJobs = [];

    // get the jobs
    do {
        try {
            const response = await fetch(`${baseURL}?page=${onPage}`);
            const jobs = await response.json();

            allJobs.push(...jobs);
            sizeOfPage = jobs.length;
            console.log('got ', sizeOfPage, ' jobs')
            onPage++;
        } catch (err) {
            console.error(err.message);
        }
    } while (sizeOfPage != 0);

    console.log('got ', allJobs.length, ' total jobs');
    const success = await setAsync('github', JSON.stringify(allJobs));
    console.log({success})
}

module.exports = fetchGithub;
