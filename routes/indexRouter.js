const { Router } = require("express");
const { get_log_in, get_sign_up, post_sign_up } = require("../controllers/authController");
const { get_home } = require("../controllers/homeController");
const passport = require("../config/passport.config");
const { get_new_folder, post_new_folder } = require("../controllers/folderController");

const indexRouter = new Router

indexRouter.get('/', get_home)



// Folder uploads
indexRouter.get("/new_folder", get_new_folder)
indexRouter.post("/new_folder", post_new_folder)

// Log In
indexRouter.get('/log-in', get_log_in)
indexRouter.post('/sign-up', post_sign_up)

// Sign up
indexRouter.get('/sign-up', get_sign_up)
indexRouter.post('/log-in', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/sign-up"
}))

// Log out
indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = indexRouter 