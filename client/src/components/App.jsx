import React from 'react';
import axios from 'axios';
import FixtureList from './FixtureList.jsx';
import Standings from './Standings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predict: true,
      ranking: false,
      games: [],
      standings: [],
    };
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
        console.log(response.data);
        this.setState({
          standings: response.data,
        });
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  }

  render() {
    return (
      <div>
        <div id="nav">
          <h3 id="title">NBA prophet</h3>
          <h3 className="buttons">Predict</h3>
          <h3 className="buttons">Standings</h3>
        </div>
        <FixtureList games={this.state.games} />
        <Standings standings={this.state.standings} />
      </div>
    );
  }
}

export default App;
