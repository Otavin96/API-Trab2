import { Router } from 'express'
import { createCategoryController } from '@/categories/infrastructure/http/controllers/create-category.controller'


const categoriesRouter = Router()

categoriesRouter.post('/', async (req, res) => {
   await createCategoryController(req, res)
})




export { categoriesRouter }