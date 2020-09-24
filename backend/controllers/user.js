const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const model = require('../models');

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
        attributes: ['email'],
        where: {
          email: email
        }
      })
      .then(emailNotFound => {
        if (!emailNotFound) {
          model.User.findOne({
            attributes: ['username'],
            where: {
              username: username
            }
          })
          .then(usernameNotFound => {
            if (!usernameNotFound) {
              bcrypt.hash(password, 10)
                .then(hash => {
                  model.User.create({
                      username: username,
                      email: email,
                      password: hash
                    })
                    .then(newUser => {
                      res.status(201).json({
                        id: newUser.id,
                      })
                    })
                    .catch(error => res.status(400).json({
                      error
                    }));
                })
                .catch(error => res.status(500).json({
                  error
                }))
            } else {
              return res.status(403).json({
                message: 'Ce nom d\'utilisateur est déjà pris !'
              });
            }
          })
        } else {
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
    .then(userExist => {
      if (!userExist) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        })
      }
      bcrypt.compare(password, userExist.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            })
          }
          res.status(200).json({
            userId: userExist.id,
            username: userExist.username,
            moderator: userExist.moderator,
            token: jwt.sign({
                userId: userExist.id
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
    }))
};

exports.unsubscribeUser = (req, res, next) => {

  model.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      model.Publication.findAll({
          where: {
              UserId: req.params.id
            }
          })
          .then(found => {
            for (let i in found) {
              const allPublications = found[i];
              const filename = allPublications.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                model.Publication.destroy({
                    where: {
                      id: allPublications.id
                    }
                  })

              });
            };
          })
          .catch(error => res.status(500).json({
            error,
            message: 'Aucune publication trouvée'
          }));
          model.User.destroy({
              where: {
                id: req.params.id
              }
            })
          .then(() => res.status(200).json({
            message: 'Utilisateur supprimé !'
          }))
          .catch(error => res.status(500).json({
            error
          }));

    })
    .catch(error => res.status(500).json({
      error,
      message: 'Suppression du compte impossible.'
    }));
};