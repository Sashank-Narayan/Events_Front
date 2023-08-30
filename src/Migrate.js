import React, {useState} from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box'

export default function Migrate(){

  const [transfer, setTransfer] = useState(false)
  const [approval, setApproval] = useState(false)
  const [finish, setFinish] = useState(false)

  const handleFinish = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: true })
        };
      fetch('/finishevents', requestOptions)
        .then((response) => {
          response.json()
        })
        setFinish(true)
  }

  return(
    <div style={{display : 'flex'}} class="backgroundImage" style={{padding: '20px', height: 600}}>
      <Box sx={{
      width: 700,
      height: 500,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      margin: '20px',
      padding: '20px'
      // backgroundColor: 'white',
      // opacity: [0, 0, 1]
      }}>
    {!finish ? <> <h2>Migrate</h2> <button onClick={() => {setTransfer(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '20px', marginTop: '50px', backgroundColor: '', width: '250px'}}>Migrate To SAS</button>
    <button onClick={() => {setApproval(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '100px', marginTop: '50px', backgroundColor: '', width: '250px'}}>Send For Approval</button>
    <button onClick={() => {setFinish(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '420px', marginTop: '150px', backgroundColor: '', width: '150px'}}>Finish</button>
    </> : <CheckCircleIcon color="white" sx={{ fontSize: 100, margin: "100px" }}/>}
    </Box>
  </div>
  )
}
