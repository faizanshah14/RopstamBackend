
const jwt = require('jsonwebtoken');
const config = require('../config');
const models = require('../models/index');
const reduceErrorMessage = require('../utils/reduceErrorMessage');


exports.refreshSession = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || refreshToken === '') {
    return res.status(400).send({ result: 'error', message: 'refresh token is empty' });
  }
  try {
    const { secret } = config.app;
    const payload = await jwt.verify(refreshToken, secret);
    const userQuery = { where: { id: payload.id } };
    const user = await models.user.findOne(userQuery);
    if (!user) { throw new Error('Not found user with your refresh token'); }
    if (!user || user.id === '') {
      return res.status(400).send({
        result: 'error',
        message: 'Not found user with your refresh token'
      });
    }
    const accessToken = jwt.sign({ id: payload.id, email: payload.email }, secret, {
      expiresIn: 60 * 30 // expires in 30 min
    });
    const newRefreshToken = jwt.sign({ id: payload.id, email: payload.email }, secret, {
      expiresIn: '30d' // expires in 30 days
    });
    user.update({
      access_token: accessToken,
      refresh_token: newRefreshToken
    })
    .then(() => {
      const userData = {
        access_token: accessToken,
        refresh_token: newRefreshToken
      };
      return res.status(200).json({ result: 'ok', data: userData });
    })
    .catch(err => {
      console.log('Error while update access token for login', err);
      return res.status(400).json({ result: 'ok', message: 'Error in login' });
    });
  } catch (error) {
    console.log('Error in refresh token');
    return res.status(403).send({ result: 'error', message: reduceErrorMessage(error) });
  }
};

