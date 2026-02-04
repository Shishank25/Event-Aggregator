import jwt from "jsonwebtoken";

export const googleCallback = async (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Redirect to frontend with token
  res.redirect(
    `http://localhost:5173/login/success?token=${token}`
  );
};
