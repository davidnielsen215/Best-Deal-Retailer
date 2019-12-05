const express = require("express");
const subRouter = express.Router();
const Subinfo = require("../models/subinfo");

//Get Request throug user token views all subscription types
subRouter.get("/", (req, res, next) => {
    Subinfo.find({user: req.user._id},(err, subs) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(subs);
    });
});

//Post Request through user token Functional
subRouter.post("/", (req, res, next) => {
    const subinfo = new Subinfo(req.body);
    subinfo.user = req.user._id;
    subinfo.save(function (err, newSubinfo) {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(newSubinfo);
    });
});

//Unable to retrieve individual subscription using _id in property field and subinfoId in endurl
subRouter.get("/subinfoId", (req, res, next) => {
    Subinfo.findOne({_id: req.params._id, user: req.user._id}, (err, subinfo) => {
        if (err) {
            res.status(500);
            return next(err);
        } else if (!subinfo) {
            res.status(404)
            return next(new Error("No subscription found."));
        }
        return res.send(subinfo);
    });
});

// Same issues as the retrieve request, need to be able to update subscription status
subRouter.put("/:id", (req, res, next) => {
    Subinfo.findOneAndUpdate(
        {_id: req.params._id, user: req.user._id},
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

//Same issue -need to be able to delete subscription status
subRouter.delete("/:id", (req, res, next) => {
    Subinfo.findOneAndRemove({id: req.params._id, user: req.user._id}, (err, subinfo) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(subinfo);
    });
});

module.exports = subRouter;
