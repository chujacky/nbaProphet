import React from 'react';
import PropTypes from 'prop-types';

const FixtureListItem = ({ result, teams }) => {
  console.log(teams);
  const hLogo = teams[result.hTeam] === undefined ? '' : teams[result.hTeam].logo;
  const vLogo = teams[result.vTeam] === undefined ? '' : teams[result.vTeam].logo;
  return (
    <div className="result">
      <img width="40" src={hLogo} alt=""/>
      <span className="teams">{result.hTeam}</span>
      <span className="scores">{result.hScore}</span>
      <span>:</span>
      <span className="scores">{result.vScore}</span>
      <span className="teams">{result.vTeam}</span>
      <img width="40" src={vLogo} alt="" />
    </div>
  );
};

export default FixtureListItem;

FixtureListItem.propTypes = {
  fixture: PropTypes.object,
  predict: PropTypes.func,
};
