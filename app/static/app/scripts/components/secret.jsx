var React = require('react');

var User = require('../models/user').User;


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
      user: user
    };
  },
  loginUser: function(userData){
    var self = this;
    User.login(userData.username, userData.password, function(user){
      self.setState({user: user});
    });
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
            <AddForm />
          </div>

          <div className="col-md-8">
            <ul className="list-group">
              <li className="list-group-item">Cras justo odio</li>
            </ul>
          </div>
        </div>


      </div>
    );
  }
});


module.exports = {
  IndexContainer: IndexContainer
};