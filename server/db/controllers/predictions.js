const Prediction = require('../model/predictions');

const create = (req, res) => {
  const data = [];
  const predictions = req.body;
  for (var id in predictions) {
    data.push(predictions[id]);
  }
  // console.log(data);
  Prediction.insertMany(data, (err) => {
    if (err) {
      console.log(err);
    }
    res.status(201).send();
  });
};

const deleteAll = () => {
  Prediction.deleteMany()
    .then()
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  create,
  deleteAll,
};
