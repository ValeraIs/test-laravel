import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>  {
    return (
        <div>
            <h1>Company management</h1>
            <p><Link to="companies">&gt;&gt; Show all company</Link></p>
        </div>
    );
}

export default Home;
