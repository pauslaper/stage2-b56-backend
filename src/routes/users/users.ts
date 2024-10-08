import express from "express";
import authController from "../../contollers/auth-controller";
import followController from "../../contollers/follow-controller";
import replyController from "../../contollers/reply-controller";
import threadController from "../../contollers/thread-controller";
import userController from "../../contollers/user-controller";
import { authentication } from "../../middlewares/authentication";
import { authorize } from "../../middlewares/authorization";
import { upload } from "../../middlewares/upload/multer-cloudinary";
import { uploadFile } from "../../middlewares/upload/upload-file";
import suggestionController from "../../contollers/suggestion-controller";

export const routerV1 = express.Router();


routerV1.get("/users", userController.find)
routerV1.get("/users/:id", userController.findById)
routerV1.get("/users/email/:email", userController.findByEmail)
routerV1.post("/users",userController.create)
routerV1.patch("/users",userController.update)
routerV1.delete("/users/:id", userController.delete)

routerV1.post("/auth/login", authController.login)
routerV1.post("/auth/register", authController.register)
routerV1.get("/auth/check",authentication, authController.check)

routerV1.get("/dashboard", authentication, authorize("ADMIN"), (req, res) => {
    res.json({ message: "Hello from dashboard!" });
  });
  
routerV1.get("/google", authController.googleOAuth)
routerV1.get("/google/callback", authController.googleOAuthCallback)

routerV1.get("/thread", threadController.find)
routerV1.get("/thread/:id", threadController.findById)
routerV1.post("/thread", threadController.create)
routerV1.patch("/thread/:id", threadController.update)
routerV1.delete("/thread/:id", threadController.delete)

routerV1.get("/follow", followController.findFollow)
routerV1.post("/follow", followController.postFollow)

routerV1.get("/suggestion/:userId", suggestionController.getSuggestions)


routerV1.get("/replies", replyController.findReply)
routerV1.post("/replies", replyController.createReply)

