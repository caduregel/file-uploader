const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Get request for new folder form  
const get_new_file = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.redirect('/log-in')
    } else {
        res.render("new_file", { id: req.params.id, message: "" })
    }
})

// Creating a new folder
const post_new_file = asyncHandler(async (req, res, next) => {
    console.log(req.file)
    console.log(req.params.id)
    if (req.file.size > 2) {
        res.render(`new_file`, { message: "File is to large, upload a smaller file", id: req.params.id })
    } else {
        // const { data, error }
        console.log(data)
    }
    // const file = await prisma.Folder.create({
    //     data: {
    //         title: req.body.name,
    //         userUsername: req.user.username
    //     },
    // })

})

// Getting a single file
const get_file = asyncHandler(async (req, res, next) => {
    const folder = await prisma.Folder.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (req.user.username !== folder.userUsername) { res.redirect("/") }
    res.render("folder", { folder: folder })
})

module.exports = { get_new_file, post_new_file, get_file }