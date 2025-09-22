const returnResponse = (message, data, res, statusCode) => {
  return res.status(statusCode).json({
    message: message,
    status_code: statusCode,
    totalItems: data?.length,
    data: data,
  });
};

module.exports = returnResponse;
