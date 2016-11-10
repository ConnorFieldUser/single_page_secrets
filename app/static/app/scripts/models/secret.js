var Backbone = require('backbone');

var Secret = Backbone.Model.extend({

});

var SecretCollection = Backbone.Collection.extend({
  url: 'secrets/',
  model: Secret
});

module.exports = {
  Secret: Secret,
  SecretCollection: SecretCollection
};