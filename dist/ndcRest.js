"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _ndcConfigs=require("./ndcConfigs"),_ndcConfigs2=_interopRequireDefault(_ndcConfigs),ndcRest=function(e){var n=e.path,t=e.app;return(0,_ndcConfigs2["default"])(n).then(function(e){return Object.keys(e.routes).map(function(n){return e.routes[n]}).forEach(function(n){var r=n.verb,u=n.path,o=n.exec;t[r](u,function(n,r,u){var c={app:t,req:n,res:r,config:e,exec:o};e.actions.execute(c).then(u)})}),t})};exports["default"]=ndcRest;