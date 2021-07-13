import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Nav from './components/Nav'
import Companies from "./companies/Companies";
import Home from "./home";
import Countries from "./countries/Countries";
import Leader from "./leader/Leader";
import Mining from "./mining/Mining";

const App = () => {
    return (
        <Router>
            <Nav />
            <div className="container mt-3">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/companies" component={Companies} />
                    <Route exact path="/countries" component={Countries} />
                    <Route exact path="/leader" component={Leader} />
                    <Route exact path="/mining" component={Mining} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('app'))
