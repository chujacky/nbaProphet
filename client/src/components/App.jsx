import React from 'react';
import axios from 'axios';
import FixtureList from './FixtureList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predict: true,
      ranking: false,
      games: [],
    };
  }

  componentDidMount() {
    axios.get('/get', { crossDomain: true })
      .then((response) => {
        console.log(response.data);
        this.setState({
          games: response.data,
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
          <h3 class="buttons">Predict</h3>
          <h3 class="buttons">Ranking</h3>
        </div>
        <FixtureList games={this.state.games} />
      </div>
    );
  }
}

export default App;
