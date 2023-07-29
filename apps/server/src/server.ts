import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';

const router: Express = express();

const server = http.createServer((req, res) => {
   res.write('Hello World!')
   res.end()
});

const PORT: any = process.env.PORT ?? 6060;
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));