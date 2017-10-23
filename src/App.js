import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

const mapStateToProps = state => ({
  redirectTo: state.common.redirectTo,
  loggedIn: state.common.token,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch({ type: 'LOAD' }),
  onRedirect: () => dispatch({ type: 'REDIRECT' }),
  doLogout: () => dispatch({ type: 'LOGOUT' }),
});

class App extends Component {

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#/">Editable Profile</a>
              </Navbar.Brand>
            </Navbar.Header>
            {this.props.loggedIn ? (
              <Nav>
                <NavItem eventKey={1} href="#/profile">Edit profile</NavItem>
                <NavItem eventKey={2} onClick={this.props.doLogout}>Log out</NavItem>
              </Nav>
            ) : (
                <Nav>
                  <NavItem eventKey={1} href="#/signin">Sign in</NavItem>
                  <NavItem eventKey={2} href="#/signup">Sign up</NavItem>
                </Nav>
              )}
          </Navbar>
        </header>
        <div className="container" style={{ maxWidth: '600px' }}>
          {this.props.children}
        </div>
        <footer></footer>
        <ToastContainer 
          position="bottom-center"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);