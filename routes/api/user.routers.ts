import { Router } from "express";
import { validateUserRegister } from "../../validators/user.validators";
import { createUser } from "../../controllers/auth.controlers";



const userRoutes = Router()


userRoutes.post("/register", validateUserRegister, createUser);



export default userRoutes