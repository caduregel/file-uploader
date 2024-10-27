const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const get_new_folder = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.redirect('/log-in')
    } else {
        res.render("new_folder", {})
    }
})

const post_new_folder = asyncHandler(async (req, res, next) => {
    const folder = await prisma.Folder.create({
        data: {
            title: req.body.name,
            userUsername: req.user.username
        },
    })

    res.redirect("/")
})

module.exports = { get_new_folder, post_new_folder }