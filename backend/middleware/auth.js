const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'mon_TOKEN_est_SECRET');
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Nom d\'utilisateur inconnu !';
    } else {
      res.locals.userId = userId;
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: 'Connectez-vous pour accéder à cette page.'
    });
  }
};