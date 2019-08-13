const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm5vcnJpczk4NCIsImEiOiJjanoyZ3pwazcwNXJiM2NsdGV4aXFoMTR2In0.tsCn_6t4KLWVQwIPOzeCKA&limit=1'

    request({ url: url, json: true }, (error, { body }) => {
        if(error){
            callback('It went tits up. Damn.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find that location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode