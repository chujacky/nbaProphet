import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FixtureListItem from './FixtureListItem.jsx'

class FixtureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      predictions: {},
    };
    this.onPredict = this.onPredict.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  onPredict(e) {
    const game_id = e.target.className;
    const team = e.target.id;
    const score = e.target.name;
    const value = Number(e.target.value);
    const { predictions, user } = this.state;
    if (!predictions[game_id]) {
      predictions[game_id] = {
        game_id,
        user,
      };
    }
    if (score === 'hScore') {
      predictions[game_id].hTeam = team;
      predictions[game_id].hScore = value;
    } else {
      predictions[game_id].vTeam = team;
      predictions[game_id].vScore = value;
    }
    this.setState({
      predictions,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { predictions } = this.state; 
    console.log(predictions);
    for (var game in predictions) {
      console.log(predictions[game]);
      if (predictions[game].hScore > predictions[game].vScore) {
        predictions[game].winner = predictions[game].hTeam;
      } else {
        predictions[game].winner = predictions[game].vTeam;
      }
    }
    axios.post('/predictions', predictions)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
    e.target.reset();
    this.setState({
      user: '',
      predictions: {},
    });
  }

  addUser(e) {
    const game_id = e.target.className;
    const { predictions } = this.state; 
    const user = e.target.value;
    this.setState({
      user,
    })
    if (!predictions[game_id]) {
      predictions[game_id] = {
        game_id,
        user,
      };
    }
  }

  render() {
    const { games, styles, teams } = this.props;
    return (
      <form onSubmit={e => this.onSubmit(e)} style={styles}>
        <p>Predict the nba scores for today&apos;s game! <br></br> 10 points for predicting the correct winner
        <br></br>5 bonus points if guess is within +/- 5 of actual scores (each team)</p>
        <div id="userContainer">
          <label>User: </label>
          <input id="user" type="text" required onChange={e => this.addUser(e)} />
        </div>
        <div id="fixtureContainer">
          {games.map((fixture) => {
            return <FixtureListItem fixture={fixture} teams={teams} key={fixture.game_id} predict={this.onPredict} />;
          })}
        </div>
        <button type="submit">Predict!</button>
      </form>
    );
  }
};

export default FixtureList;

FixtureList.propTypes = {
  games: PropTypes.array,
  styles: PropTypes.object,
};
