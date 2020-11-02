import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Sign from './pages/Sign';
import Home from './pages/Home';
import About from './pages/About';
import {BrowserRouter as Router,  Switch,  Route} from "react-router-dom";

ReactDOM.render(

  <React.StrictMode>
    <Router>
		<div>	
			<Switch>
				<Route exact path="/">
					<Sign isLogin = {true}/>
				</Route>
				<Route exact path="/signin">
					<Sign isLogin = {true}/>
				</Route>
				<Route exact path="/signup">
					<Sign isLogin = {false}/>
				</Route>
				<Route path="/home">
					<Home />
				</Route>
				<Route path="/:id">
					<About />
				</Route>
			</Switch>
		</div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);