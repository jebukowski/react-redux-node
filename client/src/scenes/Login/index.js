import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Error, Button } from '../../components';
import * as actions from '../../actions';

const loginStyle = {
  textAlign: 'center',
};

const Login = ({ isLoading, error, username, password, login, credentialsChange }) => {
  const credentialHandler = (e) => {
    const { name, value } = e.target;

    credentialsChange({
      credential: name,
      value,
    });
  };

  const submissionHandler = (e) => {
    e.preventDefault();

    // prevent multiple submissions while pending
    if (isLoading) return;

    login(username, password);
  };

  return (
    <div style={loginStyle}>
      <h1>Login</h1>
      <form onSubmit={submissionHandler}>
        {error && <Error>{error}</Error>}&nbsp;
        <fieldset>
          <label htmlFor="username">
            Username
          </label>&nbsp;
          <input
            type="text"
            id="username"
            name="username"
            placeholder="johndoe"
            onChange={credentialHandler}
            value={username}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">
            Password
          </label>&nbsp;
          <input
            type="password"
            id="password"
            name="password"
            placeholder="myPassword123"
            onChange={credentialHandler}
            value={password}
          />
        </fieldset>
        <fieldset>
          <Button>Login</Button>
        </fieldset>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.session.get('isLoading'),
  error: state.session.get('error'),
  username: state.session.getIn(['credentials', 'username']),
  password: state.session.getIn(['credentials', 'password']),
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(actions.loginRequest(username, password)),
  credentialsChange: credentials => dispatch(actions.credentialsChange(credentials)),
});

Login.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func,
  credentialsChange: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
