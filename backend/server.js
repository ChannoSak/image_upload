import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';

// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import eShopUploads from './routes/eShopUploadRoutes.js';
import cmsRoutes from './routes/cmsUploadRoute.js';
import tvUploads from './routes/tvUploadRoute.js';

const __dirname = path.resolve();
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/school/upload', eShopUploads);
// app.use('/api/cms/upload', cmsRoutes)
app.use('/api/tv/upload', tvUploads)



app.use(
    '/api/uploads/schools',
    express.static(path.join(__dirname, '/uploads/schools'))
);
app.use(
    '/api/uploads/tv',
    express.static(path.join(__dirname, '/uploads/tv'))
)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

// app.use(notFound);
// app.use(errorHandler);
//for ebook uploads
const PORT = process.env.PORT || 2100;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);
