import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((request: Request, response: Response, next: NextFunction) => {
    response.removeHeader("x-powered-by");
    next();
});

app.use(router);

app.listen(3000, () => {
    console.log('App is listening on port 3000!');
});

export default app;