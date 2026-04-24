const { model } = require("mongoose");

const { PositionsModel } = require("../schemas/PositionsModel");

const PositionsModel = new model("position", PositionsModel);

module.exports = { PositionsModel };