import express from 'express';

const app = express();

app.get('/', (request, response) => {
    response.json([
        'gabriel',
    ]);
});

app.listen(3333);