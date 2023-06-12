const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Sequelize = require('../db');
const initModels = require('../models/init-models')
const models = initModels(Sequelize)
const User = models.Users
const Basket = models.Basket
const ApiError = require("../error/ApiError")
const { BadRequest } = require('../error/ApiError');
const { message } = require('statuses');

const generateJwt = (ID, Email, Role) => {
  return jwt.sign(
    { ID, Email, Role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )

}

class UserController {
  async registration(req, res, next) {
    const { Email, Password, Role, Name, Surname, Address, Phone } = req.body;
    if (!Email && !Password) {
      return next(ApiError, BadRequest('Некорректный email или пароль!'))
    }
    const candidate = await User.findOne({ where: { Email } })
    if (candidate) {
      return next(ApiError.BadRequest('Пользователь с таким email уже существует!'))
    }
    const hashPassword = await bcrypt.hash(Password, 5)
    const user = await User.create({ Name, Surname, Address, Phone, Email, Role, Password: hashPassword })
    const token = generateJwt(user.ID, user.Email, user.Role)
    console.log(token)
    return res.json({ token });


  }

  async login(req, res, next) {
    const { Email, Password } = req.body
    const user = await User.findOne({ where: { Email } })
    if(!user){
      return next(ApiError.BadRequest('Пользователь не найден!'))
    }
    let comparePassword = bcrypt.compareSync(Password, user.Password)
    if(!comparePassword){
      return next(ApiError.BadRequest('Указан неверный пароль!'))
    }
     const token = generateJwt(user.ID, user.Email, user.Role)
     return res.json({token})

  }

  async check(req, res, next) {
    const token=generateJwt(req.user.ID, req.user.Email, req.user.Role)
    return res.json({token})
    
  }


}
module.exports = new UserController()