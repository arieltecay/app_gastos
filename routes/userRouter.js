const express = require('express');
const userController = require('../controllers/usersCtrl');
const isAuth = require('../middlewares/isAuth');

const userRouter = express.Router();
userRouter.post('/api/v1/users/register', userController.register);
userRouter.post('/api/v1/users/login', userController.login);
userRouter.get('/api/v1/users/profile', isAuth, userController.profile);
userRouter.put('/api/v1/users/change-password', isAuth, userController.changeUserPassword);
userRouter.put('/api/v1/users/update-profile', isAuth, userController.updateProfile);
userRouter.get('/', (req, res) => { });

module.exports = userRouter;
