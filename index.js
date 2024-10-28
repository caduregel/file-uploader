const path = require("node:path");
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const indexRouter = require('./routes/indexRouter');
const express = require('express');
const passport = require("./config/passport.config")


const app = express();
app.set("views", path.join(__dirname, "views"));app.set("view engine", "ejs");

app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'super cute cats',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)

// Tell app to listen on PORT
const PORT = 3000 ;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));