export function getAppointmentsForDay(state, name) {
  if (!name || !state.days) {
    return []
  } 
  const filteredDays = state.days.filter(d => d.name === name);
  if (filteredDays.length === 0) {
    return []
  }
  const appointmentForDay = filteredDays[0].appointments;
  const finalAppointment = appointmentForDay.map(a => {
    return state.appointments[a]
  })
  return finalAppointment
}

export function getInterview(state, interview) {
  
  if(!interview) {
    return null
  } else {
    const interviewerId = interview.interviewer
    const interviewerObject = {
      student: interview.student,
      interviewer: state.interviewers[interviewerId]
    }
    return interviewerObject
  }
}

export function getInterviewersForDay(state, name) {
  if (!name || !state.days) {
    return []
  } 
  const filteredDays = state.days.filter(d => d.name === name);
  if (filteredDays.length === 0) {
    return []
  }
  const interviewsForDay = filteredDays[0].interviewers;
  const finalInterview = interviewsForDay.map(a => {
    return state.interviewers[a]
  })
  return finalInterview
}