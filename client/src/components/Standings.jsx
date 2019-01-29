import React from 'react';
import PropTypes from 'prop-types';

const Standings = (props) => {
  const { standings, styles } = props;
  return (
    <div id="standingContainer" style={styles}>
      <h2>Standings</h2>
      <div className="standingTable">
        <span>Rank</span>
        <span>User</span>
        <span>Points</span>
        <span>Corrects</span>
      </div>
      {standings.map((player, rank) => {
        return (
          <div className="standingTable">
            <span>{rank + 1}</span>
            <span>{player.user}</span>
            <span>{player.points}</span>
            <span>{player.accuracy}</span>
          </div>
        );
      })}
    </div>
  )
};

export default Standings;

Standings.propTypes = {
  standings: PropTypes.array,
  styles: PropTypes.object,
};
