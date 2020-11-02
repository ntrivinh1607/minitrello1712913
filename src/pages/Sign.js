import React from 'react';
import Sign from '../components/Sign';

function Home(props) {
	const {isLogin} = props;
    return (<Sign isLogin={isLogin}/>)
  }

export default Home;