const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for express config (setting the views directory)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Richard Norris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Richard Norris'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'You can pass objects into HBS templates',
        title: 'Help',
        name: 'Richard Norris'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide a location'
        })
    }
    const location = req.query.address
    // I really don't like the object destructuring. the function below would be a lot clearer with 'response' instead of { latitude, longitude, location }
    geocode(location, (error, { latitude, longitude, location } = {}) =>{
        if(error){
            return res.send({ error: error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error: error })
            }
            res.send({
                address: req.query.address, 
                location, 
                forecast: forecastData
            })
        })
    })
})
    

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Richard Norris',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Richard Norris',
        errorMessage: '404 error, page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})