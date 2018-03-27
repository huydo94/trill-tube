import { Meteor } from 'meteor/meteor';
import '../imports/api/videoDB.js';
import { videoDB1 } from '../imports/api/videoDB.js';
import { videoDB2 } from '../imports/api/videoDB.js';
import { videoDB3 } from '../imports/api/videoDB.js';

import {parse,toSeconds} from 'iso8601-duration';
var Fiber = require('fibers');

YoutubeApi.authenticate({
	type: 'key',
	key: 'AIzaSyB2jJKeXzATYjACSJuCju5Chx5B4tmrI3k'
});

//channel 1

setInterval(function() {
	YoutubeApi.playlistItems.list({
		'part': 'contentDetails',
		'maxResults':50,
		'playlistId': 'PLXD8bU8RQ6pImoiBojoKcYcxcltCNkwcc'
	}, function (err, data) {
		Fiber(function(){
			videoDB1.remove({});
		}).run();
		for (var i = data.items.length - 1; i >= 0; i--) {
			var thisid = data.items[i].contentDetails.videoId;
			YoutubeApi.videos.list({
				'part':'contentDetails',
				'id': thisid
			},function(err,data){
				var durationStr = data.items[0].contentDetails.duration;
				var duration = Math.round(toSeconds(parse(durationStr)));
				if(duration == 0){
					duration = 2147483647;
				}
				var id = (data.items[0].id);
				Fiber(function(){
					Meteor.call('addVid',1,id,duration);
				}).run();

			});
		}
	});
},10000);

//channel 2

setInterval(function() {
	YoutubeApi.playlistItems.list({
		'part': 'contentDetails',
		'maxResults':50,
		'playlistId': 'PLXD8bU8RQ6pJ4fN1Wff2g6FxH5VzpnLfs'
	}, function (err, data) {
		Fiber(function(){
			videoDB2.remove({});
		}).run();
		for (var i = data.items.length - 1; i >= 0; i--) {
			var thisid = data.items[i].contentDetails.videoId;
			YoutubeApi.videos.list({
				'part':'contentDetails',
				'id': thisid
			},function(err,data){
				var durationStr = data.items[0].contentDetails.duration;
				var duration = Math.round(toSeconds(parse(durationStr)));
				var id = (data.items[0].id);
				Fiber(function(){
					Meteor.call('addVid',2,id,duration);
				}).run();

			});
		}
	});
} ,300000);

//channel 3

setInterval(function() {
	YoutubeApi.playlistItems.list({
		'part': 'contentDetails',
		'maxResults':50,
		'playlistId': 'PLXD8bU8RQ6pIQQfGyTzjUCrzS5FIxWMTq'
	}, function (err, data) {
		Fiber(function(){
			videoDB3.remove({});
		}).run();
		for (var i = data.items.length - 1; i >= 0; i--) {
			var thisid = data.items[i].contentDetails.videoId;
			YoutubeApi.videos.list({
				'part':'contentDetails',
				'id': thisid
			},function(err,data){
				var durationStr = data.items[0].contentDetails.duration;
				var duration = Math.round(toSeconds(parse(durationStr)));
				var id = (data.items[0].id);
				Fiber(function(){
					Meteor.call('addVid',3,id,duration);
				}).run();

			});
		}
	});

} ,300000);

Meteor.startup(() =>{
	YoutubeApi.playlistItems.list({
		'part': 'contentDetails',
		'maxResults':50,
		'playlistId': 'PLXD8bU8RQ6pImoiBojoKcYcxcltCNkwcc'
	}, function (err, data) {
		Fiber(function(){
			videoDB1.remove({});
		}).run();
		for (var i = data.items.length - 1; i >= 0; i--) {
			var thisid = data.items[i].contentDetails.videoId;
			YoutubeApi.videos.list({
				'part':'contentDetails',
				'id': thisid
			},function(err,data){
				var durationStr = data.items[0].contentDetails.duration;
				var duration = Math.round(toSeconds(parse(durationStr)));
				if(duration == 0){
					duration = 2147483647;
				}
				var id = (data.items[0].id);
				Fiber(function(){
					Meteor.call('addVid',1,id,duration);
				}).run();

			});
		}
	});
});
