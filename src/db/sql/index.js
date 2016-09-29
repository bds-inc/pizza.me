'use strict';

var QueryFile = require('pg-promise').QueryFile;

// Helper for linking to external query files;
function sql(file) {

    var path = './src/db/sql/' + file;

    var options = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true,

        // Replace ${schema} pre-formatting parameter with "public"
        params: {
            schema: 'public'
        }
    };

    return new QueryFile(path, options);

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

module.exports = {
    branches: {
        select_all: sql('branches/select_all.sql')
    }
};
