const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/77b34b0bebbcef7a736cc0341a4e11fe/' + latitude + ',' + longitude + '?lang=pt&units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })    
}

module.exports = forecast