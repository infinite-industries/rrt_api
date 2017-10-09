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

function getDefaultRouter(router_name, router_name_singular, controller) {
    const debug = require('debug')('router:' + router_name);
    const identifier = router_name_singular + 'ID';
    router = express.Router();

	router.use('/', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers',
			'Content-Type, Authorization, Content-Length, X-Requested-With');
		next();
	});

    debug('establishing router "/" for router "%s"', router_name);
    router.get("/", function(req, res) {
        console.log("handling request for all " + router_name);
        controller.all(function(err, data) {
            if (err) {
                console.warn("error handling request for all %s: %s: ", router_name, err);
                res.status(500).json({ status: constants.db_error });
            } else {
                debug('found all requested ' + router_name);
                const resp = { status: constants.success_status };
                resp[router_name] = data;
                res.status(200).json(resp);
            }
        });
    });

    debug('establish router /:%s for router %s', identifier, router_name);
    router.get("/:" + identifier,
        function(req, res) {
            console.log("handling  get request for %s by id: %s", router_name, req.params[identifier]);
            controller.findById(req.params[identifier], function(err, data) {
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

            controller.create(postJSON, function(err) {
                if (err)
                    return res.status(500).json({  status: err });

                res.status(200).json({ status: 'ok', id: postJSON.id });
            });
	});

    return router;
}
