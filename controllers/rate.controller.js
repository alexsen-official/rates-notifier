const axios = require('axios');
const xml = require('xml2json');

class RateController {
    getByUrl = async (url) =>  {
        try {
            const response = await axios.get(url);
            
            const entry = await xml.toJson(
                response.data, {
                    object: true,
                    coerce: true
                }).feed.entry;
            
            const data = [];
            
            for (let i = entry.length - 1; i >= 0; i--) {
                const properties = entry[i].content['m:properties'];
                const item = {};
                
                for (const key of Object.keys(properties).slice(1, -1))
                    item[key.split('_').pop()] = properties[key]['$t'];
                
                data.push(item);
            }
            
            return { status: 200, data };
        }
        catch (err) {
            return { status: 500, data: err };
        }
    }
    
    getByPage = async (req, res) => {
        const url = `${ process.env.API_URL }&field_tdr_date_value=all&page=${ req.params.page }`;
        const result = await this.getByUrl(url);
        
        res.status(result.status).json(result.data);
    }
    
    getByYear = async (req, res) =>  {
        const url = `${ process.env.API_URL }&field_tdr_date_value=${ req.params.year }`;
        const result = await this.getByUrl(url);
    
        res.status(result.status).json(result.data);
    }
    
    getByDate = async (req, res) => {
        const url = `${ process.env.API_URL }&field_tdr_date_value_month=${ req.params.date }`;
        const result = await this.getByUrl(url);
    
        res.status(result.status).json(result.data);
    }
}

module.exports = new RateController();
