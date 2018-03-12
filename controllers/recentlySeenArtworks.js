const RecentlySeenArtworkModel = require("../models.bk/recentlySeenArtwork");
const getDefaultController = require('./helpers/controllerGenerator');
const _ = require('lodash');
module.exports = _.extend(getDefaultController(RecentlySeenArtworkModel), {
    updateOne: function(id, callback) {
        RecentlySeenArtworkModel.update({ id }, { id: id, updated: Date.now() }, { upsert: true },
            callback);
    }
});
