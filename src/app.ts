import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import {AppRouter} from './routes/index';
import config from './utils/config';
import * as db from './utils/db';

export async function run() {

  return db.connect()
    .then(() => {

      const app = express();

      // parse application/json
      app.use(cors());
      app.use(bodyParser.json());

      app.use(config.server.base, AppRouter);

      app.listen(config.server.port, (error: any) => {

        if (error) {
          return console.error('Service is not available', error);
        }

        console.log('-----------------------------------------------------------------------');
        console.log('Service available in port', config.server.port);
        console.log('-----------------------------------------------------------------------');

      });

    })
    .catch(console.log);

}

function exitHook(err?: any) {

  console.log('Exiting gracefully...');

  if (err) {
    console.error(err);
  }

  db.close();
  process.exit(0);

}

// The app is finishing
process.on('exit', exitHook);
// Catch the SIGINT signal (Ctrl+C)
process.on('SIGINT', exitHook);
// Catch uncaught exceptions from the program
process.on('uncaughtException', exitHook);
