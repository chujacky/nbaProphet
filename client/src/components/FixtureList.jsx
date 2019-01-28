import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FixtureListItem from './FixtureListItem.jsx'

class FixtureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: {},
    };
    this.onPredict = this.onPredict.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onPredict(e) {
    const gameId = e.target.className;
    const score = e.target.name;
    const value = e.target.value;
    const { predictions } = this.state;
    if (!predictions[gameId]) {
      predictions[gameId] = {
        gameId,
      };
    }
    if (score === 'hScore') {
      predictions[gameId].hScore = value;
    } else {
      predictions[gameId].vScore = value;
    }
    this.setState({
      predictions,
    }, console.log(this.state));
  }

  onSubmit() {
    const predictions = this.state;
    axios.post('/predictions', predictions)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      })
  }

  render() {
    const { games } = this.props;
    return (
      <div id="fixtureContainer">
        {games.map((fixture) => {
          return <FixtureListItem fixture={fixture} key={fixture.gameId} predict={this.onPredict} />;
        })}
        <button type="button" onClick={this.onSubmit}>Predict!</button>
      </div>
    );
  }
};

export default FixtureList;

FixtureList.propTypes = {
  games: PropTypes.array,
};
