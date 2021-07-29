export const Alert = ({ text, type }) => {
  return (
    <div className={`alert alert-${type}`} role='alert'>
      { text }
    </div>
  )
}
