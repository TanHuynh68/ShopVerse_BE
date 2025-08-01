const returnResponse = (message, data, res, statusCode) => {
 return res.status(statusCode).json({
    message: message,
    data: data
  });
};

module.exports = returnResponse