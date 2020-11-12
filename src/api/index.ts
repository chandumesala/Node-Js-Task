import * as Express from "express";
import gifAPIRoutes from './gif';

const router: Express.Router = Express.Router();
router.use(gifAPIRoutes);

export default router;
