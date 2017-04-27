import express from 'express';

import * as UserController from '../controllers/user';

const router = express.Router();

/* GET users listing. */
router.get('/current-user', UserController.getCurrentUser);

module.exports = router;
