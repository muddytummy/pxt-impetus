var impetus,__extends=this&&this.__extends||function(){var i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();!function(t){var e=function(o){function t(t,e,n){var i=o.call(this,t,n)||this;return i.isFieldCustom_=!0,i}return __extends(t,o),t}(Blockly.FieldTextInput);t.FieldKey=e}(impetus||(impetus={})),function(n){n.initFieldExtensionsAsync=function(t){var e={fieldEditors:[{editor:n.FieldKey,selector:"key"}]};return Promise.resolve(e)}}(impetus||(impetus={})),pxt.editor.initFieldExtensionsAsync=impetus.initFieldExtensionsAsync;