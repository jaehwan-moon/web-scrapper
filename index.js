'use strict'

const cheerio = require('cheerio');
const request = require('sync-request');
const fs = require('fs');
const json2xls = require('json2xls');

var detail = [];
var members = {};
var htmlText = fs.readFileSync('ontario_basket.html');
var clubList = [];

var $ = cheerio.load(htmlText);
$('a.list').each(function (index) {
  clubList.push($(this).attr('href'));
});

var testHtml = request('GET', 'https://www.basketball.on.ca/site/' + clubList[0]).getBody().toString();
$ = cheerio.load(testHtml);
console.log($('table.eventTable'));
return 0;

clubList.forEach(function (addr, index, arr) {
  var detailHtml = request('GET', 'https://www.basketball.on.ca/site/' + addr).getBody().toString();
  
  $ = cheerio.load(detailHtml);
  var tables = $('table.eventTable');
  var data = tables[0].find('td');
  var obj = {
    name: data[0].Text(),
    description: data[2].Text(),
    region: data[4].Text(),
    city: data[6].Text(),
    contact: data[8].Text(),
    phone: data[10].Text(),
    email: data[12].Text(),
    website: data[14].Text(),
    programs: data[16].Text()
  }
})
fs.writeFileSync('details.json', JSON.stringify(detail, null, '\t'));
return 0;

$ = cheerio.load(res.getBody().toString());

$('#frmSearch').children('#CompanyName').each(function() {
  let tempObj = {};
  tempObj.company = $(this).find('a').text() ? $(this).find('a').text() : $(this).text();
  tempObj.link = $(this).find('a').attr('href') ? $(this).find('a').attr('href') : null;
  tempObj.category = 'Builder / Developer'
  json.push(tempObj);
  console.log(tempObj.company + ' has been done.')
});

fs.writeFileSync('C:/git/FI.json', JSON.stringify(json, null, '\t'));
fs.writeFileSync('C:/git/FI.xlsx', json2xls(json), 'binary');
