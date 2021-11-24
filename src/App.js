
import './App.css';
import React from 'react';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { createStructuredSelector } from 'reselect';

import { Switch, Route, Redirect } from 'react-router-dom';
import {connect } from 'react-redux';
import { setCurentUser } from './redux/user/user.actions';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {selectCurrentUser } from './redux/user/user.selectors';
import { selectCartItems } from './redux/cart/cart.selectors';

 
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); 

        userRef.onSnapshot( snapShot => {
          setCurentUser({
                id: snapShot.id,
                ...snapShot.data()        
          });
        });
      }
      
      setCurentUser( userAuth );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render = {() => 
              this.props.currentUser ? (
                <Redirect to= '/' /> 
                ) : (
                <SignInAndSignUpPage/>
                )
            }
          />
        </Switch>
        
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  setCurentUser: user => dispatch(setCurentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps )(App);
