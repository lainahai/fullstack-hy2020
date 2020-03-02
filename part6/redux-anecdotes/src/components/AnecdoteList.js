import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state =>
    state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.includes(filter))
  )
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`Ỳou voted for ${anecdote.content}`, 5))
    //setTimeout(() => dispatch(setNotification(null)), 5000)
  }
  return (
    <div>
      <Filter />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
