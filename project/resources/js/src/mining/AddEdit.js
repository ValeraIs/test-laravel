import {Component} from "react";
import Select from 'react-select'
import CompanyService from "../services/CompanyService";
import MiningService from "../services/MiningService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddEdit extends Component {
    constructor(props) {
        super(props);

        this.isAddMode = !this.props.match.params.id;

        this.onChangeMined = this.onChangeMined.bind(this);
        this.onChangeDateMined = this.onChangeDateMined.bind(this);
        this.onChangeCompanyId = this.onChangeCompanyId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: null,
            mined: "",
            date_mined: "",

            company: {},
            companies: [],

            alertMessage: "",
            error: false,
            errorMessages: {},
            submitted: false
        };

        this.loadCompanies();
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.getMining(this.props.match.params.id);
        }
    }

    onChangeMined(e) {
        delete this.state.errorMessages['mined']
        this.setState({
            mined: e.target.value,
            error: !!this.state.errorMessages,
            errorMessage: this.state.errorMessages
        });
    }

    onChangeDateMined(date) {
        delete this.state.errorMessages['date_mined']
        this.setState({
            date_mined: new Date(date),
            error: !!this.state.errorMessages,
            errorMessage: this.state.errorMessages
        });
    }

    onChangeCompanyId(selectCompany) {
        delete this.state.errorMessages['company_id']
        this.setState({
            company: selectCompany,
            error: !!this.state.errorMessages,
            errorMessage: this.state.errorMessages
        });
    }

    onSubmit() {
        let data = {
            mined: this.state.mined,
            date_mined: this.state.date_mined.toISOString().split('T')[0],
            company_id: parseInt(this.state.company.value),
        }

        this.isAddMode ? this.createMining(data) : this.updateMining(data);
    }

    createMining(data) {
        MiningService.create(data)
            .then(response => {
                if (response.data.code === 422) {
                    this.prepareValidationErrors(response.data.errors)
                } else {
                    this.setState({
                        ...this.getMiningFromResponse(response),
                        alertMessage: "Mining has been successfully created."
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    updateMining(data) {
        MiningService.update(this.props.match.params.id, data)
            .then(response => {
                if (response.data.code === 422) {
                    this.prepareValidationErrors(response.data.errors)
                } else {
                    this.setState({
                        ...this.getMiningFromResponse(response),
                        alertMessage: "Mining has been successfully updated."
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    getMining(id) {
        MiningService.get(id)
            .then(response => {
                this.setState({...this.getMiningFromResponse(response)});
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getMiningFromResponse(response) {
        return {
            mined: response.data.data.mined,
            date_mined: new Date(response.data.data.date_mined),
            company: {
                value: response.data.data.relations?.company?.id,
                label: response.data.data.relations?.company?.name,
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

    loadCompanies() {
        CompanyService.getAll().then(response => {
            if (response.data?.data) {
                let companies = response.data.data.map(company => {
                    return {value: company.id, label: company.name};
                })

                this.setState({
                    companies: companies,
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
                    <label htmlFor="country_id">Company</label>
                    <Select options={this.state.companies} value={this.state.company} onChange={(values) => this.onChangeCompanyId(values)}
                            className={`${this.state.errorMessages.company_id ? 'is-invalid' : ''}`} required name="name"/>
                    {this.state.errorMessages.company_id && this.state.errorMessages.company_id.map(
                        error =>
                            <div className="invalid-feedback">
                                {error}
                            </div>
                    )}
                </div>

                <div className="form-group col-5">
                    <label>Mined</label>
                    <input type="text" required value={this.state.mined}
                           onChange={this.onChangeMined} name="name" className={`form-control ${this.state.errorMessages.mined ? 'is-invalid' : ''}`}/>
                    {this.state.errorMessages.mined && this.state.errorMessages.mined.map(
                        error =>
                            <div className="invalid-feedback">
                                {error}
                            </div>
                    )}
                </div>
                <div className="form-group col-5">
                    <label>Date mined</label>
                    <DatePicker
                        dateFormat="y-MM-dd"
                        onChange={value => this.onChangeDateMined(value)} selected={this.state.date_mined}
                        className={`form-control ${this.state.errorMessages.date_mined ? 'is-invalid' : ''}`}/>
                    {this.state.errorMessages.date_mined && this.state.errorMessages.date_mined.map(
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
