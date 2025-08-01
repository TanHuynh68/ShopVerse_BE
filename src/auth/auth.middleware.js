const createToken = (req, res, next) => {
    
 const token = jwt.sign(
    {
      data: req,
    },
    "secret",
    { expiresIn: 60 * 60 }
  );
};

module.exports = {createToken}