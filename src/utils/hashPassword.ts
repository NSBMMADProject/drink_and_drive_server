// Hash password using Bun's built-in crypto
const hashPassword = async (password: string): Promise<string> => {
  return await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });
};

// Verify password using Bun's built-in crypto
const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await Bun.password.verify(password, hashedPassword);
};

// Generate JWT token (you might want to use the Elysia JWT plugin instead)
const generateToken = async (payload: any): Promise<string> => {
  const jwt = await import("@elysiajs/jwt");
  // This is a simplified version - use the Elysia JWT plugin in actual routes
  return "use-elysia-jwt-plugin";
};

// Verify JWT token (you might want to use the Elysia JWT plugin instead)
const verifyToken = async (token: string): Promise<any> => {
  // This is a simplified version - use the Elysia JWT plugin in actual routes
  return null;
};

export { hashPassword, verifyPassword, generateToken, verifyToken };
