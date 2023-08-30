import React, {useState} from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    <>
    {!finish ? <> <h2>Migrate</h2> <button onClick={() => {setTransfer(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '20px', marginTop: '50px', backgroundColor: '', width: '250px'}}>Migrate To SAS</button>
    <button onClick={() => {setApproval(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '100px', marginTop: '50px', backgroundColor: '', width: '250px'}}>Send For Approval</button>
    <button onClick={() => {setFinish(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '420px', marginTop: '150px', backgroundColor: '', width: '150px'}}>Finish</button>
    </> : <CheckCircleIcon color="white" sx={{ fontSize: 100, margin: "100px" }}/>}</>
  )
}
