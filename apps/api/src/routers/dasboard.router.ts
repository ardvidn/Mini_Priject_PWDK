import { getAllDataForDashboard } from '@/controllers/dashboard.controller';
import { Router } from 'express';

const dashboardRouter = Router();

dashboardRouter.get('', getAllDataForDashboard);

export default dashboardRouter;
