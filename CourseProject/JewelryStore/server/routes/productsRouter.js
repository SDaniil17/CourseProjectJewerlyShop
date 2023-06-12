const Router = require('express')
const router = new Router()
const productsController = require('../controllers/productsControllers')
const CheckRole = require('../middleware/checkRoleModdleWare')
const Error = require('../middleware/ErrorHandlingMiddleware')

router.post('/product',Error,productsController.create)  //вопрос
router.get('/productdel',productsController.getAllDelete)
router.get('/:Article',productsController.getOne)
router.get('/',productsController.getAll)
router.put('/upd',CheckRole(true),productsController.UpdProducts)
router.delete('/product',CheckRole(true),productsController.del)


module.exports = router