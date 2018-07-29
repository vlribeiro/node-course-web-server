const express = require(`express`)
const hbs = require(`hbs`)
const fs = require(`fs`)

const app = express()

hbs.registerPartials(`${__dirname}/views/partials/`)
app.set(`views`, `./views`)
app.set(`view engine`, `hbs`)

app.use((req, res, next) => {
    const now = new Date().toString()

    const log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile(`server.log`, `${log}\n`, e => e ? console.log(`Unable to append to server.log`) : null)

    next()
})

app.use((req, res, next) => res.render(`maintenance.hbs`))
app.use(express.static(`${__dirname}/public`))

hbs.registerHelper(`getCurrentYear`, () => new Date().getFullYear())
hbs.registerHelper(`screamIt`, (text) => text.toUpperCase())

app.get(`/`, (req, res) => {
    res.render(`home.hbs`, {
        pageTitle: `Home`,
        welcomeMessage: `Welcome to my page!`
    })
})

app.get(`/about`, (req, res) => {
    res.render(`about.hbs`, {
        pageTitle: `About`
    })
})

app.get(`/bad`, (req, res) => {
    res.send({
        errorMessage: `Ooops! Error`
    })
})

app.listen(3000, () => console.log(`Listening on port 3000`))