import {Component} from 'react'
import MiningService from "../services/MiningService";
import getFormattingWeight from "../common";

export default class List extends Component{
    constructor(props) {
        super(props);
        this.path = props.match.path;
        this.getMinings = this.getMinings.bind(this);

        this.state = {
            minings: [],
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

    render () {
        const {minings} = this.state;

        return (
            <div>
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
                            <td>{getFormattingWeight(mining.mined)}</td>
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
