'use strict'

const cheerio = require('cheerio');
const request = require('sync-request');
const fs = require('fs');
const json2xls = require('json2xls');
const ohba = require('./data/test.json');

var res, $;
var json = [];

ohba.forEach(function(elem, index, arr) {
  if(index > 3999 && arr.length) {
    let tempObj = {};
    res = request('GET', 'http://ohba.ca' + elem.link);
    $ = cheerio.load(res.getBody());

    tempObj.company = elem.company;
    tempObj.link = elem.link;
    tempObj.street = $('.hidden-info > .left > p:last-child').html().split('<br>')[0].trim() ? $('.hidden-info > .left > p:last-child').html().split('<br>')[0].trim() : null;
    tempObj.city = $('.hidden-info > .left > p:last-child').html().split('<br>')[1].replace(/(?:\r\n|\r|\n)/g, '').trim() ? $('.hidden-info > .left > p:last-child').html().split('<br>')[1].replace(/(?:\r\n|\r|\n)/g, '').trim() : null;
    tempObj.postCode = $('.hidden-info > .left > p:last-child').html().split('<br>')[2].trim() ? $('.hidden-info > .left > p:last-child').html().split('<br>')[2].trim() : null;
    tempObj.contact = $('.hidden-info > .right > p:last-child').html().split('<br>')[0].trim() ? $('.hidden-info > .right > p:last-child').html().split('<br>')[0].trim() : null;
    tempObj.phone = $('.hidden-info > .right > p:last-child').html().split('<br>')[1].split('\n')[1].trim() ? $('.hidden-info > .right > p:last-child').html().split('<br>')[1].split('\n')[1].trim() : null;
    tempObj.website = $('.hidden-info > .right > p:last-child > a').attr('href') ? $('.hidden-info > .right > p:last-child > a').attr('href') : null;
    json.push(tempObj);
    console.log( (index + 1) + "_" + elem.company + ' has been done.');
  }
});

fs.writeFileSync(__dirname + '/data/json/details_9.json', JSON.stringify(json, null, '\t'));
fs.writeFileSync(__dirname + '/data/xlsx/details_9.xlsx', json2xls(json), 'binary');
