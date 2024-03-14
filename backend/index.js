import express from 'express'
import router from './src/routes/router.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { connectToDb } from './src/db/connect.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../frontend')))

app.use('/', router)


app.listen(4000, () => {
    connectToDb()
    console.log('Server running at 4000')
})