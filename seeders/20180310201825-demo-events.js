const fs = require('fs')
const fileLocation = __dirname + '/data/mock_events.json'
const async = require('async')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      async.waterfall([
        _nextTask => {
          fs.readFile(fileLocation, (err, contents) => {
            if (err) {
                return _nextTask(err)
            }

            let json = null
            try {
              json = JSON.parse(contents.toString())
            } catch (ex) {
              return _nextTask(err)
            }

            _nextTask(null, json)
          })
        },
        (jsonEvents, _nextTask) => {
          const events = jsonEvents.map(json => {
            // make up some fake start and end times randomly in the future so we have active data to show
            const futureStartTime = new Date(Date.now())
            futureStartTime.setHours(futureStartTime.getHours() + Math.floor(Math.random() * 8760 + 1))
            const futureEndTime = new Date(futureStartTime)
            futureEndTime.setMinutes(futureEndTime.getMinutes() + Math.floor(Math.random() * 120 + 1))

              /*if (json.id === '2c452a90-09ae-11e8-bcdb-1d50656d5407') {
                console.log('!!! here: ' + JSON.stringify({ ... json, time_start: futureStartTime, time_end: futureEndTime }, null, 4))
              }*/
            return { ... json, time_start: futureStartTime, time_end: futureEndTime }
          })

          queryInterface.bulkInsert('events', events, { omitNull: true })
            .then(() => _nextTask())
            .catch(err => _nextTask(err))
        }
      ], err => {
        if (err)
          return reject(err)

        resolve()
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
