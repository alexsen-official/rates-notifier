const axios = require('axios');
const xml = require('xml2json');

async function getByUrl(url, res) {
    try {
        const response = await axios.get(url);
        
        const entry = await xml.toJson(
            response.data, {
                object: true,
                coerce: true
            }).feed.entry;
        
        const result = [];
        
        for (let i = entry.length - 1; i >= 0; i--) {
            const data = entry[i].content['m:properties'];
            const item = {};
            
            for (const key in data)
                item[key.split('_').pop()] = data[key]['$t'];
            
            result.push(item);
        }
        
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

class RateController {
    async getByPage(req, res) {
        const url = `${ process.env.API_URL }&field_tdr_date_value=all&page=${ req.params.page }`;
        await getByUrl(url, res);
    }
    
    async getByYear(req, res) {
        const url = `${ process.env.API_URL }&field_tdr_date_value=${ req.params.year }`;
        await getByUrl(url, res);
    }
    
    async getByDate(req, res) {
        const url = `${ process.env.API_URL }&field_tdr_date_value_month=${ req.params.date }`;
        await getByUrl(url, res);
    }
}

module.exports = new RateController();
