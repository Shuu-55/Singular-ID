import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import register from '../models/schema.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.json())

const verifyToken=(req,res,next)=>{                                                    //verify the token
    const authHeader=req.headers.authorization;
    if(!authHeader){
        res.status(401).json({error:'No token Provided'})
    }

    const token=authHeader.split(' ')[1];

    jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
            res.status(403).json({error:'Failed to authenticate token'})
        }

        req.user = decoded;
        next();
    })
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/index.html'))                    //Main
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/Login.html'))                    //Login
})

router.get('/signup', (req, res) => {                                                     //Signup page
    res.sendFile(path.join(__dirname, '../../../frontend/Signup.html'))                  
})

router.post('/main', verifyToken, async(req,res)=>{                                         //main page
    res.sendFile(path.join(__dirname, '../../../frontend/user_index.html'))
})

router.post('/register_user', async (req, res) => {                                   //fetch of signup page
    const userData = req.body
    console.log(userData)
    const verifyemail = userData.email

    const existing_user = await register.findOne({ email: verifyemail })

    if (existing_user) {
        console.log('email already exists')
        res.status(400).send("Email already exists, Signin")
        
        
    }

    const newuserdata = new register({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    await newuserdata.save().then(() => console.log('User registered')).catch(() => console.log("error registering"))

    res.status(200).send('Data received and user registered')
})

router.post('/confirm_login', async(req,res)=>{                                            //fetch of singin page
    const userdata=req.body;

    const verify_email=await register.findOne({email:userdata.email});

    if(!verify_email){
        return res.status(401).json('Invalid Email or Password');
    }else{
        if(verify_email.password === userdata.password){

            const token = jwt.sign(
                { email: check_email.email, name: check_email.name },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json("Logged In");
        }
        else{
            return res.status(401).json('Invalid Email or Password');
        }
}
})


export default router
