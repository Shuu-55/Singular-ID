import express from 'express'
import router from './src/routes/router.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { connectToDb } from './src/db/connect.js'
import session from 'express-session'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const preventBrowserCaching = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};

const app = express()

app.use(preventBrowserCaching);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../frontend')))

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use('/', router)


app.listen(4000, () => {
    connectToDb()
    console.log('Server running at 4000')
})