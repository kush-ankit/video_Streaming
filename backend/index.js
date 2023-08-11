const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.use(cors());


app.get('/video', function (req, res) {
    console.log("request recieved");
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = __dirname + "/Movies/Krishna Vrinda Vihari (2023) {Hindi DD5.1 -192Kbps + Telugu} UnCut HD 1080p ESub - Vegamovies.to.mkv";
    const videoSize = fs.statSync(videoPath).size;
    // console.log("size of video is:", videoSize);
    const CHUNK_SIZE = 10 ** 6; //1 MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);

})

app.get('/files', (req, res) => {
    console.log('request recieved')
    const filesInTheFolder = fs.readdirSync(__dirname + '/Movies', { withFileTypes: true })
        .filter(item => !item.isDirectory())
        .map(item => item.name);
    res.send(filesInTheFolder);
})

const thumbsupply = require('thumbsupply');

app.get('/thumbnail', (req, res) => {
    const name = req.params.name[0];
    thumbsupply.generateThumbnail(__dirname+"/movies/"+name)
        .then(thumb => {
            // serve thumbnail
            res.send(thumb);
        });
});



app.listen(3001,'192.168.1.50', function () {
    console.log("Server is running on port:", 3001);
})