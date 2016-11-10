var Backbone = require('backbone');


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    console.log('Index loaded');
  }
});

var router = new AppRouter();

module.exports = router;