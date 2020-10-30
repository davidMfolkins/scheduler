import React from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const CONFIRM = "CONFIRM"

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
  }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    props.cancelInterview(props.id, interview);
    transition(EMPTY);
  }

  return <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => console.log("edit")}
      />
    )}
    {mode === CREATE && (
      <Form
        onCancel={() => back()}
        onSave={save}
        interviewers={props.interviewers}
      />
    )}
    {mode === SAVING && <Status />}
    {mode === CONFIRM && (
      <Confirm
        message="Are you sure you want to cancel this interview?"
        onCancel={() => transition(SHOW)}
        onConfirm={cancel}
      />
    )}
  </article>
}