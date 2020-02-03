import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import StateInput from './components/StateInput'
import PersonList from './components/PersonList'
import PersonService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    console.log('Getting persons')
    PersonService
      .getAll()
      .then(response => {
        console.log('Got persons')
        setPersons(response)
      })
  }, [])

  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const showSuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    if(persons.map(person => person.name).includes(newName)){
      if(window.confirm(`${newName} is already listed in the phonebook,\nDo you want to replace the number?`)){
        const oldPerson = persons.find((person) => person.name === newPerson.name)
        PersonService.update(oldPerson.id, {...newPerson, id: oldPerson.id}).then((response) => {
          setPersons(persons.map( person => person.id !== oldPerson.id ? person : response))
          showSuccess(`Updated ${response.name}`)
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      PersonService.create(newPerson)    
        .then(response => {      
          setPersons(persons.concat(response))      
          setNewName('')
          setNewNumber('')
          showSuccess(`Added ${response.name}`)
      })
      
    }
  }

  const handleDelete = (id) => {
    const deletedPerson = persons.find(person => person.id === id)
    PersonService.delete(id)
      .then(response => {
        console.log(`Deleted ${id}\n`, response.statusText)
        setPersons(persons.filter(person => person.id !== id))
        showSuccess(`Deleted ${deletedPerson.name}`)
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== id))
        showError(`${deletedPerson.name} has already been deleted from the database!`)
      })
  }


  const handleFilterChange = (event) => {
    const filter = event.target.value
    setNameFilter(filter.toLowerCase())
  }

  const handleNameChange = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const handlePhoneChange = (event) => {
    const phone = event.target.value
    setNewNumber(phone)
  }

  const newNameState = {state: newName, handleChange: handleNameChange}
  const newPhoneState = {state: newNumber, handleChange: handlePhoneChange}
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={{color: 'red'}} />
      <Notification message={successMessage} style={{color: 'green'}} />
      <StateInput prompt={'Filter by'} inputState={{state: nameFilter, handleChange: handleFilterChange}} />
      <h3>New contact</h3>
      <PersonForm handleAddPerson={handleAddPerson} newNameState={newNameState} newPhoneState={newPhoneState}  />
      <h3>Contacts</h3>
      <PersonList persons={persons} nameFilter={nameFilter} handleDelete={handleDelete}/>
    </div>
  )

}




export default App