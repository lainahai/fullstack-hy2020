import React from 'react'

const Course = ({course}) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Content = ({ parts }) => {
  const contents = parts.map(part => <Part key={part.id} part={part} />)

return (
    <div>
      {contents}
    </div>
  )
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => {
  const initialValue = 0
  const total = props.parts.reduce( (sum, part)  => sum + part.exercises, initialValue)  
  return (
    <p style={{fontWeight: 'bold'}}>
      Number of exercises {total}
    </p>
  )
}

export default Course