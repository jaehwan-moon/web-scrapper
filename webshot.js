var webshot = require('webshot');

webshot('http://tarion.com', './tarion.png', function() {
  console.log("generated");
});
