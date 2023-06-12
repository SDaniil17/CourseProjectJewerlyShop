const Router = require('express')
const router = new Router()
const sizeControllers = require('../controllers/sizeControllers')
const checkRole = require('../middleware/checkRoleModdleWare.js')

router.post('/size', checkRole(true), sizeControllers.create)
router.get('/size', sizeControllers.getAll)
router.get('/one', sizeControllers.getSize)
router.delete('/size',checkRole(true), sizeControllers.del)
router.put('/', checkRole(true), sizeControllers.update)

module.exports = router