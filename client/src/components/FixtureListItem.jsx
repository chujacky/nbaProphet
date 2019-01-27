import React from 'react';

const FixtureListItem = ({ fixture }) => {
  return (
    <div className="fixture">
      <span className="teams">{fixture.hTeam.triCode}</span>
      <input type="number" />
      <span>:</span>
      <input type="number" />
      <span className="teams">{fixture.vTeam.triCode}</span>
    </div>
  );
};

export default FixtureListItem;
