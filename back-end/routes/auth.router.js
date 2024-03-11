const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {schemaLogin, createUserLoginSchema} = require('./../schemas/login.shema');

const {config} = require('./../config/config');
const validatorHandler = require("../middlewares/validator.handler");
const {User} = require("../db/models/user.model");
const {compare} = require("bcrypt");
const UserService = require("../services/user.service");

const router = express.Router();
const service = new UserService();

router.post('/login', validatorHandler(schemaLogin, 'body'),
  async (req, res, next) => {
    try {
      const user = await User.findOne({email: req.body.email});
      if (!user) {
        return res.status(401).json({error: 'Credenciales incorrectas'});
      }

      const validPassword = await compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).json({error: 'Credenciales incorrectas'});
      }

      // Crear claims del token
      const tokenClaims = {
        id: user.id,
        email: user.email,
        role: user.role
      };

      // Crear token con claims
      const token = jwt.sign(tokenClaims, process.env.JWT_SECRET, {expiresIn: '1h'});

      res.header('auth-token', token).json({
        data: {token}
      });
    } catch (error) {
      next(error);
    }
  });

router.post('/register',
  validatorHandler(createUserLoginSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create({
        ...body,
        role: 'external_client'
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', (req, res) => {
  try {
    res.status(200).json({message: 'Sesión cerrada exitosamente'});
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({error: 'Error al cerrar sesión'});
  }
});

module.exports = router;
