'use strict';

export default {
  actionName: 'GetContacts',

  onRequest() {
    console.log('ActionName: ', this.actionName, ' OnRequest: ', params);
  }

  onExecute(params) {
    console.log('ActionName: ', this.actionName, ' OnExecute: ', params);
  }

  onResponse() {
    console.log('ActionName: ', this.actionName, ' OnResponse: ', params);
  }
}
