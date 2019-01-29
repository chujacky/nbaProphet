import React from 'react';
import PropTypes from 'prop-types';

const Standings = ({ standings }) => {
  return (
    <div id="standingContainer">
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
};
