var pgsql = require('../lib/pgsql')
var utils = require('../common/utils')
var { transferTokens }= require('./transferTokens');
module.exports = (app, console) => {
        app.post('/transferTokens',async (req, res) => {
        result = await transferTokens(req);
        utils.handleresultdict(res,result)
        }
    )

};
