//Import mpdule
const express = require('express')
const db = require('./db')

const app = express();
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

//app.use(module)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true })); // replaces body-parser
app.use(cookieParser())
// Define allowed origins
let allowedOrigins = ['http://localhost:3000', 'https://new-bee.netlify.app', 'http://localhost:3001', 'https://new-bee-admin.netlify.app'];

app.use(cors({
    credentials: true, // add Access-Control-Allow-Credentials to header
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(session({
    secret: "a secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())

app.use(passport.session())


// Routers
const userRouter = require('./routers/userRouter')
const contactRouter = require('./routers/contactRouter')
const infoRouter = require('./routers/infoRouter')
const searchRouter = require('./routers/searchRouter')
const adminRouter = require('./routers/adminRouter')

// Use Routers
require('./config/passport')(passport)
app.use('/', userRouter)
app.use('/dashboard', passport.authenticate('jwt', { session: false }), contactRouter)
app.use('/dashboard', passport.authenticate('jwt', { session: false }), infoRouter)
app.use('/dashboard', passport.authenticate('jwt', { session: false }), searchRouter)
app.use('/admin/', adminRouter)

// Use port 8000 to listen
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

module.exports = app;