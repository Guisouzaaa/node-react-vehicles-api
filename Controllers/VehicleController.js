const Vehicle = require('../Models/Vehicle');

module.exports = {
    async getVehicles(req, res) {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = {}

            results.total = Math.ceil(await Vehicle.countDocuments().exec() / limit);

            if (endIndex < await Vehicle.countDocuments().exec()) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            results.results = await Vehicle.find().limit(limit).skip(startIndex).exec();
            return res.json(results);

        } catch (error) {
            res.json({ error: error })
        }
    },

    async getVehiclesById(req, res) {
        try {
            const vehicle = await Vehicle.find({ _id: req.params.id });
            return res.json(vehicle);

        } catch (error) {
            res.json({ error: error })
        }
    },

    async createVehicle(req, res) {
        try {
            const vehicle = await Vehicle.create({
                vehicle: req.body.vehicle,
                brand: req.body.brand,
                description: req.body.description,
                year: req.body.year,
                sold: req.body.sold
            });
            return res.json(vehicle);

        } catch (error) {
            res.json({ error: error })
        }
    },

    async updateVehiclePatch(req, res) {
        const vehicle = req.body;

        try {
            await Vehicle.findOneAndUpdate({ _id: req.params.id },
                { $set: vehicle },
                { new: true, useFindAndModify: false },
                (err, data) => {
                    if (err) {
                        return res.status(400).json({ msg: "Vehicle not found." })
                    } else {
                        return res.json(data);
                    }
                });

        } catch (error) {
            res.json({ error: error });
        }
    },

    async updateVehiclePut(req, res) {
        const vehicle = req.body;

        try {
            await Vehicle.findOneAndUpdate({ _id: req.params.id },
                { $set: vehicle },
                { new: true, useFindAndModify: false },
                (err, data) => {
                    if (err) {
                        return res.status(400).json({ msg: "Vehicle not found." })
                    } else {
                        return res.json(data);
                    }
                });
        } catch (error) {
            res.json({ error: error })
        }
    },

    async deleteVehicle(req, res) {
        try {
            await Vehicle.findByIdAndDelete({ _id: req.params.id },
                (err, data) => {
                    if (err) {
                        return res.status(400).json({ msg: "Vehicle not found." })
                    } else {
                        return res.json(data);
                    }
                });
        } catch (error) {
            res.json({ error: error })
        }
    }
}