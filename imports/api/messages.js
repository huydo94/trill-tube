import { Mongo } from 'meteor/mongo';
 
export const messages1 = new Mongo.Collection('messages1',{ capped: true, size: 100000 });
export const messages2 = new Mongo.Collection('messages2',{ capped: true, size: 100000 });
export const messages3 = new Mongo.Collection('messages3',{ capped: true, size: 100000 });
export const privateMsgs = new Mongo.Collection('privateMsgs');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages1', function messages1Publication() {
    return messages1.find();
  });
  Meteor.publish('messages2', function messages2Publication() {
    return messages2.find();
  });
  Meteor.publish('messages3', function messages3Publication() {
    return messages3.find();
  });
  Meteor.publish('privateMsgs', function pmsPublication() {
      var user = Meteor.users.findOne(this.userId);
      if(!user){
        return;
      }
      return privateMsgs.find({pairs:user.username});
    });
}
