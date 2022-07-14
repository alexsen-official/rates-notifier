const scheduler = require('@google-cloud/scheduler'),
      client = new scheduler.CloudSchedulerClient();

class Scheduler {
    createJob = async (url, schedule, options) => {
        const request = {
            parent: client.locationPath(process.env.PROJECT_ID, process.env.LOCATION_ID),
            job: {
                appEngineHttpTarget: {
                    appEngineRouting: {
                        service: process.env.SERVICE_ID
                    },
                    relativeUri: url,
                    httpMethod: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: Buffer.from(JSON.stringify({ schedule, ...options }), 'utf-8')
                },
                schedule: `${ schedule.getUTCMinutes() } ${ schedule.getUTCHours() } ${ schedule.getUTCDate() } ${ schedule.getUTCMonth() + 1 } *`,
                timeZone: 'Etc/UTC'
            }
        };
        
        const [response] = await client.createJob(request);
        console.log(`[server]: successfully created job ${ response.name }!`);
        
        return response.name;
    }
    
    deleteJob = async (name) => {
        await client.deleteJob({ name });
        console.log(`[server]: successfully deleted job ${ name }!`);
    }
}

module.exports = new Scheduler();
