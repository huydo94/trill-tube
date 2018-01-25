import angular from 'angular';
import angularMeteor from 'angular-meteor';
import watch from '../imports/components/watch/watch';
import chat  from '../imports/components/chat/chat';
import collab from '../imports/components/collab/collab';
import '../imports/startup/accounts-config.js';

angular.module('trilltv', [
  angularMeteor,
  watch.name,
  chat.name,
  collab.name,
  'accounts.ui'
]);
