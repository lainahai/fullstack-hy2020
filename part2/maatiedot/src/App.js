import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredCountries, setFilteredCountries] = useState([])


  useEffect(() => {
    console.log('Getting countries')
    Axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('Got countries')
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    const newFilter = event.target.value.toLowerCase()
    setFilter(newFilter)
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(newFilter)))
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter prompt={'Filter by'} filterState={{state: filter, 
        handleChange: handleFilter}} />
      <CountryInformation countries={filteredCountries} />
    </div>
  )
}

const CountryInformation = ( { countries } ) => {
  
  
  if(countries.length < 1) {
    return (
      <div>
        No matches
      </div>
    )
  }

  if(countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]} />
      </div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, use the filter to restrict results
      </div>
    )
  }

  return (
    <div>
      <CountryList countries={countries} />
    </div>
  )
}

const CountryList = ( { countries } ) => (
  <ul style={{listStyleType: 'none'}}>
      {countries.map(country => <li key={country.alpha3Code}>{country.name}</li>)}
  </ul>
)

const Country = ( { country } ) => {
  const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
  const flagStyle = { width: '200px' }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} style={flagStyle}  /> 
    </div>
  )
} 

export default App