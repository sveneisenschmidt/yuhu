import React, {Component} from "react";
import Autocomplete from './Autocomplete';
import './CustomAchievements.css';
import Apiservice from "../util/apiservice";

export default class CustomAchievements extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            action: '',
            players: [],
            actions: []
        }
    }

    componentDidMount() {
        Apiservice.getPlayers().then(response => {
            this.setState({
                players: response.data
            });
        });
        Apiservice.getActions().then(response => {
            this.setState({
                actions: response.data
            });
        });
    }

    updateValue = (value, field) => {
        let newState = {};
        newState[field] = value;

        this.setState(newState);
    };

    onSubmit = e => {
        e.preventDefault();
        const {username, action} = this.state;
        console.log({username, action});

        Apiservice.sendAction(username, action);
    };

    render() {
        return (
            <section className="container with-title balloon">
                <h2 className="title">Custom Achievements</h2>

                <div className="messages">
                    <div className="message -left">
                        <i className="bcrikko">
                        </i>
                        <div className="balloon from-left">
                            <p>Hello, would you like to reward someone? Please enter an achievement
                                <i className="snes-jp-logo"></i>
                            </p>
                        </div>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="field">
                        <label className="formTitle">User Name:
                            <Autocomplete
                                fieldName={'username'}
                                cssClasses={'input'}
                                autoFocus={true}
                                updateValue={this.updateValue}
                                suggestions={this.state.players.map(player => {
                                    return <span id={player.username}>{player.name}</span>;
                                })}
                            />
                        </label>
                    </div>
                    <div className="field">
                        <label className="formTitle">Achievement
                            <Autocomplete
                                fieldName={'action'}
                                cssClasses={'input'}
                                autoFocus={false}
                                updateValue={this.updateValue}
                                suggestions={this.state.actions.map(action => {
                                    return <span id={action.name}>{action.name}</span>;
                                })}
                            />
                        </label>
                    </div>
                    <input type="submit" value="Submit Achievement" className="btn is-primary"/>
                </form>
            </section>
        );
    }
};
