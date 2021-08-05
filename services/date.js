export const getCurrentDate = () => {
  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  const year = date.getFullYear()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  if (day < 10) {
    day = `0${day}`
  }

  if (month < 10) {
    month = `0${month}`
  }

  if (hours < 10) {
    hours = `0${hours}`
  }

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
