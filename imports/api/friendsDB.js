import { Mongo } from 'meteor/mongo';

export const friendships = new Mongo.Collection('friendships');

if (Meteor.isServer) {
  // This code only runs on the server
  	Meteor.publish('friendships', function friendshipsPublication() {
  		var user = Meteor.users.findOne(this.userId);
  		if(!user){
  			return;
  		}
  		return friendships.find({user:user.username});
  	});
}