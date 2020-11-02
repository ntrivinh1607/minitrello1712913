import React from 'react';
import Cards from '../components/Cards';
import {useParams} from "react-router-dom";
	function About() {
		const { id } = useParams();
		return <Cards id={id}/>;
	}

export default About;