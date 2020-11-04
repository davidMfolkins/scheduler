import React, { useState } from 'react'
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"


//returns Form component
export default function Show(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setError("")
    setInterviewer(null)
  }

  function validate(name, interviewer) {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer <= 0) {
      setError("You must choose an interviewer")
      return
    }
    setError("");
    props.onSave(name, interviewer);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={() => cancel()}>Cancel</Button>
        <Button confirm onClick={() => validate(name, interviewer)}>Save</Button>
      </section>
    </section>
  </main>
}

