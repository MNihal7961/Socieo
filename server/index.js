import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoute from './router/auth.js'
import userRoute from './router/user.js'
import postRoute from './router/post.js'
import { register } from './controller/auth.js'
import { verifyToken } from './middleware/auth.js'




// CONFIGURATION
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
// app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))


// FILESTORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


// ROUTES WITH FILES 
app.post('/auth/register', upload.single("picture"), register)

// ROUTES
app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/posts', postRoute)

//DB SETUP
const PORT = process.env.PORT || 5001
mongoose.connect(process.env.MONOGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`))
}).catch((error) => console.log(error))

