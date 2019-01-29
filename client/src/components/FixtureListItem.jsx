import React from 'react';
import PropTypes from 'prop-types';

const FixtureListItem = ({ fixture, predict, teams }) => {
  const hLogo = teams[fixture.hTeam] === undefined ? '' : teams[fixture.hTeam].logo;
  const vLogo = teams[fixture.vTeam] === undefined ? '' : teams[fixture.vTeam].logo;
  return (
    <div className="fixture">
      <img width="40" src={hLogo} alt=""/>
      <span className="teams">{fixture.hTeam}</span>
      <input type="number" name="hScore" className={fixture.game_id} id={fixture.hTeam} onChange={e => predict(e)} min="40" max="199" required />
      <span>:</span>
      <input type="number" name="vScore" className={fixture.game_id} id={fixture.vTeam} onChange={e => predict(e)} min="40" max="199" required />
      <span className="teams">{fixture.vTeam}</span>
      <img width="40" src={vLogo} alt=""/>
    </div>
  );
};

export default FixtureListItem;

FixtureListItem.propTypes = {
  fixture: PropTypes.object,
  predict: PropTypes.func,
};
