import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs'
import rimraf from 'rimraf';
import cciUploads from './routes/cciUploadRoute.js';


const __dirname = path.resolve();
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }
app.use('/api/cci/upload', cciUploads)
app.use('/api/uploads/cci-Image', express.static(path.join(__dirname, '/uploads/cci-Image')))

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/frontend/build')));

//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//     );
// } else {
//     app.get('/', (req, res) => {
//         res.send('API is running....');
//     });
// }

let uploadDir = __dirname + '/uploads/cci-image'

  fs.readdir(uploadDir, (err, files) => {
    if (err) console.log(err)
    if (files){
        files.forEach(file => {
           fs.stat(path.join(uploadDir, file), function(err, stat){
            let endTime, now;
            if(err){
                return console.error(err)
            }
            now = new Date().getTime();
            endTime = new Date(stat.ctime).getTime() + 600000
            if(now > endTime){
               return rimraf(path.join(uploadDir, file), function(err){
                if(err){
                    return console.error(err)
                }
                console.log('Delete successfully')
               }) 
            }
           })
        });
    } else {
        console.log('no files found')
    }
});


const PORT = process.env.PORT || 2500;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
