import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ( { anecdotes } ) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [winner, setWinner] = useState(0)

  const newAnecdote = () => (
    setSelected( Math.floor(Math.random() * anecdotes.length))
  )

  const voteSelected = () => {
    const newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)
    
    if (newVotes[selected] > newVotes[winner]) {
      setWinner(selected)
    }
  }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text={"Vote"} onclick={voteSelected}/>
      <Button text={"New anecdote"} onclick={newAnecdote}/>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[winner]} votes={votes[winner]} />
    </div>
  )
}

const Anecdote = ( { anecdote, votes } ) => (
  <div>
    <p>{anecdote}</p>
<p>Has {votes} votes</p>
  </div>
)

const Button = ({ text, onclick }) => (
  <button onClick={onclick}>{text}</button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)