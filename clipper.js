const exec = require('child_process').execFile;
const fs = require('fs');
const http = require('http');
const url = require('url');
const uuid = require('uuid');

const shell = require('shelljs');
const cors = require('cors');
const express = require('express');

// Constants
// Clip camera IDs - these correspond to the EXACT name of the camera in the iPostSports switchboard URL schema.
// for example, lahs-bb-cam20 corresponds to https://switchboard.ipostsports.net:8443/live/lahs-bb-cam20/index.m3u8
const CLIP_CAMERAS = [
    'lahs-bb-cam20',
    'lahs-bb-cam21',
    'lahs-bb-cam22',
    'lahs-bb-cam23',
    'lahs-bb-cam25',
    'lahs-bb-cam26',
    'lahs-sb-cam20',
    'lahs-sb-cam21',
    'lahs-sb-cam23',
    'laybs-cam20',
    'laybs-cam26',
    'laybs-cam23',
    'proath-cam22',
    'proath-cam23',
    'proath-cam24',
    'proath-cam25',
    'proath-cam26',
    'xcel-cam23',
    'xcel-cam24',
    'xcel-cam25',
    'xcel-cam28',
    'xcel-cam52',
];

// Express init
const app = express();

// App middlewares
app.use(cors());

// App routes
app.get('/', (req, res) => {
    const query = req.query;

    console.log(query);

    // Cam param coorelates to a CLIP_CAMERAS value
    // ath_id param coorelates to a iPostSports Athlete ID
    const { cam, ath_id } = query;

    // Check if cam param is valid
    if (!cam || !CLIP_CAMERAS.includes(cam)) {
        res.status(400).send('Invalid cam param');
        return;
    }

    // Check if ath_id param is valid
    if (!ath_id || isNaN(ath_id)) {
        res.status(400).send('Invalid ath_id param');
        return;
    }

    // Create a new uuid and associated filename for the clip file
    const { v4: uuidv4 } = uuid;
    let filename = uuidv4() + '.mp4';

    console.log('cam', cam);
    console.log('ath_id', ath_id);
    console.log('filename: ', filename);

    // Execute shell script for clipper
    // shell.exec(
    //     'node cli.js -c 5 -o /static/uploads/'
    //     + filename
    //     + `https://switchboard.ipostsports.net:8443/live/${cam}/index.m3u8; curl --location http://localhost:3001 --form file=@"/static/uploads/"`
    //     + filename
    //     + ' --form id="'
    //     + ath_id +
    //     '" --form title="" --form category="N" --form authToken="MH5QlMiZ5A6Udmw" --form ipost="N"'
    // );
});

// Server init
app.listen(3002, () => {
    console.log('Server running on port 3002');
});
