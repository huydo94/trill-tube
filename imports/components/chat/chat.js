import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './chat.html';
import { messages1 } from '../../api/messages.js';
import { messages2 } from '../../api/messages.js';
import { messages3 } from '../../api/messages.js';
import { friendships } from '../../api/friendsDB.js';
import { privateMsgs } from '../../api/messages.js';
import { Session } from 'meteor/session'

var currentFriend;
var guest = {
  "background" : "pink",
  "display": "inline-block",
  "float" : "right",
  "clear" : "both"
};
var owner = {
  "background" : "white",
  "display": "inline-block",
  "float" : "left",
  "clear" : "both"
};

class chatCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.subscribe('messages1');
    this.subscribe('messages2');
    this.subscribe('messages3');
    this.subscribe('friendships');
    this.subscribe('privateMsgs');
    this.helpers({
      messages() {
        var currentChannel = Session.get('currentChannel');
        switch(currentChannel){
          case '1':
          return messages1.find({});
          break;
          case '2':
          return messages2.find({});
          break;
          case '3':
          return messages3.find({});
          break;
          default:
          break;
        }
      },

      privatemessages(){
        currentFriend = Session.get('currentFriend');
        return privateMsgs.find({pairs:currentFriend});
      },

      friendships(){
        return friendships.find({});
      }

    });
  }
  selectFriend(friend){
    Session.set('currentFriend',friend);
  }
  addprivateMsg(newPM){
    if (!Meteor.userId()) {
      alert("You need to log in to do this.");
      return;
    }
    if(newPM.trim() == ''){
      return;
    }  
    if(currentFriend){
      Meteor.call('addprivateMsg',newPM,currentFriend);
    }
    this.newPM ='';
  }
  myColor(){
    return Meteor.user().profile.color;
  }

  PMdiv(user){
    if (user == Meteor.user().username){
      return owner;
    }
    return guest;
  }

  addMsg(newMsg) {
    // Insert a task into the collection
    if (!Meteor.userId()) {
      alert("You need to log in to do this.");
      return;
    }
    if(newMsg.trim() == ''){
      return;
    }    
    var currentChannel = Session.get('currentChannel');
    Meteor.call('addMsg',newMsg,currentChannel);
    // Clear form
    this.newMsg = '';
    var msgBox = document.getElementById('msgBox');
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  requestFriend(username){
    if (!Meteor.userId()) {
      alert("You need to log in to do this.");
      return;
    }    
    if(Meteor.user().username == username){
      return;
    }
    if(confirm("Send a friend request to "+username+"?") == true){
      Meteor.call('requestFriend',username);
    }else{
      return;
    }   
  }

  acceptFriend(username){
    Meteor.call('acceptFriend',username);
  }

  denyFriend(username){
    Meteor.call('denyFriend',username);
  }

  removeFriend(username){
    Meteor.call('removeFriend',username);
  }

}
$(function() {

  $(".inputBox").keypress(function (e) {
    if(e.which == 13 && !e.shiftKey) {        
      $('.submit', $(e.target.form)).click();
      e.preventDefault();
      return false;
    }
  });
});



export default angular.module('chat', [
  angularMeteor
  ])
.component('chat', {
  templateUrl: 'imports/components/chat/chat.html',
  controller: ['$scope', chatCtrl]
});