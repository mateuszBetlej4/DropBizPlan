import express from 'express';
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
} from '../controllers/resourceController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Wszystkie trasy chronione autentykacją
router.use(protect);

router.route('/')
  .get(getAllResources)
  .post(createResource);

router.route('/:id')
  .get(getResourceById)
  .put(updateResource)
  .delete(deleteResource);

export default router; 