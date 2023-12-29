const moment = require("moment");

exports.currentTime = (req, context, events, next) => {
  const unixTime = moment()
    .unix()
    .valueOf();

  req.json = {currentTime: unixTime};
  return next();
};