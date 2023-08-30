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
import './AddEvents.css'
import './FetchEvents.css'
import createHistory from 'history/createBrowserHistory';
import { useHistory } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Switch from '@mui/material/Switch';


export default function FetchEvents(){

  const today = new Date();
  const date = today.setDate(today.getDate());
  const defaultValue = new Date(date).toISOString().split('T')[0]
  const dateYesterday = today.setDate(today.getDate() - 1);
  const defaultValueYesterday = new Date(dateYesterday).toISOString().split('T')[0]

  const [viewEvents, setViewEvents] = useState(false)
  const [data, setdata] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startDate, setStartDate] = useState(defaultValueYesterday)
  const [endDate, setEndDate] = useState(defaultValue)
  const [redirect , setRedirect] = useState()
  const [disabled, setDisabled] = useState(true)
  const [checked, setChecked] = useState(true)

  function warningNotification (error){
    NotificationManager.error('Couldn\'t Fetch Events', 'Error', 5000, () => {
        alert('callback');
    });
  };

  function successNotification (){
  // addNotification({
  //   title: 'Success',
  //   subtitle: 'You have successfully submitted',
  //   message: 'Events fetched successfully',
  //   theme: 'light',
  //   closeButton:"X",
  //   backgroundTop:"green",
  //   backgroundBottom:"yellowgreen"
  //   })
  };

  const getAllEventsBack = () => {
    setLoading(true)
    fetch("/dates").then((res) =>{
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
        setViewEvents(true)
      })
    });
  }

  const postAllDatesData = () => {
    console.log(startDate, endDate)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: '{"data" : ' + json + '}'
      body: JSON.stringify({ data : [startDate, endDate], check: checked })
      };
      fetch('/postadddates', requestOptions)
      .then((response) => {
        response.json()
        NotificationManager.success('Success message', 'Dates Selected');
        setDisabled(false)
      })
      // .then(data => this.setState({ postId: data.id }));
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
    console.log(response.data)
    setViewEvents(true)
    NotificationManager.success('Success message', 'Events Fetched');
    setRedirect(true)
  } catch (error) {
    console.error(error);
    setIsLoading(false);
    setViewEvents(false)
    // warningNotification(error);
    NotificationManager.error('Failure message', 'Failed to Fetch');
  } finally {
    setIsLoading(false);
    setViewEvents(true)
    setProgress(0);
  }
};

  const handleChange = () => {
    console.log(checked)
    if(checked === true)
      setChecked(false)
    else {
      setChecked(true)
    }
  }

  return(
    <div>
      <Box sx={{
        width: 600,
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        margin: '20px 20px 30px 60px'
      }}>
      <h3>Add Dates</h3>
      <div>
        <div style={{ margin: "0px 10px 20px 10px", height: "70px", width: "590px", display: "flex", padding: "10px" }}>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}} id="start" name="trip-start" style={{borderRadius : "5px", height: "50px", width: "100%", margin: "10px", padding: "10px"}}/>
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value)}} id="end" name="trip-start" style={{borderRadius : "5px", height: "50px", width: "100%", margin: "10px", padding: "10px"}}/>
        </div>
        <button onClick={() => {postAllDatesData()}} class='keyword' style= {{marginTop: '0px', marginRight: '250px'}}>Pick Dates</button>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
        <div style={{ display: "flex", marginTop: "30px"}}>
        <span>{!viewEvents ? isLoading && <CircularProgress value={25}/> : redirect && (<Navigate push to="/view"/>)}</span>
          <button onClick={() => {getAllEvents()}} class='keyword' style= {{ marginLeft: '300px', marginTop: '10px'}}>Fetch Events</button>
        </div>
      </Box>
    </div>
  )
}

// <button onClick={() => {setViewEvents(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '40px', backgroundColor: '', width: '150px'}}>Next</button>
// {loading === false ? response?.length > 0 ? <h2>DONE</h2> : <h2> START </h2> : <CircularProgress color="inherit"/>}
// { disabled ? <button disabled style= {{ marginLeft: '300px', marginTop: '10px', backgroundColor: "dark grey", boxShadow: "0"}} class="keyword">Fetch Events</button> :
