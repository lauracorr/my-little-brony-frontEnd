import React from 'react';
import bronies from './bronies.jpg';
import './App.css';
import QueryForm from "./QueryForm";
import Results from "./Results";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {view: 'form', data: null, url: 'http://127.0.0.1:5000', transcript: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showTranscript = this.showTranscript.bind(this);
    }

    handleSubmit(event, values) {
        event.preventDefault();
        const data = {
            model: values.model,
            query: values.query,
            season: values.season,
            episode: values.episode,
            character: values.character
        };

        this.setState({
            view: 'results',
            data: data
        });
    }

    showTranscript(transcript) {
        this.setState({
            view: 'transcript',
            transcript: transcript
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={bronies} className="App-logo" alt="bronies logo" width="200px" height="160px"/>
                    <p>
                        My Little Bronies Search Engine
                    </p>
                </header>
                <QueryForm handleSubmit={this.handleSubmit} url={this.state.url}/>
                <br/>
                {this.state.view === "results" && <Results data={this.state.data} url={this.state.url} showTranscript={this.showTranscript}/>}
                {this.state.view === "transcript" && (
                    <div dangerouslySetInnerHTML={{__html: this.state.transcript}} />
                )}
            </div>
        );
    }
}

export default App;
