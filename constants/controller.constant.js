
const returnResponse = (message, data, res, status_code) => {
  return res.status(status_code).json({
    message: message,
    status_code: status_code,
    totalItems: data?.length,
    ...(status_code != 200 && status_code != 201
      ? { error: data?.message ?? data }
      : { data: data }),
  });
};

const returnResponseQuery = (message, data, res, status_code, currentPage, totalPages, limit, totalItems) => {
  return res.status(status_code).json({
    message: message,
    status_code: status_code,
    totalItems: totalItems,
    currentPage: currentPage,
    totalPages: totalPages,
    size: limit,
    ...(status_code != 200 && status_code != 201
      ? { error: data.message }
      : { data: data }),
  });
};

module.exports = {returnResponseQuery, returnResponse};
