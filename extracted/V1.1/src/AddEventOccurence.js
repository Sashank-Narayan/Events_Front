import React,{useState} from "react";
import Migrate from "./Migrate"

export default function AddEventOccurence(){
  const [event, setEvent] = useState({
    'TITLE' : " ",
    'DATE' : " ",
    'KEYWORD': " ",
    'BRANCH_X': " ",
  })

  const [submit, setSubmit] = useState(false)
  const [finish, setFinish] = useState(false)

  const handleSubmit = () => {
      console.log(event)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: event })
        };
      fetch('/postbranches', requestOptions)
        .then((response) => response.json())
  }

  return(
    <>
    {!finish ? <> <h2>Add A New Event Occurence</h2>
    <label>Event Name Type</label>
    <input label="Keyword Name" onChange={(e) => setEvent({...event, 'TITLE': e.target.value})} style={{width : "40%", borderRadius: "10px", margin: "20px"}}/>
    <br/>
    <label>Date</label>
    <input label="Keyword Name" onChange={(e) => setEvent({...event, 'DATE': e.target.value})} style={{width : "40%", borderRadius: "10px", margin: "20px"}}/>
    <br/>
    <label>Keyword</label>
    <input label="Keyword Name" onChange={(e) => setEvent({...event, 'KEYWORD': e.target.value})} style={{width : "40%", borderRadius: "10px", margin: "20px"}}/>
    <br/>
    <label>Branch</label>
    <input label="Keyword Name" onChange={(e) => setEvent({...event, 'BRANCH_X': e.target.value})} style={{width : "40%", borderRadius: "10px", margin: "20px"}}/>
    <br/>
    <button onClick={handleSubmit} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '300px', backgroundColor: '', width: '150px'}}>Submit</button>
    <button onClick={() => {setFinish(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '50px', backgroundColor: '', width: '150px'}}>Next</button>
    </>:
      <>
      <Migrate />
      </>
    }</>
  )
}
