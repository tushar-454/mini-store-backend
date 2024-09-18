const createToken = async (req, res, next) => {
  try {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|live\.com)$/;
    const { email } = req.body;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    return res
      .status(201)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteToken = async (_req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      })
      .json({ status: 200 });
  } catch (error) {
    next(error);
  }
  return null;
};

export { createToken, deleteToken };
