import {Component} from 'react'
import CountryService from "../services/CountryService";
import {Link} from "react-router-dom";
import getFormattingWeight from "../common";

export default class List extends Component{
    constructor(props) {
        super(props);
        this.path = props.match.path;
        this.getCountries = this.getCountries.bind(this);
        this.deleteCountry = this.deleteCountry.bind(this);

        this.state = {
            countries: [],

            error: false,
            alertMessage: '',
        };
    }

    componentDidMount() {
        this.getCountries();
    }

    getCountries() {
        CountryService.getAll()
            .then(response => {
                this.setState({
                    countries: response.data.data
                });
                console.log(response.data.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCountry(countryId, index) {
        CountryService.delete(countryId)
            .then(response => {
                delete this.state.countries[index]
                this.setState({
                    error: false,
                    alertMessage: "Country has been successfully deleted."
                });
            })
            .catch(e => {
                this.setState({
                    error: true,
                    alertMessage: e.response.data.errors.shift().errors.shift()
                });
            });
    }

    render () {
        const {countries, error, alertMessage} = this.state;

        return (
            <div>
                {alertMessage &&
                    <div className={`alert alert-${ error ? 'danger' : 'success'}`} role="alert">
                        {alertMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <Link to={`${this.path}/add`} className="btn btn-success mb-2">Create country</Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries && countries.map((country, index) => (
                            <tr key={country.id}>
                                <td>{country.name}</td>
                                <td>{getFormattingWeight(country.plan)}</td>
                                <td>
                                    <Link to={`${this.path}/edit/${country.id}`} className="btn btn-sm btn-primary mr-1">
                                        edit
                                    </Link>
                                    <button onClick={() => this.deleteCountry(country.id, index)} className="btn btn-sm btn-danger">
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {countries && !countries.length &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="p-2">No countries to display</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }
};
