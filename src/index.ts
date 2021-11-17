import 'reflect-metadata';
import '@configs/env';
// import { createConnection } from 'typeorm';
import { appConfig } from '@configs/app.config';
// import { brbatelDBConfig } from '@configs/orm.config';
import { App } from './app/app.module';

(async (): Promise<void> => {
  try {
    // await createConnection(brbatelDBConfig);

    const app = new App(appConfig.port);
    app.listen();
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }
})();
