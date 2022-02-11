const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId

const relationObject = {
  RelationId: objectId,
  linkToId: { type: Schema.Types.ObjectId, ref: 'User' },
  linkFromId: { type: Schema.Types.ObjectId, ref: 'User' }
}

const RelationSchema = new Schema(relationObject);

const RelationModel = mongoose.model('Relation', RelationSchema)

module.exports = {
  RelationModel
}