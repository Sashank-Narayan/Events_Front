import React,{useState} from "react";
import Migrate from "./Migrate";
import Box from '@mui/material/Box';

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
      fetch('/postneweventoccurence', requestOptions)
        .then((response) => response.json())
  }

  return(
    <>
    {!finish ? <div style={{display : 'flex'}} class="backgroundImage" style={{padding: '20px'}}>
    <Box sx={{
    width: 700,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    margin: '20px',
    padding: '20px'
    // backgroundColor: 'white',
    // opacity: [0, 0, 1]
  }}> <h2>Add A New Event Occurence</h2>
    <label>Event Name Type</label>
    <input label="Keyword Name" onChange={(e) => setEvent({...event, 'TITLE': e.target.value})} style={{width : "40%", borderRadius: "10px", margin: "20px"}}/>
    <br/>
    <label>Date</label>
    <input label="Keyword Name" onChange={(e) => setEvent({...event, 'DATE': e.target.value})} style={{width : "40%", borderRadius: "10px", margin: "20px 20px 20px 150px"}}/>
    <br/>
    <label>Keyword</label>
    <input label="Keyword Name" onChange={(e) => setEvent({...event, 'KEYWORD': e.target.value})} style={{width : "40%", borderRadius: "10px", margin: "20px 20px 20px 110px"}}/>
    <br/>
    <label>Branch</label>
    <input label="Keyword Name" onChange={(e) => setEvent({...event, 'BRANCH_X': e.target.value})} style={{width : "40%", borderRadius: "10px", margin: "20px 20px 20px 130px"}}/>
    <br/>
    <button onClick={handleSubmit} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '300px', backgroundColor: '', width: '150px'}}>Submit</button>
    <button onClick={() => {setFinish(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '50px', backgroundColor: '', width: '150px'}}>Next</button>
    </Box></div>:
      <div style={{display : 'flex'}} class="backgroundImage" style={{padding: '20px'}}>
        <Box sx={{
        width: 700,
        height: 600,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        margin: '20px',
        padding: '20px'
        // backgroundColor: 'white',
        // opacity: [0, 0, 1]
        }}>
          <Migrate />
        </Box>
      </div>
    }</>
  )
}
