import jwt from "jsonwebtoken";

export const googleCallback = async (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const frontendURL = process.env.FRONTEND_URL;

  res.redirect(
    `${frontendURL}/login/success?token=${token}`
  );
};
