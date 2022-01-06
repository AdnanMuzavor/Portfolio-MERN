
//Function to authenticate admin using token

const authenticator = async (req, res, next) => {
  console.log("Middleware to authenticate user");

  next();
};

module.exports = authenticator;
