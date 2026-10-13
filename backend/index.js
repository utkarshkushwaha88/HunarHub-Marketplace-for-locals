import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

let dbConnection;

export default async function handler(req, res) {
  try {
    if (!dbConnection) {
      dbConnection = connectDB().catch((error) => {
        dbConnection = undefined;
        throw error;
      });
    }
    await dbConnection;
    return app(req, res);
  } catch (error) {
    console.error("Backend initialization failed:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Backend initialization failed. Check the deployment logs and environment variables.",
      });
    }
  }
}
