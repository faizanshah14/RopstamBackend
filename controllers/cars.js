const model = require("../models");
const uuidv4 = require("uuid/v4");

model.categories.hasMany(model.cars, { foreignKey: "categoriesId" });
model.cars.belongsTo(model.categories, { foreignKey: "categoriesId" });

exports.getAllCars = (req, res) => {
  model.cars
    .findAll({
      include: [
        {
          model: model.categories,
          attributes: ["category"],
        },
      ],
    })
    .then((cars) => {
      const data = cars?.map((car) => {
        return {
          id: car.id,
          registrationNumber: car.registrationNumber,
          color: car.color,
          make: car.make,
          model: car.model,
          category: car.category?.category
        };
      });
      res.status(200).json({
        result: "ok",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};

exports.getCarById = (req, res) => {
  const carId = req.params.carId;
  if (!carId) {
    return res.status(400).json({
      result: "error",
      message: "Car id is required",
    });
  }
  model.cars
    .findOne({
      where: {
        id: carId,
      },
      include: [
        {
          model: model.categories,
          attributes: ["category"],
        },
      ],
    })
    .then((car) => {

      if (!car) {
        return res.status(404).json({
          result: "error",
          message: "Car not found",
        });
      }
      const data = car?.dataValues;
      data.category = data.category?.category;
      res.status(200).json({
        result: "ok",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};

exports.createCar = (req, res) => {
  const car = req.body;
  car.id = uuidv4();
  if (!car) {
    return res.status(400).json({
      result: "error",
      message: "Car is required",
    });
  }
  model.cars
    .create(car)
    .then((car) => {
      res.status(200).json({
        result: "ok",
        data: car,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};

exports.updateCar = (req, res) => {
  const carId = req.body.id;
  const car = req.body;
  if (!carId || !car) {
    return res.status(400).json({
      result: "error",
      message: "Car id and car are required",
    });
  }
  model.cars
    .findOne({
      where: {
        id: carId,
      },
    })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          result: "error",
          message: "Car not found",
        });
      }
      model.cars
        .update(car, {
            where: {
                id: carId,
            }
        })
        .then(() => {
          res.status(200).json({
            result: "ok",
            data: car,
          });
        })
        .catch((err) => {
          res.status(500).json({
            result: "error",
            message: err.message,
          });
        });
    });
};

exports.deleteCar = (req, res) => {
  const carId = req.params.carId;
  if (!carId) {
    return res.status(400).json({
      result: "error",
      message: "Car id is required",
    });
  }
  model.cars
    .findOne({
      where: {
        id: carId,
      },
    })
    .then((car) => {
      if (!car) {
        return res.status(404).json({
          result: "error",
          message: "Car not found",
        });
      }
      car
        .destroy()
        .then(() => {
          res.status(200).json({
            result: "ok",
            data: car,
          });
        })
        .catch((err) => {
          res.status(500).json({
            result: "error",
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        result: "error",
        message: err.message,
      });
    });
};
