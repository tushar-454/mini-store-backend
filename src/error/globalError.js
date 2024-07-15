const globalError = (err, _, res) => {
  console.log(err);
  const message = err.message ?? 'Server is Occured';
  const status = err.status ?? 500;
  res.status(status).json({ message });
};

module.exports = globalError;
