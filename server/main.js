import { Meteor } from 'meteor/meteor';
import '../imports/api/videoDB.js';
import { videoDB1 } from '../imports/api/videoDB.js';
import { videoDB2 } from '../imports/api/videoDB.js';
import { videoDB3 } from '../imports/api/videoDB.js';
var Fiber = require('fibers');

var curtime1 = 0;
var currentVid1 = {};
var lengthCurVid1 = 0;

var curtime2 = 0;
var currentVid2 = {};
var lengthCurVid2 = 0;

var curtime3 = 0;
var currentVid3 = {};
var lengthCurVid3 = 0;

setInterval(function() {
	curtime1 += 1;
	if(curtime1 > lengthCurVid1){
		Fiber(function(){
			currentVid1 = videoDB1.aggregate({$sample: { size: 1 }});
			lengthCurVid1 = currentVid1[0].time;
			curtime1 = 0;
		}).run();
	}
		
}, 1000);

setInterval(function() {
	curtime2 += 1;
	if(curtime2 > lengthCurVid2){
		Fiber(function(){
			currentVid2 = videoDB2.aggregate({$sample: { size: 1 }});
			lengthCurVid2 = currentVid2[0].time;
			curtime2 = 0;
		}).run();
	}
		
}, 1000);

setInterval(function() {
	curtime3 += 1;
	if(curtime3 > lengthCurVid3){
		Fiber(function(){
			currentVid3 = videoDB3.aggregate({$sample: { size: 1 }});
			lengthCurVid3 = currentVid3[0].time;
			curtime3 = 0;
		}).run();
	}
		
}, 1000);

Meteor.methods({
	getVid(channelID){
		switch(channelID){
			case '1':
				return {src: currentVid1[0].src,time: curtime1};
				break;
			case '2':
				return {src: currentVid2[0].src,time: curtime2};
				break;
			case '3':
				return {src: currentVid3[0].src,time: curtime3};		
				break;
		}
	}
});



Meteor.startup(() => {
  // code to run on server at startup
});
