import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Album from './components/Album';
import Home from './pages/Home';
import About from './pages/About';
import {
  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";

ReactDOM.render(

  <React.StrictMode>
    <Router>
		<div>
			<Album/>	
			<Switch>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);