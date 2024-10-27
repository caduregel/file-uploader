const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const get_sign_up = asyncHandler(async (req, res) => {
    res.render("sign_up", {})
})

const post_sign_up = asyncHandler(async (req, res, next) => {
    const user = await prisma.users.findUnique({
        where: {
            username: req.body.username
        }
    })
    if (user) {
        res.send("<a href='/sign-up'>username already exists, try again</a>")
    } else {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                console.log(err)
            }
            else {
                const user = await prisma.users.create({
                    data: {
                        username: req.body.username,
                        password: hashedPassword,
                    },
                })
            }
        });
    }
    res.redirect("/")
})

const get_log_in = asyncHandler(async (req, res) => {
    res.render("log_in", {})

})

module.exports = { post_sign_up, get_sign_up, get_log_in };