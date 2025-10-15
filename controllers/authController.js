export const register = async (req, res) => {
  res.json({ success: true, message: "User registered (mock)" });
};

export const login = async (req, res) => {
  res.json({ success: true, message: "User logged in (mock)" });
};

export const googleLogin = async (req, res) => {
  res.json({ success: true, message: "Google login (mock)" });
};

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    return res.json({ success: true, message: "Admin logged in" });
  }
  return res.status(401).json({ success: false, message: "Invalid credentials" });
};
