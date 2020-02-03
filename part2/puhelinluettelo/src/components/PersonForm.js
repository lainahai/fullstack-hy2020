import React from 'react'
import StateInput from './StateInput'


const PersonForm = ({ handleAddPerson, newNameState, newPhoneState }) => {
  
  return (
    <form onSubmit={handleAddPerson}>
      <StateInput prompt={'name'} inputState={newNameState} />
      <StateInput prompt={'number'} inputState={newPhoneState} />
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm