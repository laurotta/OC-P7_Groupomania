const model = require('../models');
const fs = require('fs');

/*
Ajout d'une publication
*/
exports.addPublication = (req, res, next) => {
  let content = req.body.content;
  if (content.length >= 7) {
  model.Publication.create({
      content: content,
      UserId: res.locals.userId,
      imageUrl: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
    })
    .then(publication => res.status(201).json({
      publication
    }))
    .catch(error => res.status(400).json({
      error
    }));
  } else {
    return res.status(400).json({
      message: 'Un texte d\'au moins 7 caractères est requis.'
    });
  }
};

/*
Récupération de toutes les publications
*/
exports.getAllPublications = (req, res, next) => {
  model.Publication.findAll({
      include: [{
        model: model.User,
        attributes: ['username']
      }],
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(publications => res.status(200).json(publications))
    .catch(error => res.status(400).json({
      error
    }));
};

/*
Suppression d'une publication
*/
exports.destroyPublication = (req, res, next) => {
  model.Publication.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(publication => {
      if (publication.imageUrl) {
        const filename = publication.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        })
      }
      model.Publication.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(() => res.status(200).json({
          message: 'Publication supprimée !'
        }))
        .catch(error => res.status(400).json({
          error,
          message: 'Suppression impossible'
        }));
      })
    .catch(error => res.status(500).json({
      error,
      message: 'Message inexistant'
    }));
};