
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var scheduleSchema = Schema( {
  name: String,
  time: String,
  link: String,
  days: String,
  userId: ObjectId
} );

module.exports = mongoose.model( 'schedule', scheduleSchema );
