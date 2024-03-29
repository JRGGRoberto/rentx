import { Router } from 'express';

import { userRoutes } from './users.routes'
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { authenticateRoutes } from './authenticate.routes';


const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/user", userRoutes);
router.use("/cars", carsRoutes)
router.use(authenticateRoutes);

export { router }