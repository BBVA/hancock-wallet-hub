import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { appRouter } from './routes/index';
import config from './utils/config';
import * as db from './utils/db';
import logger from './utils/logger';

export async function run() {

  return db
    .connect()
    .then(() => {

      const app = express();

      // parse application/json
      app.use(cors());
      app.use(bodyParser.json());

      app.use(config.server.base, appRouter);

      app.listen(config.server.port, (error: any) => {

        if (error) {
          return logger.error('Service is not available', error);
        }

        logger.info('Service available in port', config.server.port);

      });

    })
    .catch(logger.error);

}

function exitHook(err?: any) {

  logger.info('Exiting gracefully...');

  if (err) {
    logger.error(err);
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
// Catch Unhandled promise rejection from the program
process.on('unhandledRejection', exitHook);
