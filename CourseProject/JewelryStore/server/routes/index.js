const Router = require('express')
const router = new Router()
const ordersRouter = require('./ordersRouter')
const productsRouter = require('./productsRouter')
const productCategoriesRouter = require('./productCategoriesRouter')
const userRouter = require('./userRouter')
const materialProductsRouter = require('./materialProductsRouter')
const sizeRouter = require('./sizeRouter')

router.use('/user',userRouter)
router.use('/orders',ordersRouter)
router.use('/product',productsRouter)
router.use('/categories',productCategoriesRouter)
router.use('/material',materialProductsRouter)
router.use('/size',sizeRouter)


module.exports=router