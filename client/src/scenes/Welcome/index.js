import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Info, Button } from '../../components';
import * as actions from '../../actions';

const welcomeStyle = {
  textAlign: 'center',
};

const Welcome = ({ username, id, nodeVersion, appPath, dateAndTime, logout }) => (
  <div style={welcomeStyle}>
    <h1>Welcome!</h1>
    <Info
      username={username}
      id={id}
      nodeVersion={nodeVersion}
      appPath={appPath}
      dateAndTime={dateAndTime}
    />&nbsp;
    <Button clickHandler={logout}>Logout</Button>
  </div>
);

const mapStateToProps = state => ({
  username: state.session.getIn(['currentUser', 'username']),
  id: state.session.getIn(['currentUser', 'id']),
  nodeVersion: state.details.get('nodeVersion'),
  appPath: state.details.get('appPath'),
  dateAndTime: state.details.get('dateAndTime'),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logoutRequest()),
});

Welcome.propTypes = {
  username: PropTypes.string,
  id: PropTypes.string,
  nodeVersion: PropTypes.string,
  appPath: PropTypes.string,
  dateAndTime: PropTypes.string,
  logout: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
