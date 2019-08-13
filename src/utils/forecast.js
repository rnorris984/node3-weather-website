const request = require('request')

// request({ url: url, json: true }, (error, response) => {
//     if(error){
//         console.log('It went tits up')
//     }else if (response.body.error) {
//         console.log('Unable to find location')
//     }else{
//         console.log(response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees outside. There is a " + response.body.currently.precipProbability + "% chance of rain.")
//     }
//     // console.log(response.body.timezone)
// })
// response.body

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1907246f940df962c7f74b43a38e140c/' + + encodeURIComponent(latitude) + ',' + + encodeURIComponent(longitude)

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('That is embarassing. Wifi prolly off.', undefined)
        } else if(body.error) {
            callback('Is that even a real place? Do not tink so.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees outside. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast