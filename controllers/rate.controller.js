const axios = require('axios');
const xml = require('xml2json');

class RateController {
    async get(req, res) {
        try {
            const url = `${ process.env.API_URL }&page=${ req.params.page }`;
            const response = await axios.get(url);

            const entry = await xml.toJson(
                response.data, {
                    object: true,
                    coerce: true
                })['feed']['entry'];
            
            const result = [];
            
            for (let i = 0; i < entry.length; i++) {
                const data = entry.at(i).content['m:properties'];
                const item = { };
    
                for (const key in data)
                    item[key.split('_').pop()] = data[key]['$t'];
                
                result.push(item);
            }
            
            res.json(result.reverse());
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new RateController();
