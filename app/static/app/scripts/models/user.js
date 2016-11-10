var $ = require('jquery');
var Backbone = require('backbone');

var User = Backbone.Model.extend({

},{
  login: function(username, password, callback){
    var loginUrl = 'obtain_token/';
    $.post(loginUrl, {username: username, password: password}).then(function(result){

      var user = new User();
      user.set('token', result.token);

      localStorage.setItem('user', JSON.stringify(user.toJSON()));

      callback(user);
    });
  }
});

module.exports = {
  User: User
};