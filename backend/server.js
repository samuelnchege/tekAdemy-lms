import app from './src/app.js';
import config from './src/config/config.js';
import connectDB from './src/database/connectDB.js';

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(
        `🚀 TekAdemy LMS API running on port ${config.port} in ${config.nodeEnv} mode`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();