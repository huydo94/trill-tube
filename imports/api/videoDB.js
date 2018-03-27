import { Mongo } from 'meteor/mongo';
 
export const videoDB1 = new Mongo.Collection('videoDB1');
export const videoDB2 = new Mongo.Collection('videoDB2');
export const videoDB3 = new Mongo.Collection('videoDB3');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('videoDB1', function videoDB1Publication() {
    return videoDB1.find();
  });
  Meteor.publish('videoDB2', function videoDB2Publication() {
    return videoDB2.find();
  });
  Meteor.publish('videoDB3', function videoDB3Publication() {
    return videoDB3.find();
  });
}