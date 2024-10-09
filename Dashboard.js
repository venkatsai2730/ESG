import React, { useState } from 'react';

function Dashboard({ esgData }) {
  const [showEnvironmental, setShowEnvironmental] = useState(true);
  const [showSocial, setShowSocial] = useState(true);
  const [showGovernance, setShowGovernance] = useState(true);

  return (
    <div>
      <h2>Customize ESG Metrics</h2>

      <label>
        <input
          type="checkbox"
          checked={showEnvironmental}
          onChange={() => setShowEnvironmental(!showEnvironmental)}
        />
        Show Environmental
      </label>
      <label>
        <input
          type="checkbox"
          checked={showSocial}
          onChange={() => setShowSocial(!showSocial)}
        />
        Show Social
      </label>
      <label>
        <input
          type="checkbox"
          checked={showGovernance}
          onChange={() => setShowGovernance(!showGovernance)}
        />
        Show Governance
      </label>

      <div>
        {esgData && (
          <>
            {showEnvironmental && (
              <p>Environmental Score: {esgData.environmental_score}</p>
            )}
            {showSocial && <p>Social Score: {esgData.social_score}</p>}
            {showGovernance && (
              <p>Governance Score: {esgData.governance_score}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
