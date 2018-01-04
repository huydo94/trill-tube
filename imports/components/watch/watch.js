import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './watch.html';
import { Session } from 'meteor/session';

var currentVid;
var currentChannel;
var player;
var tvOn = false;
class watchCtrl {
    constructor($scope) {
        $scope.viewModel(this);
        this.helpers({});
    }
    like(){        
        Meteor.call('likeVid',currentChannel,currentVid);
    }
    dislike(){
        Meteor.call('dislikeVid',currentChannel,currentVid);
    }
    showManageVid() {
        if (!Meteor.userId()) {
            return false;
        }
        if (Meteor.user().username == 'huydo') {
            return true;
        } else {
            return false;
        }
    }
    addVid() {
        Meteor.call('addVid',this.type,this.src,this.min,this.sec,this.title);
        this.title = '';
        this.src = '';
        this.min = '';
        this.sec = '';
        this.type = '';
    }
    turnOnTV() {
        if(tvOn){
            return;
        }
        tvOn = true;
        currentChannel = '1';
        Session.set('currentChannel',currentChannel);
        Meteor.call("getVid", '1', function(error, result) {
            currentVid = result;
            if (Meteor.isClient) {
                onYouTubeIframeAPIReady = function() {
                    player = new YT.Player("channel", {
                        height: "500",
                        width: "890",
                        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
                        videoId: currentVid.src,
                        // Events like ready, state change, 
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                };
                YT.load();
            }
        });
    }
    turnOnChannel(channelID) {
        currentChannel = channelID;
        Session.set('currentChannel',currentChannel);
        Meteor.call("getVid", currentChannel, function(error, result) {
            currentVid = result;
            player.loadVideoById(currentVid.src, 0, "default");
            player.seekTo(currentVid.time, true);
        });
    }
    synchronize() {
        Meteor.call("getVid", currentChannel, function(error, result) {
            currentVid = result;
            player.loadVideoById(currentVid.src, 0, "default");
            player.seekTo(currentVid.time, true);
        });
    }
}

function onPlayerStateChange(event) {
    if (event.data == 0) {
        Meteor.call("getVid", currentChannel, function(error, result) {
            currentVid = result;
            event.target.loadVideoById(currentVid.src, 0, "default");
        });
    }
}

function onPlayerReady(event) {
    event.target.seekTo(currentVid.time, true);
}

export default angular.module('watch', [
    angularMeteor
]).component('watch', {
    templateUrl: 'imports/components/watch/watch.html',
    controller: ['$scope', watchCtrl]
});