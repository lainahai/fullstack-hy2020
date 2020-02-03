import React from 'react'


const Filter = ({ filterState, prompt }) => (
  <div>
    {prompt}: <input value={filterState.state} onChange={filterState.handleChange} />
  </div>
)

export default Filter