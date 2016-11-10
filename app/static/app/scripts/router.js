var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var IndexContainer = require('./components/secret.jsx').IndexContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(IndexContainer),
      document.getElementById('app')
    )
  }
});

var router = new AppRouter();

module.exports = router;