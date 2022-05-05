const { SequelizeScopeError } = require('sequelize');

require('dotenv').config()

if (process.argv.slice(2).includes('models')) {
    if (!process.env.DATABASE_URL)
        process.exit(1)
    const SequelizeAuto = require('sequelize-auto');
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize(process.env.DATABASE_URL);
    const options = {
        directory: './models',
        caseModel: 'c',
        caseProp: 'c',
        caseFile: 'c',
        lang: 'es6'
    }
    const auto = new SequelizeAuto(sequelize, null, null, options)
    auto.run().then(data => {
        process.exit(0)
    })
} else if (process.argv.slice(2).includes('sync')) {
    const database = require('./database/db')
    for (let model of Object.values(database.models)) {
        model.sync({force: true})
    }
} else {
    const express = require('express')
    const morgan = require('morgan')

    const app = express()
    
    app.use('/api/v1/users', require('./routers/userRouter'))
    app.use('/api/v1/products', require('./routers/barcodeRouter'))

    app.use('*', (err, req, res, next) => {
        if (req.originalUrl.startsWith('/api'))
            return res.status(418).json({ success: false, message: err.message })
        res.status(418).render("error", { statuscode: 418, image: "/resources/images/error.png", err: err })
    })

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`App listening on ${port}.`)
    })
}