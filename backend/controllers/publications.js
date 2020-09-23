const model = require('../models');
const fs = require('fs');

exports.addPublication = (req, res, next) => {

  model.Publication.create({
      content: req.body.content,
      UserId: req.body.userId,
      imageUrl: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
    })
    .then(post => res.status(201).json({
      post
    }))
    .catch(error => res.status(400).json({
      error
    }))
};

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

exports.destroyPublication = (req, res, next) => {

  model.Publication.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((publication) => {
      if (publication.imageUrl) {
        const filename = publication.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error; })
        }
        model.Publication.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(res.status(200).json({
            message: "Publication supprimée !"
          }))
          .catch(error => res.status(500).json({
            error,
            message: "Suppression impossible"
          }));
        })
    .catch(error => res.status(500).json({
      error,
      message: "Message inexistant"
    }));
};

/*exports.modifyPublication = (req, res, next) => {
  
      models.Publication.update({
              content: req.body.content,
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.attachment}`
          }, {
              where: {
                  id: req.params.id
              }
          })
          .then(res.status(200).json({
              message: "Publication modifiée !"
          }))
          .catch(res.status(500).json({
              message: "Modification impossible."
          }));
          
}*/