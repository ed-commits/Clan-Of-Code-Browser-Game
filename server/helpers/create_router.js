const express = require("express");
const { Router } = require("express");
const ObjectId = require("mongodb").ObjectId;

const createRouter = function (collection) {

    const router = express.Router();

    router.get("/", (req, res) => {
        collection
        .find()
        .toArray()
        .then((docs) => res.json(docs))
        .catch((err) => {
            res.status(500);
            res.json({ status: 500, error: err});
        })
    })

    router.post("/", (req, res) => {
        const data = req.body;
        collection
            .insertOne(data)
            .then((result) => {
                res.json(result.ops[0]);
            })
            .catch((err) => {
                res.status(500);
                res.json({ status: 500, error: err });
            });
    })

    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        collection
            .deleteOne({ _id: ObjectId(id) })
            .then((result) => res.json(result))
            .catch((err) => {
                res.status(500);
                res.json({ status: 500, error: err });
            });
    })

    router.put("/:id", (req, res) => {
        const id = req.params.id;
        const data = req.body;
        collection
            .updateOne({ _id: ObjectId(id) },
                       { $set: data },
                       { returnOriginal: false})
            .then((result) => res.json(result))
            .catch((err) => {
                res.status(500);
                res.json({ status: 500, error: err });
            });
    })

    return router;
};

module.exports = createRouter;
