const returnResponse = (message, data, res, statusCode) => {
  return res.status(statusCode).json({
    message: message,
    status_code: statusCode,
    totalItems: data?.length,
    ...(statusCode != 200 && statusCode != 201
      ? { error: data }
      : { data: data }),
  });
};

const returnResponseQuery = (message, data, res, statusCode, currentPage, totalPages, limit, totalItems) => {
  return res.status(statusCode).json({
    message: message,
    status_code: statusCode,
    totalItems: totalItems,
    currentPage: currentPage,
    totalPages: totalPages,
    size: limit,
    ...(statusCode != 200 && statusCode != 201
      ? { error: data }
      : { data: data }),
  });
};

module.exports = {returnResponseQuery, returnResponse};
