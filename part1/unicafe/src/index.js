import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Hello />
      <Button name={"Good"} state={good} setState={setGood} />
      <Button name={"Neutral"} state={neutral} setState={setNeutral} />
      <Button name={"Bad"} state={bad} setState={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Hello = () => (<h1>Give feedback</h1>)

const Button = ({name, state, setState}) => (
  <button onClick={() => (setState(state+1))}>{name}</button>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (good - bad)/total
  const positive = (good/total) * 100

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"Total"} value={total} />
          <StatisticLine text={"Average"} value={avg} />
          <StatisticLine text={"Positive"} value={positive + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ( { text, value } ) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

ReactDOM.render(<App />, document.getElementById('root'))