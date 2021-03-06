import React from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const DELETING = "DELETING"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

//returns Appointment with appropriate components
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => { transition(ERROR_SAVE, true) })
  }

  function cancel(event) {
    transition(DELETING, true)

    props.cancelInterview(props.id)
    .then(() => { transition(EMPTY) })
    .catch(error => { transition(ERROR_DELETE, true) })
  }

  return <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && (
      <Form
        onCancel={() => back()}
        onSave={save}
        interviewers={props.interviewers}
      />
    )}
    {mode === SAVING && <Status message="Saving"/>}
    {mode === DELETING && <Status message="Deleting"/>}
    {mode === CONFIRM && (
      <Confirm
        message="Are you sure you want to cancel this interview?"
        onCancel={() => back()}
        onConfirm={cancel}
      />
    )}
    {mode === EDIT && 
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onCancel={() => back()}
        onSave={save}
        interviewers={props.interviewers}
      />
    }
    {mode === ERROR_SAVE && 
      <Error 
        message="Could not save appointment"
        onClose={() => back()}
      />
    }
    {mode === ERROR_DELETE && 
      <Error 
        message="Could not delete appointment"
        onClose={() => back()}
      />
    }
  </article>
}