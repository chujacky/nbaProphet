import React from 'react';

const FixtureListItem = ({ fixture }) => {
  return (
    <div>
      <span>{fixture.hTeam.triCode}</span>
      <input type="number" />
      <span>:</span>
      <input type="number" />
      <span>{fixture.vTeam.triCode}</span>
    </div>
  );
};

export default FixtureListItem;
