import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predict: true,
      ranking: false,
      games: [],
    };
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
