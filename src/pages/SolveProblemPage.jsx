import React from 'react'
import { useParams } from 'react-router-dom'

export const SolveProblemPage = () => {

    const {problemId} = useParams();

    console.log(problemId);

  return (
    <div>SolveProblemPage</div>
  )
}
