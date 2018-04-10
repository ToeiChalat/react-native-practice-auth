import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { logedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCHQfgqIPyLkqqA1KXCVa1hJeYWcg0v9O0',
      authDomain: 'react-app-authentication-test.firebaseapp.com',
      databaseURL: 'https://react-app-authentication-test.firebaseio.com',
      projectId: 'react-app-authentication-test',
      storageBucket: 'react-app-authentication-test.appspot.com',
      messagingSenderId: '727048689878'
    });

    firebase.auth().onAuthStateChanged((user) => {
      console.log('trigger');
      if (user) {
        console.log('true');
        this.setState({ loggedIn: true });
      } else {
        console.log('false');
         this.setState({ loggedIn: false });
      }
      console.log(this.state.loggedIn);
    });
  }

  renderContent() {
    console.log('render');
    switch (this.state.loggedIn) {
      case true:
        console.log('render true');
        return (
          <View flexDirection='row'>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        console.log('render false');
        return <LoginForm />;
      default:
        console.log('render default');
        return (
          <View>
            <Spinner size='large' />
          </View>
        );
    }
  }

  render() {
    return (
        <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
        </View>
    );
  }
}

export default App;
