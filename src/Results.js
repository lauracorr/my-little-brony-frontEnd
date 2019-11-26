import React from 'react';
import './App.css';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = { top_ten: [] }
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:5000/get_results?model=${this.props.data.model}&query=${this.props.data.query}&season=${this.props.data.season}&episode=${this.props.data.episode}`).then(results => {
            return results.json();
        }).then(data => {
            let top_ten = data.map( (doc) => {
                return (
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><b>Season:</b></td>
                                    <td>{doc.season}</td>
                                </tr>
                                <tr>
                                    <td><b>Episode:</b></td>
                                    <td>{doc.episode} (#{doc.episodeNumber})</td>
                                </tr>
                                {/*<tr>
                                    <td><b>Character:</b></td>
                                    <td>{doc.character}</td>
                                </tr>*/}
                                <tr>
                                    <td><b>Preview:</b></td>
                                    <td>"{doc.preview}"</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Link: </b>
                                    </td>
                                    <td>
                                        <a href={doc.link}>Episode Transcript</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr/>
                    </div>
                );
            });
            this.setState({top_ten: top_ten});
        })
    }


    render() {
        return(
            <div className="ResultsPage">
                <hr />
                <div className="Results">
                    <p className="resultsTitle"><u>Search Results</u></p>
                    {this.state.top_ten}
                </div>
            </div>
        );
    }
}

export default Results;


/*
return(
            <div className="Results">
                <p className="resultsTitle"><u>Search Results</u></p>
                <table>
                    <tr>
                        <td><b>Season:</b></td>
                        <td>#8</td>
                    </tr>
                    <tr>
                        <td><b>Episode:</b></td>
                        <td>School Daze Part 2 (Episode #171)</td>
                    </tr>
                    <tr>
                        <td><b>Character:</b></td>
                        <td>Seaspray</td>
                    </tr>
                    <tr>
                        <td><b>Preview:</b></td>
                        <td>"...When the <b>school closed</b>, they didn't want to say goodbye..."</td>
                    </tr>
                </table>
                <p><b>Link: </b><a href="file:///Users/laurigan/Downloads/p2-data/All%20Transcripts%20-%20My%20Little%20Pony%20Friendship%20is%20Magic%20Wiki#SchoolDazePart2.html">Episode Transcript</a></p>
                <hr/>
                <table>
                    <tr>
                        <td><b>Season:</b></td>
                        <td>#9</td>
                    </tr>
                    <tr>
                        <td><b>Episode:</b></td>
                        <td>The Beginning of The End, Part 1 (Episode #196)</td>
                    </tr>
                    <tr>
                        <td><b>Character:</b></td>
                        <td>Starlight Glimmer</td>
                    </tr>
                    <tr>
                        <td><b>Preview:</b></td>
                        <td>"...With the <b>school closed</b> for the summer, I didn't think..."</td>
                    </tr>
                </table>
                <p><b>Link: </b><a href="file:///Users/laurigan/Downloads/p2-data/All%20Transcripts%20-%20My%20Little%20Pony%20Friendship%20is%20Magic%20Wiki#WhatLiesBeneath.html">Episode Transcript</a></p>
                <hr/>
            </div>
        );
 */