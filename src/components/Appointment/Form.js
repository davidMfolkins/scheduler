import React, { useState } from 'react'
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Show(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(e) => {setName(e.target.value); console.log(e.target.value)}}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => props.onCancel(reset)}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
    </section>
  </section>
</main>
}