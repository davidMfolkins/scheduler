import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"

export default function Appointment(props) {
  const hasAppointment = props.interview

  return <article className="appointment">
    <Header time={props.time}/>
        <div>
          {hasAppointment
            ? <Show 
                student={props.interview.student} 
                interviewer={props.interview.interviewer.name}
              />
            : <Empty />
          }
        </div>
  </article>
}