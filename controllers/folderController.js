const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Get request for new folder form  
const get_new_folder = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.redirect('/log-in')
    } else {
        res.render("new_folder", {})
    }
})

// Creating a new folder
const post_new_folder = asyncHandler(async (req, res, next) => {
    const folder = await prisma.Folder.create({
        data: {
            title: req.body.name,
            userUsername: req.user.username
        },
    })

    res.redirect("/")
})

// Getting a single folder
const get_folder = asyncHandler(async (req, res, next) => {
    const folder = await prisma.Folder.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (req.user.username !== folder.userUsername) { res.redirect("/") }
    res.render("folder", { folder: folder })
})

// Get request for editing folders
const get_edit_folder = asyncHandler(async (req, res) => {
    const folder = await prisma.Folder.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (req.user.username !== folder.userUsername) { res.redirect("/") }
    res.render("edit_folder", { folder: folder })
})

// Post request for editing a folder
const post_edit_folder = asyncHandler(async (req, res) => {
    // If the user has selected they want to delete the folder, jsut delete it
    if (req.body.delete === "on") {
        const deletFolder = await prisma.Folder.deleteMany({
            where: {
                id: parseInt(req.params.id),
            },
        })
        res.redirect('/')

    } else{ // Update the title instead
        const updateUser = await prisma.Folder.update({
            where: {
                id:  parseInt(req.params.id),
            },
            data: {
                title: req.body.title,
            },
        })
        res.redirect('/folders/'+req.params.id)
    }

})


module.exports = { get_new_folder, post_new_folder, get_folder, get_edit_folder, post_edit_folder }