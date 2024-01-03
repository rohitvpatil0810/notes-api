exports.handleError = (res, error) => {
  console.error(error.message);
  res.status(500).json({ error: "Internal Server Error" });
};

exports.handleNotFound = (res, data) => {
  if (!data) {
    return res.status(404).json({ error: "Not Found" });
  }
};
