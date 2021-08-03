import { useState, useEffect } from 'react'

import styles from './Question.module.css'

export const Question = ({ question, questionNumber, action }) => {
  const [statusArray, setStatusArray] = useState([])

  const setSelectedItem = (_index) => {
    const auxStatusArray = [...statusArray]

    for (let index = 0; index < auxStatusArray.length; index++) {
      if (index !== _index) {
        auxStatusArray[index] = 'not-selected'
      } else {
        if (auxStatusArray[index] === 'selected') {
          auxStatusArray[index] = 'not-selected'
        } else {
          auxStatusArray[index] = 'selected'
        }
      }
    }

    setStatusArray(auxStatusArray)
  }

  useEffect(() => {
    setStatusArray([
      'not-selected',
      'not-selected',
      'not-selected',
      'not-selected'
    ])
  }, [question])

  return (
    <>
      <div className={styles['question-container']}>
        <h1>Question {questionNumber + 1}</h1>
        <div className={styles['question-text']}>
          <span>{question.question}</span>
          <div className={styles['answers-grid']}>
            {question.answers.map((answer, index) => {
              return (
                <div
                  key={index}
                  className={
                    styles['answers-item'] +
                    ' ' +
                    styles[`${statusArray[index]}`]
                  }
                  onClick={() => {
                    setSelectedItem(index)
                  }}
                >
                  <span>{answer}</span>
                </div>
              )
            })}
          </div>
          {
            statusArray.find((status) => status === 'selected')
              ? <div className={styles['next-btn-container']}>
                  <button className="btn btn_primary" onClick={() => action(statusArray.findIndex((status) => status === 'selected'), questionNumber)}>Next</button>
                </div>
              : null
          }
        </div>
      </div>
    </>
  )
}
