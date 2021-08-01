import styles from './Question.module.css'

export const Question = ({ question, questionNumber, action }) => {
  return (
    <>
      <div className={styles['question-container']}>
        <h1>Question {questionNumber + 1}</h1>
        <div className={styles['question-text']}>
          <span>{question.question}</span>
        </div>
        <div className={styles['answers-grid']}>
          <div className={styles['answers-item']} onClick={() => action(0)}>
            <span>{question.answers[0]}</span>
          </div>
          <div className={styles['answers-item']} onClick={() => action(1)}>
            <span>{question.answers[1]}</span>
          </div>
          <div className={styles['answers-item']} onClick={() => action(2)}>
            <span>{question.answers[2]}</span>
          </div>
          <div className={styles['answers-item']} onClick={() => action(3)}>
            <span>{question.answers[3]}</span>
          </div>
        </div>
      </div>
    </>
  )
}
