module.exports = (err, req, res, next) => {
  const status = err.name === 'ValidationError' ? 400 : 500;

  res.status(status).json({
    success: false,
    message: err.message
  });
};