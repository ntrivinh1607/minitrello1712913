import React from 'react';
import './index.css';

import Signout from './pages/Signout';
import Sign from './pages/Sign';
import Home from './pages/Home';
import About from './pages/About';
import {BrowserRouter as Router,  Switch,  Route} from "react-router-dom";

function App() {
	// let username=null;
	// let gottaToken=null;
	// if(JSON.parse(localStorage.getItem('login'))){
	// 	gottaToken = JSON.parse(localStorage.getItem('login')).token;
	// 	username = JSON.parse(localStorage.getItem('login')).username;
	// };
    
	return(
	    <Router>
			<div>	
				<Switch>
					<Route path="/signin">
						<Sign isLogin = {true}/>
					</Route>
					<Route path="/signup">
						<Sign isLogin = {false}/>
					</Route>
					<Route path="/home">
						<Home/>
					</Route>
					<Route path="/item/:id">
						<About/>
					</Route>
					<Route path="/signout">
						<Signout/>
					</Route>
					<Route exact path="/">
						<Home/>
					</Route>
				</Switch>
			</div>
	    </Router>
)};
export default App;