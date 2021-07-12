import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import List from "./List";
import AddEdit from "./AddEdit";

const Countries = ({match}) => {
    const { path } = match;

    return (
        <Router>
            <div className="container mt-3">
                <Switch>
                    <Route exact path={path} component={List} />
                    <Route exact path={`${path}/add`} component={AddEdit} />
                    <Route exact path={`${path}/edit/:id`} component={AddEdit} />
                </Switch>
            </div>
        </Router>
    );
};

export default Countries;
