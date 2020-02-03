import React from 'react'


const StateInput = ({ inputState, prompt }) => (
  <div>
    {prompt}: <input value={inputState.state} onChange={inputState.handleChange} />
  </div>
)

export default StateInput