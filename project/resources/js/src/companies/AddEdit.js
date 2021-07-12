import {Component} from "react";
import CompanyService from "../services/CompanyService";
import CountryService from "../services/CountryService";
import Select from 'react-select'

export default class AddEdit extends Component {
    constructor(props) {
        super(props);

        this.isAddMode = !this.props.match.params.id;

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCountryId = this.onChangeCountryId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: null,
            name: "",
            email: "",

            country: {},
            countries: [],

            alertMessage: "",
            error: false,
            errorMessages: {},
            submitted: false
        };

        this.loadCountries();
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.getCompany(this.props.match.params.id);
        }
    }

    onChangeName(e) {
        delete this.state.errorMessages['name']
        this.setState({
            name: e.target.value,
            error: !!this.state.errorMessages,
            errorMessage: this.state.errorMessages
        });
    }

    onChangeEmail(e) {
        delete this.state.errorMessages['email']
        this.setState({
            email: e.target.value,
            error: !!this.state.errorMessages,
            errorMessage: this.state.errorMessages
        });
    }

    onChangeCountryId(selectCountry) {
        delete this.state.errorMessages['country_id']
        this.setState({
            country: selectCountry,
            error: !!this.state.errorMessages,
            errorMessage: this.state.errorMessages
        });
    }

    onSubmit() {
        let data = {
            name: this.state.name,
            email: this.state.email,
            country_id: parseInt(this.state.country.value),
        }

        this.isAddMode ? this.createCompany(data) : this.updateCompany(data);
    }

    createCompany(data) {
        CompanyService.create(data)
            .then(response => {
                if (response.data.code === 422) {
                    this.prepareValidationErrors(response.data.errors)
                } else {
                    this.setState({
                        ...this.getCompanyFromResponse(response),
                        alertMessage: "Company has been successfully created."
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    updateCompany(data) {
        CompanyService.update(this.props.match.params.id, data)
            .then(response => {
                if (response.data.code === 422) {
                    this.prepareValidationErrors(response.data.errors)
                } else {
                    this.setState({
                        ...this.getCompanyFromResponse(response),
                        alertMessage: "Company has been successfully updated."
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    getCompany(id) {
        CompanyService.get(id)
            .then(response => {
                this.setState({...this.getCompanyFromResponse(response)});
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getCompanyFromResponse(response) {
        return {
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            country: {
                value: response.data.data.relations?.country?.id,
                label: response.data.data.relations?.country?.name,
            },
        }
    }

    prepareValidationErrors(errors) {
        let errorMessages = {};

        errors.forEach(function (value) {
            errorMessages[value.field] = value.errors
        });
        this.setState({
            error: true,
            errorMessages: errorMessages,
        })
    }

    loadCountries() {
        CountryService.getAll().then(response => {
            if (response.data?.data) {
                let countries = response.data.data.map(country => {
                    return {value: country.id, label: country.name};
                })

                this.setState({
                    countries: countries,
                })
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.alertMessage &&
                    <div className="alert alert-success" role="alert">
                        {this.state.alertMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <div className="form-group col-5">
                    <label>Name</label>
                    <input type="text" required value={this.state.name}
                           onChange={this.onChangeName} name="name" className={`form-control ${this.state.errorMessages.name ? 'is-invalid' : ''}`}/>
                    {this.state.errorMessages.name && this.state.errorMessages.name.map(
                        error =>
                            <div className="invalid-feedback">
                                {error}
                            </div>
                    )}
                </div>
                <div className="form-group col-5">
                    <label>Email</label>
                    <input type="email" required value={this.state.email} onChange={this.onChangeEmail}
                           name="email" className={`form-control ${this.state.errorMessages.email ? 'is-invalid' : ''}`}/>
                    {this.state.errorMessages.email && this.state.errorMessages.email.map(
                        error =>
                            <div className="invalid-feedback">
                                {error}
                            </div>
                    )}
                </div>
                <div className="form-group col-5">
                    <label htmlFor="country_id">Country</label>
                    <Select options={this.state.countries} value={this.state.country} onChange={(values) => this.onChangeCountryId(values)}
                            className={`${this.state.errorMessages.country_id ? 'is-invalid' : ''}`} required name="name"/>
                    {/*<input type="hidden" className={this.state.errorMessages.country_id ? 'is-invalid' : ''} />*/}
                    {this.state.errorMessages.country_id && this.state.errorMessages.country_id.map(
                        error =>
                            <div className="invalid-feedback">
                                {error}
                            </div>
                    )}
                </div>
                <div className="form-group col-5">
                    <button onClick={this.onSubmit} className={`btn btn-${this.isAddMode ? 'success' : 'primary'}`}>
                        {this.isAddMode ? 'Create' : 'Update'}
                    </button>
                </div>
            </div>
        );
    }
}
