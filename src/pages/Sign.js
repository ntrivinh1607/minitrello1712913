import React from 'react';
import Sign from '../components/Sign';
import { Redirect } from 'react-router-dom';
function Home(props) {
	const {isLogin} = props;
	let username=null;
    if(JSON.parse(localStorage.getItem('login'))) username =JSON.parse(localStorage.getItem('login')).username;
    return username?(<Redirect to='/' />):(<Sign isLogin={isLogin} />)
  }

export default Home;