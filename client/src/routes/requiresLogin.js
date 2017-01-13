import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function requiresLogin(WrappedComponent) {
  class AuthenticatedComponent extends Component {
    constructor(props) {
      super(props);
      this.checkAndRedirect = this.checkAndRedirect.bind(this);
    }

    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    checkAndRedirect() {
      if (!this.props.isLoggedIn) browserHistory.push('/login');
    }

    render() {
      return (
        this.props.isLoggedIn ? <WrappedComponent {...this.props} /> : null
      );
    }
  }

  const mapStateToProps = state => ({
    isLoggedIn: state.session.get('isLoggedIn'),
  });

  AuthenticatedComponent.propTypes = {
    isLoggedIn: PropTypes.bool,
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
