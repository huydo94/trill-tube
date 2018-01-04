import { Meteor } from 'meteor/meteor';
import '../imports/api/friendsDB.js';
import { friendships } from '../imports/api/friendsDB.js';

Meteor.methods({
	requestFriend(username){
		var currentUser = Meteor.user().username;
		var alreadyadded = friendships.find({user:currentUser,friends:username},{limit:1}).count();
		var alreadyrequested = friendships.find({user:username,requests:currentUser},{limit:1}).count();

		if(alreadyadded+alreadyrequested > 0){
			return;
		}
		friendships.update({user:username},{$push:{requests:currentUser}},{upsert:true});
	},

	acceptFriend(username){
		var currentUser = Meteor.user().username;
		friendships.update({user:username},{$push:{friends:currentUser}},{upsert:true});		
		friendships.update({user:currentUser},{$push:{friends:username}},{upsert:true});
		friendships.update({user:currentUser},{$pull:{requests:username}});	

	},
	denyFriend(username){
		var currentUser = Meteor.user().username;
		friendships.update({user:currentUser},{$pull:{requests:username}});	
	},

	removeFriend(username){
		var currentUser = Meteor.user().username;
		friendships.update({user:currentUser},{$pull:{friends:username}});
		friendships.update({user:username},{$pull:{friends:currentUser}});			
	}



});