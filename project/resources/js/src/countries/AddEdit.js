import {Component} from "react";
import CountryService from "../services/CountryService";

export default class AddEdit extends Component {
    constructor(props) {
        super(props);

        this.isAddMode = !this.props.match.params.id;

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePlan = this.onChangePlan.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: null,
            name: "",
            plan: "",

            alertMessage: "",
            error: false,
            errorMessages: {},
            submitted: false
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.getCountry(this.props.match.params.id);
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

    onChangePlan(e) {
        delete this.state.errorMessages['plan']
        this.setState({
            plan: e.target.value,
            error: !!this.state.errorMessages,
            errorMessage: this.state.errorMessages
        });
    }

    onSubmit() {
        let data = {
            name: this.state.name,
            plan: this.state.plan,
        }

        this.isAddMode ? this.createCountry(data) : this.updateCountry(data);
    }

    createCountry(data) {
        CountryService.create(data)
            .then(response => {
                if (response.data.code === 422) {
                    this.prepareValidationErrors(response.data.errors)
                } else {
                    this.setState({
                        ...this.getCountryFromResponse(response),
                        alertMessage: "Country has been successfully created."
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    updateCountry(data) {
        CountryService.update(this.props.match.params.id, data)
            .then(response => {
                if (response.data.code === 422) {
                    this.prepareValidationErrors(response.data.errors)
                } else {
                    this.setState({
                        ...this.getCountryFromResponse(response),
                        alertMessage: "Country has been successfully updated."
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    getCountry(id) {
        CountryService.get(id)
            .then(response => {
                this.setState({...this.getCountryFromResponse(response)});
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getCountryFromResponse(response) {
        return {
            id: response.data.data.id,
            name: response.data.data.name,
            plan: response.data.data.plan,
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
                    <label>Plan</label>
                    <input type="text" required value={this.state.plan} onChange={this.onChangePlan}
                           name="plan" className={`form-control ${this.state.errorMessages.plan ? 'is-invalid' : ''}`}/>
                    {this.state.errorMessages.plan && this.state.errorMessages.plan.map(
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
