/*
 * This creates a CSV file per dance from a master list. Each CSV file has
 * the list of dancers (name and email).
 *
 * Usage:
 * node createDanceTextFiles.js master_fa16.txt
 */

var fs = require('fs');

var dances = {};

// Takes a master dancer list

var delimiter = ';';
var createDanceTextFiles = function() {
  if (process.argv.length < 3) {
    console.log('Invalid file argument.')
    console.log('Usage: node createDanceTextFiles.js <FILE_NAME>');
    return
  }
  fs.readFile(process.argv[2],'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    var dancers = data.split('\n');
    dancers.forEach(function(dancer) {
      var items = dancer.split(delimiter);
      var name = items[0].trim();
      var email = items[1].trim();
      var user = [name, email].join(',');
      if (!name) {
        return;
      }
      for (var i = 2; i < items.length; i++) {
        var dance = items[i].trim();
        if (!dance) {
          continue;
        }
        if (dances[dance]) {
          dances[dance].push(user);
        } else {
          dances[dance] = [user];
        }
      }
    });
    var danceNames = Object.keys(dances);
    for (var i = 0; i < danceNames.length; i++) {
      var danceName = danceNames[i];
      fs.writeFile(danceName + '.csv', dances[danceName].join('\n'), function (err) {
        if (err) throw err;
      });
    }
  });  
}

createDanceTextFiles();