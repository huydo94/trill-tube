import { Meteor } from 'meteor/meteor';
import '../imports/api/videoDB.js';
import { videoDB1 } from '../imports/api/videoDB.js';
import { videoDB2 } from '../imports/api/videoDB.js';
import { videoDB3 } from '../imports/api/videoDB.js';
var Fiber = require('fibers');

var curtime1 = 0;
var currentVid1;
var lengthCurVid1 = 0;
var curidx1 = 0;
var curAllVids1; 

var curtime2 = 0;
var currentVid2;
var lengthCurVid2 = 0;
var curidx2 = 0;
var curAllVids2;

var curtime3 = 0;
var currentVid3;
var lengthCurVid3 = 0;
var curidx3 = 0;
var curAllVids3;

setInterval(function() {
	curtime1 += 1;
	if(curtime1 > lengthCurVid1){

		if(curidx1 >= curAllVids1.length){
			curidx1 = 0;
			Fiber(function(){
				var arr = videoDB1.find({}).fetch();
				curAllVids1 = shuffle(arr);
			}).run();
		}

		currentVid1 = curAllVids1[curidx1];
		lengthCurVid1 = currentVid1.time;
		curtime1 = 0;
		curidx1++;
		
	}
}, 1000);

setInterval(function() {
	curtime2 += 1;
	if(curtime2 > lengthCurVid2){

		if(curidx2 >= curAllVids2.length){
			curidx2 = 0;
			Fiber(function(){
				var arr = videoDB2.find({}).fetch();
				curAllVids2 = shuffle(arr);
			}).run();
		}

		currentVid2 = curAllVids2[curidx2];
		lengthCurVid2 = currentVid2.time;
		curtime2 = 0;
		curidx2++;
		
	}
}, 1000);

setInterval(function() {
	curtime3 += 1;
	if(curtime3 > lengthCurVid3){

		if(curidx3 >= curAllVids3.length){
			curidx3 = 0;
			Fiber(function(){
				var arr = videoDB3.find({}).fetch();
				curAllVids3 = shuffle(arr);
			}).run();
		}

		currentVid3 = curAllVids3[curidx3];
		lengthCurVid3 = currentVid3.time;
		curtime3 = 0;
		curidx3++;
		
	}
}, 1000);

Meteor.methods({
	getVid(channelID){
		switch(channelID){
			case '1':
			return {src: currentVid1.src,time: curtime1};
			case '2':
			return {src: currentVid2.src,time: curtime2};
			case '3':
			return {src: currentVid3.src,time: curtime3};		
		}
	},
	nextVid(channelID){
		switch(channelID){
			case '1':
			lengthCurVid1 = 0;
			break;
			case '2':
			lengthCurVid2 = 0;
			break;
			case '3':
			lengthCurVid3 = 0;	
			break;
		}
	}
}); 

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
 function shuffle(a) {
 	for (let i = a.length - 1; i > 0; i--) {
 		const j = Math.floor(Math.random() * (i + 1));
 		[a[i], a[j]] = [a[j], a[i]];
 	}
 	return a;
 }

 function getAllVids(channelID){
 	switch(channelID){
 		case 1:
 		Fiber(function(){
 			var arr = videoDB1.find({}).fetch();
 			curAllVids1 = shuffle(arr);
 			currentVid1 = curAllVids1[curidx1];		
 			lengthCurVid1 = currentVid1.time;
 			curidx1++;
 		}).run();
 		break;
 		case 2:
 		Fiber(function(){
 			var arr = videoDB2.find({}).fetch();
 			curAllVids2 = shuffle(arr);
 			currentVid2 = curAllVids2[curidx2];		
 			lengthCurVid2 = currentVid2.time;
 			curidx2++;
 		}).run();
 		break;
 		case 3:
 		Fiber(function(){
 			var arr = videoDB3.find({}).fetch();
 			curAllVids3 = shuffle(arr);
 			currentVid3 = curAllVids3[curidx3];		
 			lengthCurVid3 = currentVid3.time;
 			curidx3++;
 		}).run();
 		break;
 	}
 }


 Meteor.startup(() => {
  // code to run on server at startup
  getAllVids(1);
  getAllVids(2);
  getAllVids(3);
});
