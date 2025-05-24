const sendErrorResponse = (error, res) => {
  console.log(error);
  // console.log(error.details[0].path);
  // console.log(error.details[0].context);

  res.status(400).send({ message: "xatolik", error: error });
};

module.exports = {
  sendErrorResponse,
};
