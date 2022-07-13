const { User } = require('../models');

const axios = require('axios'),
      xml = require('xml2json'),
      scheduler = require('../scheduler');

class RateController {
    getByUrl = async (url) => {
        try {
            const response = await axios.get(url);
            
            const entry = await xml.toJson(
                response.data, {
                    object: true,
                    coerce: true
                }).feed.entry;
            
            const data = [];
            
            for (let i = entry.length - 1; i >= 0; i--) {
                const properties = entry[i].content['m:properties'],
                      item = {};
                
                for (const key of Object.keys(properties).slice(1, -1))
                    item[key.split('_').pop()] = properties[key]['$t'];
                
                data.push(item);
            }
            
            return { status: 200, data };
        }
        catch (err) {
            return { status: 500, data: err.message };
        }
    }
    
    getByPage = async (req, res) => {
        const result = await this.getByUrl
        (`${ process.env.API_URL }&field_tdr_date_value=all&page=${ req.params.page }`);
        
        res.status(result.status).json(result.data);
    }
    
    getByYear = async (req, res) =>  {
        const result = await this.getByUrl
        (`${ process.env.API_URL }&field_tdr_date_value=${ req.params.year }`);
        
        res.status(result.status).json(result.data);
    }
    
    getByDate = async (req, res) => {
        const result = await this.getByUrl
        (`${ process.env.API_URL }&field_tdr_date_value_month=${ req.params.date }`);
        
        res.status(result.status).json(result.data);
    }
    
    mailout = async (req, res) => {
        try {
            const result = await this.getByUrl
            (`${ process.env.API_URL }&field_tdr_date_value=${ new Date().getFullYear() }`);
        
            const users = await User
                .find()
                .populate('subscriptions');
    
            const today = new Date(),
                  rate = result.data[0];
        
            for (const user of users) {
                for (const sub of user.subscriptions) {
                    if (rate[sub.fRate] > rate[sub.sRate]) {
                        today.setHours(sub.notifyAt.getHours(), sub.notifyAt.getMinutes());
                        
                        await scheduler.createJob('/email/send', today, {
                            recipient: user.email,
                            fRate: sub.fRate,
                            sRate: sub.sRate
                        });
                    }
                }
            }
        
            res.json();
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
}

module.exports = new RateController();
