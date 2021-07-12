import {Component} from 'react'
import MiningService from "../services/MiningService";
import {Link} from "react-router-dom";

export default class List extends Component{
    constructor(props) {
        super(props);
        this.path = props.match.path;
        this.getMinings = this.getMinings.bind(this);
        this.deleteMining = this.deleteMining.bind(this);

        this.state = {
            minings: [],

            error: false,
            alertMessage: '',
        };
    }

    componentDidMount() {
        this.getMinings();
    }

    getMinings() {
        MiningService.getAll()
            .then(response => {
                this.setState({
                    minings: response.data.data
                });
                console.log(response.data.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteMining(MiningId, index) {
        MiningService.delete(MiningId)
            .then(response => {
                delete this.state.minings[index]
                this.setState({
                    error: false,
                    alertMessage: "Mining has been successfully deleted."
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
        const {minings, error, alertMessage} = this.state;

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
                <Link to={`${this.path}/add`} className="btn btn-success mb-2">Create mining</Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Mined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {minings && minings.map((mining, index) => (
                            <tr key={mining.id}>
                                <td>{mining.relations?.company?.name}</td>
                                <td>{new Date(mining.date_mined).toUTCString()}</td>
                                <td>{mining.mined}</td>
                                <td>
                                    <Link to={`${this.path}/edit/${mining.id}`} className="btn btn-sm btn-primary mr-1">
                                        edit
                                    </Link>
                                    <button onClick={() => this.deleteMining(mining.id, index)} className="btn btn-sm btn-danger">
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {minings && !minings.length &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="p-2">No mining to display</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }
};
