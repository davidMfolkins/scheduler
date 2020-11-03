import { useState, useEffect } from "react"
import axios from "axios";

export default function useApplicationData() {

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayObject = {
      ...state.days.find(currentDay =>
        currentDay.name === state.day
      )
    };

    const filtereddayObject = dayObject.appointments.filter(id => appointments[id].interview === null)
 
    dayObject.spots = filtereddayObject.length;

    const newDay = state.days.map(day => day.id === dayObject.id ? dayObject : day)
 
    state.days = [...newDay];

    const days = state.days

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }))
      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayObject = {
      ...state.days.find(currentDay =>
        currentDay.name === state.day
      )
    };

    const filtereddayObject = dayObject.appointments.filter(id => appointments[id].interview === null)

    dayObject.spots = filtereddayObject.length;

    const newDay = state.days.map(day => day.id === dayObject.id ? dayObject : day)

    state.days = [...newDay];

    const days = state.days

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days })
      })
  };

  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  const applicationData = {
    bookInterview,
    cancelInterview,
    setDay,
    state,
    setState,
  }

  return applicationData
}