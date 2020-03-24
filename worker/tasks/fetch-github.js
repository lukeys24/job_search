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

    // filter alg
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        let isJunior = true;

        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('staff') ||
            jobTitle.includes('principal') ||
            jobTitle.includes('architect') || 
            jobTitle.includes('sdet') ||
            jobTitle.includes('test') || 
            (
                !jobTitle.includes('software') && 
                !jobTitle.includes('engineer') &&
                !jobTitle.includes('developer') && 
                !jobTitle.includes('development') &&
                !jobTitle.includes('junior') &&
                !jobTitle.includes('entry') &&
                !jobTitle.includes('associate')
            )
        ) {
            return false;
        }
        

        return isJunior;
    })

    console.log('got ', allJobs.length, ' total jobs');
    console.log('filtered down to', jrJobs.length, 'total')
    const success = await setAsync('github', JSON.stringify(jrJobs));
    console.log({success})
}

module.exports = fetchGithub;
