import { Router, request, response } from "express";
import { userManager } from "../dao/mongo-manager/users.manager.js";
import passport from "passport";

const router = Router();
const managerUser = new userManager()

router.get("/registro", async (request, response) => {
  response.render("registro");
});

router.post("/registro", async (request, response) => {
    await managerUser.registerUser(request, response)
});

router.get("/login", async (request, response) => {
    response.render("login")
});

router.get('/github', passport.authenticate('github', 
{scope: ['user:email']}), async(request, response)=>{});

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:"/login"}),async(request, response)=>{
    request.session.user= request.user;
    response.redirect('/api/sessions/view');
})

router.post("/login", async (request, response) => {
    await managerUser.loginSession(request, response)
});


router.post("/logout", async (request, response) => {
    await managerUser.logoutSession(request, response)
});


router.get("/view", async (request, response) => {
    await managerUser.loginHandler(request, response)
  });

export default router;
