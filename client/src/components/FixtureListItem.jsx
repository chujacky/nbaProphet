import React from 'react';
import PropTypes from 'prop-types';

const FixtureListItem = ({ fixture, predict }) => {
  return (
    <div className="fixture">
      <span className="teams">{fixture.hTeam}</span>
      <input type="number" name="hScore" className={fixture.game_id} id={fixture.hTeam} onChange={e => predict(e)} />
      <span>:</span>
      <input type="number" name="vScore" className={fixture.game_id} id={fixture.vTeam} onChange={e => predict(e)} />
      <span className="teams">{fixture.vTeam}</span>
    </div>
  );
};

export default FixtureListItem;

FixtureListItem.propTypes = {
  fixture: PropTypes.object,
  predict: PropTypes.func,
};
