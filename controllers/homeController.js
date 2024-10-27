const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");

const get_home = asyncHandler(async (req, res) => {
    if(!req.user){
        res.redirect('/log-in')
    } else{
        res.render("home", {})
    }
})

module.exports = {get_home}