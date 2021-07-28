export const Alert = ({ text, type }) => {
  console.log(type)
  return (
    <div className={`alert alert-${type}`} role='alert'>
      { text }
    </div>
  )
}
