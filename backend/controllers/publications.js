// Importation du modèle
const Publication = require('../models/publications');

// Importation du module "file system" nécessaire pour la fonction deleteSauce
const fs = require('fs');

exports.createPublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.publication);
    const publication = new Publication({
        ...publicationObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    publication.save()
        .then(() => res.status(201).json({
            message: 'Publication enregistrée !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file ? {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    if (req.file) {
        Publication.findOne({
                id: req.params.id
            })
            .then(publication => {
                const filename = publication.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Publication.updateOne({
                            id: req.params.id
                        }, {
                            ...publicationObject,
                            id: req.params.id
                        })
                        .then(() => res.status(200).json({
                            message: 'Image modifiée !'
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }));
                });
            }).catch(error => res.status(400).json({
                error
            }))
    } else {
        Publication.updateOne({
                id: req.params.id
            }, {
                ...publicationObject,
                id: req.params.id
            })
            .then(() => res.status(200).json({
                message: 'Publication modifiée !'
            }))
            .catch(error => res.status(400).json({
                error
            }));
    };
};

exports.deletePublication = (req, res, next) => {
    Publication.findOne({
            id: req.params.id
        })
        .then(publication => {
            const filename = publication.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Publication.deleteOne({
                        id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Publication supprimée !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            })
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.getAllPublications = (req, res, next) => {
    Publication.find()
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({
            error
        }));
};
