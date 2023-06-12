const Router = require('express')
const router = new Router()
const productCategoriesController = require('../controllers/productCategoriesControllers.js')
const checkRole = require('../middleware/checkRoleModdleWare.js')

router.post('/type', checkRole(true), productCategoriesController.create)
router.get('/categories', productCategoriesController.getAll)
router.get('/one', productCategoriesController.getOne)
router.delete('/categories', checkRole(true), productCategoriesController.del)
router.put('/', checkRole(true), productCategoriesController.update)

module.exports = router