// import { PrismaClient, Prisma } from '@prisma/client'
const { PrismaClient } = require('@prisma/client')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient()

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    username: username
                }
            })
            if (!user)
                return done(null, false, { message: 'Incorrect username' });

            const match = await bcrypt.compare(password, user.password);
            if (!match)
                return done(null, false, { message: 'Incorrect password.' });

            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    console.log(username)
    try {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        })
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});

module.exports = passport;
