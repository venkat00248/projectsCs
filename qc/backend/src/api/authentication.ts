/*import { Request, Response, NextFunction, Router } from "express";
import { body } from "express-validator";
import { handleValidationErrors } from "../utils";
// import { NotFoundError } from "@errors";

const router: Router = Router();


// API
router.post(
 "/signup",
 [body("email").exists().isEmail(), body("password").exists()],
 async (req: Request, res: Response, next: NextFunction) => {
  try {
    handleValidationErrors(req);
    // throw new NotFoundError("Sorry, can't find it!", 500, { hello: "world"});
    res.status(200).send({
      success: true,
      body:req.body
    });
  } catch (err) {
   next(err);
  }
 }
);


router.post("/login", async (_: Request, res: Response, next: NextFunction) => {
 try {
  res.status(200).send({
   success: true,
  });
 } catch (err) {
  next(err);
 }
});

router.get("/", async (_: Request, res: Response, next: NextFunction) => {
  try {
   res.status(200).send({
    success: true,
    message: "hello from auth module"
   });
  } catch (err) {
   next(err);
  }
 });

export default router;*/
