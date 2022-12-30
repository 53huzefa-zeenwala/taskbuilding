function getDayAccordingToNumber(dayNumber) {
  switch (dayNumber) {
    case 1:
      return "Monday"
      break;
    case 2:
      return "Tuesday"
      break;
    case 3:
      return "Wednesday"
      break;
    case 4:
      return "Thursday"
      break;
    case 5:
      return "Friday"
      break;
    case 6:
      return "Saturday"
      break;
    case 7:
      return "Sunday"
      break;  
    default:
      break;
  }
}

export const whichDateIsTaskAdded = (date) => {
  const initialTaskDate = new Date(date)
  const todayDate = new Date()
  const dateDifference = Math.floor((todayDate - initialTaskDate) / (3600 * 1000 * 24))
  let taskDate = getDayAccordingToNumber(initialTaskDate.getDay())
  if (dateDifference === 0) {
    taskDate = "Today";
  } else if (dateDifference === 1) {
    taskDate =  "Yesterday"
  } else if (dateDifference > 1 && dateDifference < 8) {
    taskDate = getDayAccordingToNumber(initialTaskDate.getDay())
  } else if (dateDifference > 8 && dateDifference < 30) {
    taskDate = `${dateDifference} day ago`
  } else if (dateDifference > 30 && dateDifference < 365) {
    const month = Math.floor(dateDifference/30)
    taskDate = `${month != 1 ? month : 'A'} month ago`
  } else if (dateDifference > 365 ) {
    const year = Math.floor(dateDifference/365)
    taskDate = `${year != 1 ? year : 'A'} year ago`
  } else {
    taskDate
  }
  return taskDate
}