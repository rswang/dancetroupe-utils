/*
 * This creates the master list that lists each dancer and the dances they are in. You
 * should import this to Google drive and split by the delimiter.
 *
 * To get the inital file, run this (password is in the Google Drive):
 * mysql -u dancetroupe -h sql.mit.edu -p -e "use dancetroupe+django; \
 * select concat(shows_dance.name, ';', auth_user.first_name, ' ', \
 *   auth_user.last_name, ';', auth_user.email) \
 * from shows_dance_dancers \
 * join shows_dance on shows_dance.id = shows_dance_dancers.dance_id \
 * join auth_user on shows_dance_dancers.user_id = auth_user.id \
 * where shows_dance.id >= 303;" > dance_dancers_fa16.txt
 * 
 * Usage:
 * node createMasterList.js dance_dancers_fa16.txt > master_fa16.txt
 *
 * Output (per dancer):
 * Rachel Wang;rswang@mit.edu;Dance 1;Dance2;Dance3;Dance4;
 */

var fs = require('fs');

var delimiter = ';';

var createMasterList = function() {
    if (process.argv.length < 3) {
        console.log('Invalid file argument.')
        console.log('Usage: node createMasterList.js <FILE_NAME> > master_<SHOW_SLUG>.txt');
        return
    }
    fs.readFile(process.argv[2], 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        var rows = data.split('\n');
        var mapping = {};
        for (var i = 0; i < rows.length; i++) {
            var entries = rows[i].split(delimiter);
            var dance = entries[0];
            var name = entries[1];
            var email = entries[2];

            var user = [name, email].join(delimiter)

            if (mapping[user]) {
                mapping[user].push(dance);
            } else {
                mapping[user] = [dance];
            }
        }
        for (var key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                var dances = '';
                for (var i = 0; i < mapping[key].length; i++) {
                    dances += mapping[key][i] + delimiter;
                }
                console.log(key + delimiter + dances);
            }
        }
    });
}

createMasterList();