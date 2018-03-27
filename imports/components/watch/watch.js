import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './watch.html';
import { Session } from 'meteor/session';

var currentVid;
var currentChannel;
var player;
var tvOn = false;
var curview = 1;
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
    showTV(){
        if(curview == 1){
            $("#channel").css('visibility','hidden');
            player.pauseVideo();
        }else{
            $("#channel").css('visibility','visible');
            synchronize();
        }
        curview = 1 - curview;
    }

    nextVid(){
        var psw =prompt("Please enter a psw:");
        if (psw== "next") {
            Meteor.call('nextVid',currentChannel);
            player.stopVideo();
        } else {
            return;
        }
        
    }

    turnOnChannel(channelID) {
        currentChannel = channelID;
        switch(channelID){
            case '1':
            $(".channelbtn")[0].style.background = 'green';
            $(".channelbtn")[1].style.background = 'black';
            $(".channelbtn")[2].style.background = 'black';
            break;
            case '2':
            $(".channelbtn")[0].style.background = 'black';
            $(".channelbtn")[1].style.background = 'yellow';
            $(".channelbtn")[2].style.background = 'black';
            break;
            case '3':
            $(".channelbtn")[0].style.background = 'black';
            $(".channelbtn")[1].style.background = 'black';
            $(".channelbtn")[2].style.background = 'red';
            break;
        }
        Session.set('currentChannel',currentChannel);
        synchronize();
    }
    synchronize() {
        synchronize();
    }
}

function synchronize(){
    Meteor.call("getVid", currentChannel, function(error, result) {
        currentVid = result;
        player.loadVideoById(currentVid.src, 0, "default");
        player.seekTo(currentVid.time, true);
    });
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

$(function() {
    if(tvOn){
        return;
    }
    tvOn = true;
    currentChannel = '1';
    $(".channelbtn")[0].style.background = 'green';
    Session.set('currentChannel',currentChannel);
    var width = $(window).width() /100 * 73;
    var height = $(window).height() - 50;

    Meteor.call("getVid", '1', function(error, result) {
        currentVid = result;
        if (Meteor.isClient) {
            onYouTubeIframeAPIReady = function() {
                player = new YT.Player("channel", {
                        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
                        width: width,
                        height:height,
                        videoId: currentVid.src,
                        playerVars: {
                            controls: 1,
                            disablekb: 1,
                            rel : 0
                        },
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

    $("#theremote").draggable();
});

export default angular.module('watch', [
    angularMeteor
    ]).component('watch', {
        templateUrl: 'imports/components/watch/watch.html',
        controller: ['$scope', watchCtrl]
    });