const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hanglebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'HomePage!!!!',
        name: 'Willian Nakau'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT ME PAGE',
        name: 'Willian Nakau'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'HELP ME PAGE',
        title: 'Help',
        name: 'Willian Nakau!'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error }) //using shorthand synthax
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send( {error} ) //using shorthand synthax
            }
            
            res.send({
                forecast: forecastData,
                location, //using shorthand synthax
                address: req.query.address        
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 PAGE',
        name: 'Error Willian Nakau', 
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 PAGE',
        name: 'Willian Nakau',
        errorMessage: 'Page not found'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001.')
})