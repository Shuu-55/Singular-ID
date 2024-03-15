import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import register from '../models/schema.js';

const app = express()
const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.json())

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/Login.html'))                    //Login
})

router.get('/signup', (req, res) => {                                                     //Signup page
    res.sendFile(path.join(__dirname, '../../../frontend/Signup.html'))                  
})

router.post('/register_user', async (req, res) => {                                   //fetch of signup page
    const userData = req.body
    console.log(userData)
    const verifyemail = userData.email

    const existing_user = await register.findOne({ email: verifyemail })

    if (existing_user) {
        console.log('email already exists')
        res.status(400).send("Email already exists, Signin")
        return
    }

    const newuserdata = new register({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    await newuserdata.save().then(() => console.log('User registered')).catch(() => console.log("error registering"))

    res.status(200).send('Data received and user registered')
})



export default router
