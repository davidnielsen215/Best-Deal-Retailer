const express = require("express");
const subRouter = express.Router();
const Subinfo = require("../models/subinfo");

subRouter.get("/", (req, res, next) => {
    Subinfo.find((err, subs) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(subs);
    });
});

subRouter.post("/", (req, res, next) => {
    const subinfo = new Subinfo(req.body);
    subinfo.save(function (err, newSubinfo) {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(newSubinfo);
    });
});
//Currently dysfunctional
subRouter.get("/:subId", (req, res, next) => {
    Subinfo.findById(req.params.subId, (err, sub) => {
        if (err) {
            res.status(500);
            return next(err);
        } else if (!sub) {
            res.status(404)
            return next(new Error("No subscription found."));
        }
        return res.send(Subinfo);
    });
});
//FINALLY FUNCTIONAL
subRouter.put("/:id", (req, res, next) => {
    Subinfo.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        (err, Subinfo) => {
            if (err) {
                res.status(500)
                return next(err);
            };
            return res.send(Subinfo)
        }
    );
});
//Currently dysfunctional
subRouter.delete("/:subinfoId", (req, res, next) => {
    Subinfo.findByIdAndRemove(req.params.subinfoId, (err, subinfo) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(subinfo);
    });
});

module.exports = subRouter;
