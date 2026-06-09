import express, { json } from 'express'
import logError from './middlewares/error/log-error'
import config from 'config'
import respondError from './middlewares/error/error-responder'
import notFound from './middlewares/not-found'
import cors from 'cors'
import sequelize from './db/sequelize'
import devGroupsRouter from './routers/devGroups'
import meetRouter from './routers/meet'


(async () => {
    const port = config.get<number>('app.port')
    const name = config.get<string>('app.name')


    const app = express()

    // middlewares
    app.use('/', cors())
    app.use('/', json())
    app.use('/devGroups',devGroupsRouter)
    app.use('/meets',meetRouter)

    // load routers here...

    // not found
    app.use('/', notFound)

    // error middlewares
    app.use('/', logError)
    app.use('/', respondError)

    await sequelize.sync({force: !!config.get('app.sync.force')})

    // starting the server
    app.listen(port, () => console.log(`app ${name} started on port ${port}....`))
})()
