const express = require('express')
const router = express.Router();
const { getAllUser,getSingleUser
,deleteUser} = require('../Controllers/admin')
const { isAuth,isAdmin } = require('../middlewares/verifyToken');

router
  .route("/users")
  .get(isAdmin, getAllUser);

router.get('/users/delete/:id', isAdmin, deleteUser);

module.exports = router;