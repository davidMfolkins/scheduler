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
    let currentDayIndex
    for(const day of state.days) {
      if(day.name === state.day) {
        currentDayIndex = day.id - 1
      }
    }
    const currentDay = state.days[currentDayIndex]
    
    const oldSpot = currentDay.spots
    
    const newSpot = oldSpot - 1
    
    const newDay = {
      ...currentDay, spots: newSpot
    }

    const days = [...state.days]

    days[currentDayIndex] = newDay
  
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
    let currentDayIndex
    for(const day of state.days) {
      if(day.name === state.day) {
        currentDayIndex = day.id - 1
      }
    }
    const currentDay = state.days[currentDayIndex]
    
    const oldSpot = currentDay.spots

    const newSpot = oldSpot + 1
    
    const newDay = {
      ...currentDay, spots: newSpot
    }

    const days = [...state.days]

    days[currentDayIndex] = newDay

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
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  axios.put("/appointments/:id", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }
});

  const applicationData = {
    bookInterview,
    cancelInterview,
    setDay,
    state,
    setState,
  }

  return applicationData
}