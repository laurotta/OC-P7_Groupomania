// Importation du module de chiffrement
const bcrypt = require('bcrypt');

// Importation du module de création / vérification de token
const jwt = require('jsonwebtoken');

const fs = require('fs');

// Importation du modèle
const User = require('../models/users');
const Publications = require('../models/publications');

// Règles 
let emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/; // au moins une lettre et un chiffre, min. 8 caractères max. 12

exports.signup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username === null || email === null || password === null) {
        return res.status(400).json({
            message: 'Veuillez renseigner tous les champs.'
        });
    } else if (username.length >= 51 || username.length <= 2) {
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
    }

    User.findOne({
            email: req.params.email
        })
        .then(userExist => {
            if (!userExist) {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        const user = new User({
                            username: username,
                            email: email,
                            password: hash
                        });
                        user.save()
                            .then(() => res.status(201).json({
                                message: 'Utilisateur créé !'
                            }))
                            .catch(error => res.status(400).json({
                                error
                            }));
                    })
                    .catch(error => res.status(500).json({
                        error
                    }))
            } else {
                return res.status(403).json({
                    message: 'L\'utilisateur existe déjà !'
                });
            }
        })
        .catch(error => res.status(500).json({
            message: 'Impossible de créer l\'utilisateur.',
            error
        }));

};

exports.login = (req, res, next) => {
    User.findOne({
            email: req.params.email
        })
        .then(userExist => {
            if (!userExist) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        })
                    }
                    res.status(200).json({
                        userId: user.id,
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
        }))
};

exports.deleteUser = (req, res, next) => {
    User.findOne({
            id: req.params.id
        })
        .then(userExist => {
            if (userExist) {
                Publications.findAll({
                        id: req.params.userid
                    })
                    .then(publications => {
                        for (let i in publications) {
                            const allPublications = publications[i];
                            const filename = allPublications.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {
                                Publications.destroy({
                                        id: allPublications.id
                                    })
                                    .then(() => res.status(200).json({
                                        message: 'Les publications ont été supprimées !'
                                    }))
                                    .catch(error => res.status(400).json({
                                        error
                                    }));
                            });
                        };
                    })
                    .catch(error => res.status(500).json({
                        error: 'Aucune publication trouvée'
                    }));
                userExist.destroy({
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
            } else {
                return res.status(400).json({
                    message: 'L\'utilisateur n\'existe pas'
                });

            }
        })
        .catch(error => res.status(500).json({
            error,
            message: 'Suppression du compte impossible.'
        }));
};