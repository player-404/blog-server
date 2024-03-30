import express from 'express';
import {createMenu, deleteMenu} from '../controllers/menuController'

const router = express.Router();

router.route('/').post(createMenu)

router.route('/:id').delete(deleteMenu)


export default router
