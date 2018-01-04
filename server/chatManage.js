import { Meteor } from 'meteor/meteor';
import '../imports/api/messages.js';
import { messages1 } from '../imports/api/messages.js';
import { messages2 } from '../imports/api/messages.js';
import { messages3 } from '../imports/api/messages.js';
import { privateMsgs } from '../imports/api/messages.js';

import { check } from 'meteor/check';

var chatColors = ['red','green','blue','yellow','orange','purple','cyan','magenta','lime','pink','teal','lavender','brown','maroon','navy'];

Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.color = chatColors[Math.floor(Math.random()*chatColors.length)];
   // Returns the user object
   return user;
});

Meteor.methods({
	addMsg(newMsg,currentChannel){
		check(newMsg, String);
		newMsg = Emojis.parse(newMsg);
		switch(currentChannel){
			case '1':
			messages1.insert({
				color:Meteor.user().profile.color,
				text:newMsg,
				user: Meteor.user().username,
			});
			break;
			case '2':
			messages2.insert({
				color:Meteor.user().profile.color,
				text:newMsg,
				user: Meteor.user().username,
			});
			break;
			case '3':
			messages3.insert({
				color:Meteor.user().profile.color,
				text:newMsg,
				user: Meteor.user().username,
			});
			break;
			default:
			break;
		}

	},

	addprivateMsg(newMsg,receiver){

		check(newMsg,String);
		var sender = Meteor.user().username;
		var pairexisted = privateMsgs.find({pairs:{$all:[sender,receiver]}},{limit:1}).count();
		if(pairexisted == 0){
			privateMsgs.insert({pairs:[sender,receiver],messages:[]});
		}
		privateMsgs.update(
			{pairs:{$all:[sender,receiver]}},
			{$push:{messages:{text:newMsg,sender:sender}}}
		);
	}


});
