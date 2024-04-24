import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import register from '../models/schema.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import session from 'express-session';

dotenv.config();

const app = express()
const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.json())

app.use(session({
    secret: 'your-secret-key', // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: true
}));

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' }); // Update error message
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token' });
        }

        req.user = decoded;
        next();
    });
};



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/index.html'))                    //Main
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/Login.html'))                    //Login
})

router.get('/signup', (req, res) => {                                                     //Signup page
    res.sendFile(path.join(__dirname, '../../../frontend/Signup.html'))                  
})

router.get('/main',async(req,res)=>{                                                      //main page
    res.sendFile(path.join(__dirname, '../../../frontend/user_index.html'))
})

router.get('/review', async(req,res)=>{
    res.sendFile(path.join(__dirname, "../../../frontend/Reviewer.html"))
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
        password: userData.password,
        uniqueId:userData.uniqueId
    })

    await newuserdata.save().then(() => console.log('User registered')).catch(() => console.log("error registering"))

    res.status(200).send('Data received and user registered')
})

router.post('/confirm_login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await register.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Wrong email or password' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Wrong email or password' });
        }

        const uniqueId = user.uniqueId; 

        // req.session.email = user.email;
        // req.session.name = user.name;
        // req.session.uniqueId = uniqueId;

        
        return res.status(200).json({ uniqueId });

    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.post("/logout", verifyToken, async(req,res)=>{
//     // Get the user's email from the decoded JWT token
//     const userEmail = req.user.email;

//     // Remove the token from the server-side storage (e.g., a database)
//     await register.updateOne({ email: userEmail }, { $unset: { token: 1 } });

//     // Respond with a success message
//     res.status(200).json("Logged Out");
// })

// Function to generate a new unique ID (hash) incorporating user email
function generateNewUniqueId(email) {
    const combinedString = email + Math.random().toString(36).substr(2);
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
        hash = (hash << 5) - hash + combinedString.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    // Convert hash to a positive hexadecimal string
    const uniqueId = (hash >>> 0).toString(16);
    return uniqueId;
}

// Route to handle unique ID change
router.post('/change_unique_id', async (req, res) => {
    const userId = req.session.uniqueId;
    const userEmail = req.session.email;

    try {
        const newUniqueId = generateNewUniqueId(userEmail);

        const user = await register.findByIdAndUpdate(userId, { uniqueId: newUniqueId }, { new: true });

        if (!user) {
            console.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        req.session.uniqueId = newUniqueId;

        return res.status(200).json({ message: 'Unique ID changed successfully', newUniqueId });

    } catch (error) {
        console.error('Error updating unique ID:', error);
        return res.status(500).json({ error: 'Failed to change unique ID' });
    }
});

async function updateUniqueId(userId, newUniqueId) {
    try {
        // Assuming you have a model named 'User' and 'userId' is the user's database ID
        const user = await register.findById(userId);
        if (!user) {
            console.error('User not found');
            return false;
        }

        user.uniqueId = newUniqueId;
        await user.save();
        return true;
    } catch (error) {
        console.error('Error updating unique ID:', error);
        return false;
    }
}


export default router
