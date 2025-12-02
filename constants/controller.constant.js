const returnResponse = (message, data, res, statusCode) => {
  return res.status(statusCode).json({
    message: message,
    status_code: statusCode,
    totalItems: data?.length,
    ...(statusCode != 200 && statusCode != 201
      ? { err: data }
      : { data: data }),
  });
};

module.exports = returnResponse;
