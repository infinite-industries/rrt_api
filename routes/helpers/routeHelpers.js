const express = require("express");
const uuidv1 = require('uuid/v1');
const passport = require('passport');
const constants = {
    db_error: 'db_fail',
    success_status: 'success'
};

module.exports = {
    constants,
	getDefaultRouter
};

function getDefaultRouter(router_name, router_name_singular, controller, forcedValues, options) {
    const debug = require('debug')('router:' + router_name);
    const identifier = router_name_singular + 'ID';
    const router = express.Router();
    options = options || {};
    const readMiddleware = options.readMiddleware || [];

	router.use('/', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers',
			'Content-Type, Authorization, Content-Length, X-Requested-With');
		next();
	});

    debug('establishing router "/" for router "%s"', router_name);
    router.get("/", readMiddleware, function(req, res) {
        console.log("handling request for all " + router_name);

        const sortField = req.query.sort_field || false;
        const filter_field = req.query.filter_field ||false;

        let queryStr = req.query.query;
        let query = {};

        if (queryStr) {
            try {
                query = JSON.parse(queryStr);
            } catch(ex) {
                console.warn('error parsing query obj: ' + ex);
                console.warn('invalid object string: ' + queryStr);
                return res.status(500).json({ status: 'failure', error_message: 'error: ' + ex });
            }
        }

        // allow a custom all method to be passed in
        const allMethod = options && options.allMethod ? options.allMethod : controller.all;
        allMethod(function(err, data) {
            if (err) {
                console.warn("error handling request for all %s: %s: ", router_name, err);
                res.status(500).json({ status: constants.db_error });
            } else {
                debug('found all requested ' + router_name);

                if (sortField) {
                    data = data.sort(function(a, b) {
                        return (a[sortField] || 0) > (b[sortField] || 0);
                    });
                }

                const resp = { status: constants.success_status };
                resp[router_name] = data;
                res.status(200).json(resp);
            }
        }, query, filter_field);
    });

    debug('establish router /:%s for router %s', identifier, router_name);
    router.get("/:" + identifier,
		readMiddleware,
        function(req, res) {
            console.log("handling  get request for %s by id: %s", router_name, req.params[identifier]);

			const byIDMethod = options && options.byIDMethod ? options.byIDMethod : controller.findById;
            byIDMethod(req.params[identifier], function(err, data) {
                if(err) {
                    console.warn("error handling request for artist: " + err);
                    res.status(500).json({ "status": constants.db_error });
                }
                else if (data===null) {
                    debug('could not find the requested %s:%s', router_name_singular, req.params[identifier]);
                    res.status(404).json({"status":"no_such_id"});
                }
                else {
                    const resp = { status: constants.success_status };
                    resp[router_name_singular] = data;
                    res.status(200).json(resp);
                }
            })
        }
    );

	router.post(
	    '/',
		passport.authenticate('localapikey', { session: false }),
        function(req, res) {
            console.log("handling post request for '%s'", router_name);
            const postJSON= req.body[router_name_singular];
            if (!postJSON)
                return res.status(422).json({ status: router_name_singular + ' parameter is required' });

            postJSON.id = uuidv1();

            if (forcedValues) {
                const keys = Object.keys(forcedValues);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    postJSON[key] = forcedValues[key];
                }
            }

            controller.create(postJSON, function(err) {
                if (err) {
                    console.warn('error creating "%s"', router_name_singular + ': ' + err);
                    return res.status(500).json({ status: err });
                }

                res.status(200).json({ status: 'ok', id: postJSON.id });
            });
	});

    return router;
}