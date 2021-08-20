import dotenv from 'dotenv';
dotenv.config({});

import "reflect-metadata";
import app from './app';


// Start the application by listening to specific port
const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  console.info('Express application started on port: ' + port);
});
