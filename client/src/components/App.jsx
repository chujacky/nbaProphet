import React from 'react';
import axios from 'axios';
import FixtureList from './FixtureList.jsx';
import Standings from './Standings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predictPage: true,
      standingsPage: false,
      games: [],
      standings: [],
      teams: [],
    };
    this.onPredictClick = this.onPredictClick.bind(this);
    this.onStandingsClick = this.onStandingsClick.bind(this);
  }

  componentDidMount() {
    axios.get('/getfixtures', { crossDomain: true })
      .then((response) => {
        // console.log(response.data);
        this.setState({
          games: response.data,
        });
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
    axios.get('/getstandings', { crossDomain: true })
      .then((response) => {
        this.setState({
          standings: response.data,
        });
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
    axios.get('/getteams', { crossDomain: true })
      .then((response) => {
        const teamsInfo = {};
        response.data.forEach((team) => {
          teamsInfo[team.triCode] = team;
        });
        console.log(teamsInfo);
        this.setState({
          teams: teamsInfo,
        });
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  }

  onPredictClick() {
    this.setState({
      predictPage: true,
      standingsPage: false,
    });
  }

  onStandingsClick() {
    this.setState({
      predictPage: false,
      standingsPage: true,
    });
  }

  render() {
    const standingsDisplay = {
      display: this.state.standingsPage ? 'flex' : 'none',
    };
    const predictDisplay = {
      display: this.state.predictPage ? 'flex' : 'none',
    };
    return (
      <div>
        <div id="nav">
          <img src="https://theundefeated.com/wp-content/uploads/2017/06/shaq_v2.png" alt="" height="100%"/>
          <h3 id="title">NBA prophet</h3>
          <h3 className="buttons" onClick={this.onPredictClick} >Predict</h3>
          <h3 className="buttons" onClick={this.onStandingsClick} >Standings</h3>
        </div>
        <FixtureList games={this.state.games} teams={this.state.teams} styles={predictDisplay} />
        <Standings standings={this.state.standings} styles={standingsDisplay} />
      </div>
    );
  }
}

export default App;
