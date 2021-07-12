import {Component} from 'react'
import ReportService from "../services/ReportService";
import DatePicker from "react-datepicker";
import getFormattingWeight from "../common";
import 'react-datepicker/dist/react-datepicker.css'

export default class List extends Component{
    constructor(props) {
        super(props);
        this.path = props.match.path;
        this.generateData = this.generateData.bind(this);
        this.onChangeDateReport = this.onChangeDateReport.bind(this);
        this.loadCountries = this.loadCountries.bind(this);

        this.state = {
            date_mined: "",
            alertMessage: "",

            countries: [],
            errorMessages: [],
            error: false
        };
    }

    onChangeDateReport(date) {
        delete this.state.errorMessages['date_mined'];

        this.setState({
            date_mined: new Date(date),
            error: !!this.state.errorMessages,
            errorMessage: this.state.errorMessages
        });
    }

    loadCountries() {
        let data = {};
        if (this.state.date_mined) {
            data = {
                date_mined: this.state.date_mined.getFullYear() + '-' + ('0' + (this.state.date_mined.getMonth() + 1)).slice(-2),
            }
        }

        ReportService.getAllByMonth(data)
            .then(response => {
                if (response.data.code === 422) {
                    this.prepareValidationErrors(response.data.errors)
                } else {
                    this.setState({
                        countries: response.data.data,
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    generateData() {
        ReportService.generateData()
            .then(response => {
                console.log('test');
                this.setState({
                    alertMessage: 'The data generation job has been started. It can take a long time.',
                });
            })
            .catch(e => {
                console.log(e);
            });
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

    render () {
        const {countries} = this.state;

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
                    <label>Date mined</label>
                    <DatePicker
                        dateFormat="y-MM"
                        showMonthYearPicker
                        onChange={value => this.onChangeDateReport(value)} selected={this.state.date_mined}
                        className={`form-control ${this.state.errorMessages.date_mined ? 'is-invalid' : ''}`}/>
                    {this.state.errorMessages.date_mined && this.state.errorMessages.date_mined.map(
                        error =>
                            <div className="invalid-feedback">
                                {error}
                            </div>
                    )}
                </div>
                <div className="row mb-2">
                    <div className="col-5">
                        <button onClick={this.loadCountries} className="btn btn-success">Show report</button>
                    </div>
                    <div className="col-5">
                        <button onClick={this.generateData} className="btn btn-warning">Generate data</button>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Country</th>
                            <th scope="col">Mined</th>
                            <th scope="col">Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries && countries.map((country, index) => (
                            <tr key={country.id}>
                                <td>{country.name}</td>
                                <td>{getFormattingWeight(country.mined)}</td>
                                <td>{getFormattingWeight(country.plan)}</td>
                            </tr>
                        ))}
                        {countries && !countries.length &&
                            <tr key="1">
                                <td colSpan="4" className="text-center">
                                    <div className="p-2">No country to display</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }
};
