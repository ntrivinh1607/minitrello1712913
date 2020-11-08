import React from 'react';
import Cards from '../components/Cards';
import TopBar from '../components/TopBar';
import {useParams} from "react-router-dom";
	function About() {
		let username=null;
      	if(JSON.parse(localStorage.getItem('login'))) username =JSON.parse(localStorage.getItem('login')).username;
		const { id } = useParams();
		return (<div><TopBar username={username}/><Cards id={id}/></div>);
	}

export default About;