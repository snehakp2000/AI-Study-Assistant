require('dotenv').config();


const app = require('./app');

const DBConnect = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await DBConnect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();