import { Mongo } from 'meteor/mongo';
 
export const likes = new Mongo.Collection('likes');
export const dislikes = new Mongo.Collection('dislikes');