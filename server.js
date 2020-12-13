/**
 * @fileoverview Express-based REST server for API testing demo
 * @author Joey Whelan <joey.whelan@gmail.com>
 */

'use strict';
'use esversion 6';
const express = require('express');
const winston = require('winston');

const port = 8888;
let hitCounter = {'dummyPage' : 1};
const app = express();
app.use(express.json());

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    level: 'debug'
});

//create
app.post('/page', (req, res) => {
    logger.debug('post request received');
    const pageId = req.body.pageId;
    if (pageId) {
        if (pageId in hitCounter) {
            res.status(400).json({error : 'page already exists'});
        }
        else {
            hitCounter[pageId] = 1;
            res.status(201).json({'pageId': pageId, 'hitCount': hitCounter[pageId]});
        }
    }
    else {
        res.status(400).json({error : 'missing pageId'});
    }
});

//retrieve
app.get('/page/:pageId/hitCount', (req, res) => {
    logger.debug('get request received');
    const pageId = req.params.pageId;
    if (pageId in hitCounter) {
        res.status(200).json({'pageId': pageId, 'hitCount': hitCounter[pageId]});
    }
    else {
        res.status(404).json({error : 'pageId not found'});
    }
});

//update
app.patch('/page/:pageId/hitCount', (req, res) => {
    logger.debug('patch request received');
    const pageId = req.params.pageId;
    if (pageId in hitCounter) {
        hitCounter[pageId]++;
        res.status(200).json({'pageId': pageId, 'hitCount' : hitCounter[pageId]});
    }
    else {
        res.status(404).json({error : 'pageId not found'});
    }
});

//delete
app.delete('/page/:pageId', (req, res) => {
    logger.debug('delete request received');
    const pageId = req.params.pageId;
    if (pageId in hitCounter) {
        delete hitCounter[pageId];
        res.status(200).json({pageId : 'deleted'});
    }
    else {
        res.status(404).json({error : 'pageId not found'});
    }
});

app.listen(port, () => {
    console.log(`http server listening on ${port}`);
});