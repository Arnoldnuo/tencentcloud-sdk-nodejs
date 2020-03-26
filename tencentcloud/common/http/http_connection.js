const axios = require('axios');
const QueryString = require("querystring");

/**
 * @inner
 */
class HttpConnection {
    static doRequest(method, url, data, callback, opt={}) {
        let req = {
            method: method,
            url: url,
        };
        if (method === "GET") {
            req.url += "?" + QueryString.stringify(data);
        } else {
            req.data = data;
        }
        Object.assign(req, opt);

        axios(req).then((response)=>{
            response.statusCode = response.status;
            response.statusMessage = response.statusText;
            callback(null, response, response.data);
        }).catch(function(error){
            callback(error);
        });
        // request(req, function (error, response, body) {
            // /**
            // * callback of `.request`
            // * @callback requestCallback
            // * @param {Error} error Error of the request.
            // * @param {Object} response Response of the request.
            // * @param {String} body Result of the API request.
            // */

            // callback(error, response, body);
        // })
    }
}
module.exports = HttpConnection;
