import session from 'express-session'
import MongoStore from 'connect-mongo'
import { config } from './config.js'

export const sessionConfig = session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: config.mongodbUri,
    touchAfter: 24 * 3600, // lazy session update (in seconds)
  }),
  cookie: {
    secure: config.nodeEnv === 'production', // require HTTPS in production
    httpOnly: true, // prevent client-side JS from accessing the cookie
    maxAge: config.sessionMaxAge, // 7 days
    sameSite: 'strict', // CSRF protection
  },
  name: 'resumind.sid', // custom session cookie name
})

export default sessionConfig
