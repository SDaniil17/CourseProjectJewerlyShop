const Router = require('express')
const router = new Router()
const materialProductsControllers = require('../controllers/materialProductsControllers')
const CheckRole = require('../middleware/checkRoleModdleWare')

router.get('/material', materialProductsControllers.getAll)
router.post('/material', materialProductsControllers.Add)
router.delete('/material',CheckRole(true), materialProductsControllers.del) 


module.exports = router