import React from 'react';
import axios from 'axios';

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
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  }

  render() {
    return (
      <div id="nav">
        <span id="title">NBA prophet</span>
        <span>Ranking</span>
        <span>Predict</span>
      </div>
    );
  }
}

export default App;
