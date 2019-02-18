import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import PostJob from './components/Jobs/PostJob'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import "semantic-ui-css/semantic.min.css";
import firebase from './firebase'
import rootReducer from './reducers'
import { createStore} from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { setUser, clearUser} from './actions'
import Spinner from './Spinner'
const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.setUser(user)
                this.props.history.push('/');
            }else{
                this.props.history.push('/login');
                this.props.clearUser();
            }
        })
    }
    
    render(){

        return this.props.isLoading ? <Spinner /> : (
        <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/Login" component={Login} />
            <Route path="/Signup" component={Register} />
            <Route path="/post" component={PostJob} />

        </Switch>
         </Router>
        )
    }
}

const mapStateFromProps = state =>({
    isLoading: state.user.isLoading 
})

const RootWithAuth = withRouter(connect(mapStateFromProps, {setUser, clearUser})(Root));


ReactDOM.render(
    <Provider store={store}>
<Router>
    <RootWithAuth />
    </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
