'use strict';

export default {
  actionName: 'GetContacts',

  execute(params) {
    console.log('ActionName: ', this.actionName, ' OnExecute: ', params);
  }
}
