import React from 'react';
import Album from '../components/Album';
import TopBar from '../components/TopBar';
function Home() {
	let username=null;
    if(JSON.parse(localStorage.getItem('login'))) username =JSON.parse(localStorage.getItem('login')).username;
	  return (<div><TopBar username={username}/><Album/></div>);
	}

export default Home;