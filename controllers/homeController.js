const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const get_home = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.redirect('/log-in')
    }
    const folders = await prisma.Folder.findMany({
        where: {
            userUsername: req.user.username,
        },
    })

    res.render("home", { user: req.user, folders: folders })
    
})

module.exports = { get_home }