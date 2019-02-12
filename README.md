# dancetroupe-utils

`createMasterDancerList.js` helps create the master dancer list. Note: It requires doing a MySQL query (noted in the file) first to obtain all the dancers in each dance.

~~`createDanceTextFiles.js` helps create a CSV file per dance.~~ . -> createDanceFiles.python

Note: These might be a little finicky. For example, it doesn't handle bad inputs (i.e. MySQL header, empty lines), so you should remove them first -- or change the script to accomodate!

Updated:
`createDanceFiles.py` helps create a CSV file per dance.  You run it doing the following:
`python createDanceFiles.py <MASTER_LIST_FILENAME>`

Note: This script assumes that the masterlist has a header.  If there is no header in the masterlist, comment out the line `file.readline()`
