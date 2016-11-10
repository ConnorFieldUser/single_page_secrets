var Backbone = require('backbone');

var User = Backbone.Model.extend({

},{
  login: function(username, password){
    var loginUrl = '';
    $.post(loginUrl, {username: username, password: password}).then(function(result){
      console.log(result);

    });
  }
});

module.exports = {
  User: User
};