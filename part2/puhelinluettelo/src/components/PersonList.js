import React from 'react'

const PersonList = ( { persons, nameFilter, handleDelete } ) => {
  const personList = persons.filter(person => person.name.toLowerCase().includes(nameFilter)).map( 
    person => <Person key={person.id} person={person} handleDelete={handleDelete}/> 
  )

  return (
    <div>
      {personList}
    </div>
  )
}

const Person = ( { person, handleDelete } ) => {
  const deletePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)){
      handleDelete(person.id)
    }
  } 
  return (
    <div>
      {person.name} {person.number} <button onClick={deletePerson}>Delete</button> 
    </div>
  )
}
export default PersonList