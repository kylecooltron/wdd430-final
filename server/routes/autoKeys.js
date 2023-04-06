var Key = require('../models/key');

var maxResourceId;
var maxTagId;

var sequenceId = null;

function AutoKey() {

  Key.findOne()
    .exec(function (err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxResourceId = sequence.maxResourceId;
      maxTagId = sequence.maxTagId;
    });
}

AutoKey.prototype.nextId = function (collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'tags':
      maxTagId++;
      updateObject = { maxTagId: maxTagId };
      nextId = maxTagId;
      break;
    case 'resources':
      maxResourceId++;
      updateObject = { maxResourceId: maxResourceId };
      nextId = maxResourceId;
      break;
    default:
      return -1;
  }

  Key.update({ _id: sequenceId }, { $set: updateObject },
    function (err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new AutoKey();
