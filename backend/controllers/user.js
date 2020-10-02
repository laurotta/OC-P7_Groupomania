const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const model = require('../models');
const { Op } = require("sequelize");

/*
Ajout d'un utilisateur
*/
exports.signup = (req, res, next) => {
  let emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/; // au moins une lettre et un chiffre, min. 8 caractères max. 12

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (username === null || email === null || password === null) {
    return res.status(400).json({
      message: 'Veuillez renseigner tous les champs.'
    });
  } else if (username.length >= 50 || username.length <= 2) {
    return res.status(400).json({
      message: 'Votre nom d\'utilisateur doit être composé de 3 à 50 caractères'
    });
  } else if (!emailRegEx.test(email)) {
    return res.status(400).json({
      message: 'Le format d\'email est incorrect'
    });
  } else if (!passwordRegEx.test(password)) {
    return res.status(400).json({
      message: 'Votre mot de passe doit être composé de 8 à 12 caratère et comporter au moins une lettre et un chiffre'
    });
  } else {
    model.User.findOne({
        attributes: ['username','email'],
        where: {
          [Op.or]: [
            { username: username },
            { email: email }
          ]
        }
      })
      .then(userFound => {
        if (!userFound) {
          bcrypt.hash(password, 10)
            .then(hash => {
              model.User.create({
                  username: username,
                  email: email,
                  password: hash
                })
                .then(() => {
                  res.status(201).json({
                    message: 'Vous êtes inscrit. Vous pouvez désormais vous connecter.',
                  })
                })
                .catch(error => res.status(400).json({
                  error
                }));
            })
            .catch(error => res.status(500).json({
              error
            }))
        } else if (userFound.username == username) {
          return res.status(403).json({
            message: 'Ce nom d\'utilisateur est déjà pris !'
          });
        } else if (userFound.email == email) {
          return res.status(403).json({
            message: 'Cette adresse email est déjà utlisée !'
          }); 
        }
      })
      .catch(error => res.status(500).json({
        error
      }));
  }
};

/*
Connexion d'un utilisateur
*/
exports.signin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  if (email == null || password == null) {
    res.status(400).json({
      message: 'Un champ est vide'
    })
  }
  model.User.findOne({
      where: {
        email: email
      }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Cette adresse email est inconnue, vérifiez votre saisie.'
        })
      }
      bcrypt.compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              message: 'Mot de passe incorrect !'
            })
          }
          res.status(200).json({
            userId: user.id,
            username: user.username,
            moderator: user.moderator,
            token: jwt.sign({
                userId: user.id
              },
              'mon_TOKEN_est_SECRET', {
                expiresIn: '24h'
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
        }))
    })
    .catch(error => res.status(500).json({
      error
    }));
};

/*
Récupération des données de l'utilisateur connecté
*/
exports.userData = (req, res, next) => {
  model.User.findOne({
      where: {
        id: res.locals.userId
      }
    })
    .then(user => {
      return res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          moderator: user.moderator
      });
    })
    .catch(error => res.status(500).json({
      error
    }));
};

/*
Suppression d'un utilisateur
*/
exports.unsubscribeUser = (req, res, next) => {
  model.Publication.findAll({
      attributes: ['imageUrl'],
      where: {
        UserId: res.locals.userId
      }
    })
    .then(found => {
      found.forEach((Publication) => {
        if (Publication.imageUrl !== null) {
          const filename = Publication.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, (error) => {
            if (error) throw error;
          });
        }
      })
    })
    .then(() => {
      model.Publication.destroy({
          where: {
            UserId: res.locals.userId
          }
        })
    })
    .then(() => {
      model.User.destroy({
          where: {
            id: res.locals.userId
          }
        })
        .then(() => res.status(200).json({
          message: 'Utilisateur supprimé !'
        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
};