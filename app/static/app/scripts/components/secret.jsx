var React = require('react');

var User = require('../models/user').User;
var SecretCollection = require('../models/secret').SecretCollection;


var LoginForm = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
    }
  },
  handleUsernameChange: function(e){
    this.setState({username: e.target.value});
  },
  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.loginUser(this.state);
    this.setState({username: '', password: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input onChange={this.handleUsernameChange} value={this.state.username} type="text" className="form-control" id="username" placeholder="Username Here" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.handlePasswordChange} value={this.state.password} type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default">Login</button>
      </form>
    );
  }
});

var SecretList = React.createClass({
  render: function(){
    var secretHtml = this.props.secretCollection.map(function(secret){
      return <li key={secret.cid} className="list-group-item">{secret.get('body')}</li>
    });

    return (
      <ul className="list-group">
        {secretHtml}
      </ul>
    )
  }
});

var AddForm = React.createClass({
  getInitialState: function(){
    return {
      secret: ''
    };
  },
  handleSecretChange: function(e){
    this.setState({secret: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();

    this.props.addSecret(this.state);

    this.setState({secret: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="secret">Secret</label>
          <input onChange={this.handleSecretChange} value={this.state.secret} type="text" className="form-control" id="secret" placeholder="Shhhhhh" />
        </div>

        <button type="submit" className="btn btn-default">Login</button>
      </form>
    );
  }
});

var IndexContainer = React.createClass({
  getInitialState: function(){
    var user = new User();
    var userData = localStorage.getItem('user');

    // If the user is logged in, set their user model
    if(userData){
      user.set(JSON.parse(userData));
      user.auth();
    }

    return {
      user: user,
      secretCollection: new SecretCollection()
    };
  },
  componentWillMount: function(){
    this.state.secretCollection.fetch().then(() => {
      this.setState({secretCollection: this.state.secretCollection});
    });
  },
  loginUser: function(userData){
    var self = this;
    User.login(userData.username, userData.password, function(user){
      self.setState({user: user});
    });
  },
  addSecret: function(secretData){
    var secretCollection = this.state.secretCollection;

    secretCollection.create({body: secretData.secret});

    this.setState({secretCollection: secretCollection});
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Secrets App {this.state.user.get('token') ? 'Logged In' : ''}</h1>

            <LoginForm loginUser={this.loginUser}/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <AddForm addSecret={this.addSecret}/>
          </div>

          <div className="col-md-8">
            <SecretList secretCollection={this.state.secretCollection}/>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = {
  IndexContainer: IndexContainer
};