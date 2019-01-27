import React from 'react';
import FixtureListItem from './FixtureListItem.jsx'

const FixtureList = ({ games }) => {
  return (
    <div id="fixtures">
      {games.map((fixture) => {
        return <FixtureListItem fixture={fixture} />;
      })}
      <button type="button">Predict!</button>
    </div>
  );
};

export default FixtureList;
