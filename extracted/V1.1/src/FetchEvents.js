import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import './AddEvents.css'
import ViewAndModifyEvents from './ViewAndModifyEvents'
import {CircularProgress} from '@mui/material';
import axios from "axios";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export default function FetchEvents(){
  const [viewEvents, setViewEvents] = useState(false)

  const [data, setdata] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [endDate, setEndDate] = useState()

  const getAllEventsBack = () => {
    setLoading(true)
    fetch("/events").then((res) =>{
      res.json().then((data) => {
        // Setting a data from api
        setResponse(data)
        console.log(data)
        setdata({
          title: data.TITLE,
          age: data.Age,
          date: data.Date,
          programming: data.programming,
        });
        setLoading(false)
      })
    });
  }

  const getAllEvents = async () => {
  console.log("Entered")
  setIsLoading(true);
  setProgress(0);
  try {
    const response = await axios.get(
      "/events",
      {
        onDownloadProgress: (progressEvent) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercentage);
        },
      }
    );
    setResponse(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
    setProgress(0);
  }
};

  return(
    <>
      {!viewEvents ? <Box sx={{
        width: 700,
        height: 700,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        margin: '50px'
      }}>
      <div>
        <div style={{ margin: "60px", height: "70px", width: "500px"}}>
          <label>Start Date</label>
          <input type="date" id="start" name="trip-start" style={{borderRadius : "5px", height: "50px", width: "60%", margin: "20px", padding: "10px"}}/>
        </div>
        <div style={{ margin: "60px", height: "70px", width: "500px"}}>
          <label>Start Date</label>
          <input type="date" onChange={(e) => {setEndDate(e.target.value)}} id="start" name="trip-start" style={{borderRadius : "5px", height: "50px", width: "60%", margin: "20px", padding: "10px"}}/>
        </div>
      </div>
        <br />
        <div style={{paddingTop : '40px'}}>
        {console.log(progress)}
        {isLoading && <CircularProgress value={25}/>}
        </div>
        <br/>
        <button onClick={() => {getAllEvents()}} class='keyword' style= {{marginTop: '30px', marginLeft: '160px'}}>Fetch Events</button>
        <button onClick={() => {setViewEvents(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '40px', backgroundColor: '', width: '150px'}}>Next</button>
      </Box> :
      <div style={{display : 'flex', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), url("https://www.johnlewispartnership.co.uk/content/dam/cws/images/Juniper/shops/Waitrose-and-Partners-Edgware-Road1.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'}} >
        <ViewAndModifyEvents data={response} />
      </div>
    }
    </>
  )
}

// {loading === false ? response?.length > 0 ? <h2>DONE</h2> : <h2> START </h2> : <CircularProgress color="inherit"/>}
