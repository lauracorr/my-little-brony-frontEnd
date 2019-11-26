import React from 'react';
import './App.css';

class QueryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {model:'', query: '', season: '', episode: '', character: '', seasons: [],
            episodes: [], characters: []};

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSeasonChange = this.handleSeasonChange.bind(this);
        this.handleEpisodeChange = this.handleEpisodeChange.bind(this);
        this.handleCharacterChange = this.handleCharacterChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
    }

    componentDidMount() {
        fetch(`${this.props.url}/all_seasons`).then(results => {
            return results.json();
        }).then(data => {
            debugger;
            let seasons = data.seasons.map( (s, k) => {
                return (
                    <option value={s} key={k}>Season {s}</option>
                )
            })
            this.setState({seasons: seasons})
        }).then(fetch(`${this.props.url}/all_episodes`).then(results => {
            return results.json();
            }).then(data => {
                let episodes = data.episode.map( (ep, k) => {
                    return (
                        <option value={ep} key={k}>{ep}</option>
                    )
                })
            this.setState({episodes: episodes})
            }))
    }

    handleQueryChange(event) {
        this.setState({query: event.target.value});
    }

    handleSeasonChange(event) {
        this.setState({season: event.target.value});

        // Make fetch for episodes using seasons value.
        // add episodes to state variable
        // episodes form reads from state variable
        fetch(`${this.props.url}/get_episodes?season=${event.target.value}`).then(results => {
            return results.json();
        }).then(data => {
            let episodes = data.episodes.map( (ep, k) => {
                return (
                    <option value={ep} key={{k}}>{ep}</option>
                )
            })
            this.setState({
                episodes: episodes
            });
        })
    }

    handleEpisodeChange(event) {
        this.setState({episode: event.target.value});
    }

    handleCharacterChange(event) {
        this.setState({character: event.target.value});
    }

    handleModelChange(event) {
        this.setState({model: event.target.value});
    }

    render() {
        return (
            <form className="Form" onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
                <p className="instructions"><i>Please complete one or more fields to submit a query.</i></p>
                <p className="instructions"><i>(*) Required field.</i></p>
                <table>
                    <tbody>
                        <tr>
                            <td>Query:</td>
                            <td className="tooltip">
                                <span className="tooltiptext">You can enter: keywords, a search phrase (e.g. What episode was school closed), or a specific quote (e.g. "Applesauce of the Apple family lineage")</span>
                                <input type="text" className="searchQuery" value={this.state.query}
                                       onChange={this.handleQueryChange} />

                            </td>
                        </tr>
                        <tr>
                            <td>Season:</td>
                            <td>
                                <select value={this.state.season} onChange={this.handleSeasonChange}>
                                    <option value="">Select Season</option>
                                    {this.state.seasons}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Episode:</td>
                            <td>
                                <select value={this.state.episode} onChange={this.handleEpisodeChange}>
                                    <option value="">Select Episode</option>
                                    {this.state.episodes}
                                </select>
                            </td>
                        </tr>
                        {/*<tr>
                            <td>Characters:</td>
                            <td>
                                <select value={this.state.character} onChange={this.handleCharacterChange}>
                                    <option value="">Select Character</option>
                                    {this.state.characters}
                                </select>
                            </td>
                        </tr>*/}
                        <tr>
                            <td>Results<b>*</b>:</td>
                            <td>
                                <select value={this.state.model} onChange={this.handleModelChange}>
                                    <option value="">Select Result Type</option>
                                    <option value="tfidf">Good</option>
                                    <option value="bm25">Really Good!</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <input type="submit" className="submitButton" value="Submit" />
            </form>
        );
    }
}

export default QueryForm;