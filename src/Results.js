import React from 'react';
import './App.css';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top_ten: [],
            url: '',
            transcript: null,
            displayTranscript: false
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.fetchData();
        }
    }

    fetchData() {
        fetch(`http://127.0.0.1:5000/get_results?model=${this.props.data.model}&query=${this.props.data.query}&season=${this.props.data.season}&episode=${this.props.data.episode}`).then(results => {
            return results.json();
        }).then(data => {
            this.setState({top_ten: data});
        });
    }

    render() {
        return(
            <div className="ResultsPage">
                <hr />
                <div className="Results">
                    <p className="resultsTitle"><u>Search Results</u></p>
                    {this.state.top_ten && this.state.top_ten.map((doc, i) => {
                        return (
                            <div key={i}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td><b>Season:</b></td>
                                        <td>{doc.season}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Episode:</b></td>
                                        <td>{doc.episode} (Episode #{doc.episodeNumber})</td>
                                    </tr>
                                    <tr>
                                        <td><b>Preview:</b></td>
                                        <td>"{doc.preview}"</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Link: </b>
                                        </td>
                                        <td>
                                            <a href="#" onClick={() => this.props.showTranscript(doc.link)}>Episode Transcript</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <hr/>
                            </div>
                        );
                    })}
                </div>
                {this.state.displayTranscript && this.state.transcript }
            </div>
        );
    }
}

export default Results;