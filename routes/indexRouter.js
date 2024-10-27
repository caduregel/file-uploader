const { Router } = require("express");
const { get_log_in, get_sign_up, post_sign_up } = require("../controllers/authController");
const {get_home} = require("../controllers/homeController");
const passport = require("../config/passport.config")

const indexRouter = new Router

indexRouter.get('/', get_home)

indexRouter.get('/log-in', get_log_in)
indexRouter.get('/sign-up', get_sign_up)
indexRouter.post('/log-in', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-up"
}))
indexRouter.post('/sign-up', post_sign_up)
indexRouter.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

module.exports = indexRouter 