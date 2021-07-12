import {Component} from 'react'
import CompanyService from "../services/CompanyService";
import {Link} from "react-router-dom";

export default class List extends Component{
    constructor(props) {
        super(props);
        this.path = props.match.path;
        this.retrieveCompanies = this.retrieveCompanies.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);

        this.state = {
            companies: [],

            error: false,
            alertMessage: '',
        };
    }

    componentDidMount() {
        this.retrieveCompanies();
    }

    retrieveCompanies() {
        CompanyService.getAll()
            .then(response => {
                this.setState({
                    companies: response.data.data
                });
                console.log(response.data.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCompany(companyId, index) {
        CompanyService.delete(companyId)
            .then(response => {
                delete this.state.companies[index]
                this.setState({
                    error: false,
                    alertMessage: "Company has been successfully deleted."
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
        const {companies, error, alertMessage} = this.state;

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
                <Link to={`${this.path}/add`} className="btn btn-success mb-2">Create Company</Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Country</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies && companies.map((company, index) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.email}</td>
                                <td>{company.relations?.country?.name}</td>
                                <td>
                                    <Link to={`${this.path}/edit/${company.id}`} className="btn btn-sm btn-primary mr-1">
                                        edit
                                    </Link>
                                    <button onClick={() => this.deleteCompany(company.id, index)} className="btn btn-sm btn-danger">
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {companies && !companies.length &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="p-2">No companies to display</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }
};
