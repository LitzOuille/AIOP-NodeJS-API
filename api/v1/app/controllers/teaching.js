var orm = require("../../config/models");

/*
 * GET /teachings/
 */
module.exports.list = function (req, res, next) {
    var teaching = orm.model("teaching");

    teaching.findAll({"where": {"deleted_at": null}}).success(function (teachings) {
        res.send(200, {"teachings": teachings});
    });

    return next();
};

/*
 * POST /teachings/
 */
module.exports.create = function (req, res, next) {
    var teaching = orm.model("teaching");

    if (req.body && req.body.teaching) {
        var t = req.body.teaching;
        if (t.group_id && t.lesson_id && t.teacher_id) {
            teaching.create(t)
                .success(function (teaching) {
                    res.send(201, {"teaching": teaching});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Teaching found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Teaching not found in body"});
    }

    return next();
};

/*
 * GET /teachings/:id
 */
module.exports.show = function (req, res, next) {
    var teaching = orm.model("teaching");

    teaching.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (teaching) {
        if (!teaching) {
            res.send(404, {"message": "Teaching not found"});
        }
        else {
            res.send(200, {"teaching": teaching});
        }
    });

    return next();
};

/*
 * PUT /teachings/:id
 */
module.exports.update = function (req, res, next) {
    var teaching = orm.model("teaching");

    if (req.body && req.body.teaching) {
        var t = req.body.teaching;
        if (t.group_id && t.lesson_id && t.teacher_id) {
            teaching.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (teaching) {
                if (!teaching) {
                    res.send(404, {"message": "Teaching not found"});
                }
                else {
                    teaching.group_id = t.group_id;
                    teaching.lesson_id = t.lesson_id;
                    teaching.teacher_id = t.teacher_id;

                    teaching.save()
                        .success(function (teaching) {
                            res.send(200, {"teaching": teaching});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Teaching found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Teaching not found in body"});
    }

    return next();
};

/*
 * DELETE /teachings/:id
 */
module.exports.delete = function (req, res, next) {
    var teaching = orm.model("teaching");

    teaching.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (teaching) {
        if (!teaching) {
            res.send(404, {"message": "Teaching not found"});
        }
        else {
            teaching.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};