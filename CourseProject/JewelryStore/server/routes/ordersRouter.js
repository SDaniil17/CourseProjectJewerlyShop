const Router = require('express')
const router = new Router()
const ordersController = require('../controllers/ordersControllers')
const CheckRole = require('../middleware/checkRoleModdleWare')

router.post('/add',CheckRole(false), ordersController.create)
router.get('/allorders', ordersController.getAllUsers)
router.get('/userorders', ordersController.getOne)
router.delete('/delorder', ordersController.del)

module.exports = router