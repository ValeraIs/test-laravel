import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import List from "./List";

const Leader = ({match}) => {
    const { path } = match;

    return (
        <Router>
            <div className="container mt-3">
                <Switch>
                    <Route exact path={path} component={List} />
                </Switch>
            </div>
        </Router>
    );
};

export default Leader;
