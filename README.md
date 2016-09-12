# dancetroupe-utils

`createMasterDancerList.js` helps create the master dancer list. Note: It requires doing a MySQL query (noted in the file) first to obtain all the dancers in each dance.

`createDanceTextFiles.js` helps create a CSV file per dance.

Note: These might be a little finicky. For example, it doesn't handle bad inputs (i.e. MySQL header, empty lines), so you should remove them first -- or change the script to accomodate!
