import React, { useState, useEffect } from "react";
import json from './data.json'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import AddBranches from './AddBranches'
import Button from '@mui/material/Button';
import './AddEvents.css'
import AddNewKeywords from './AddNewKeywords'
import FetchEvents from './FetchEvents'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CreatableSelect from 'react-select/creatable';

export default function AddEvents() {

  const animatedComponents = makeAnimated();
  const Keywords = [
    // { label: "Strike", value: 355 },
    // { label: "Holiday", value: 54 },
    // { label: "Lockdown", value: 43 },
    // { label: "Inflation", value: 61 },
    { label: "Lidl", value: 965 },
    // { label: "Grocery Sales", value: 46 },
    // { label: "Carnival", value: 58 },
    // { label: "Festival", value: 50 },
    // { label: "Party", value: 51 },
    { label: "Walmart", value: 52 },
    { label: "Tesco", value: 53 },
    { label: "Sainsbury's", value: 55 },
    // { label: "Supply chain", value: 56 },
    // { label: "Flood", value: 57 },
    // { label: "Wendys", value: 59 },
    { label: "Aldi", value: 60 },
    { label: "Marks & Spencers", value: 70 },
    { label: "Asda", value: 71 },
    { label: "Waitrose", value: 72 },
    // { label: "New Store", value: 73 },
    // { label: "Convenience Store", value: 74 },
    // { label: "Grocery Store", value: 75 },
    // { label: "Warehouse", value: 76 },
    // { label: "Flood", value: 57 },
    // { label: "Flood", value: 57 },
  ];
  const [viewEvents, setViewEvents] = useState(false)

  const [selectedValue, setSelectedValue] = useState(Keywords)

  const postAllKeywordsData = () => {
    const keywords = ['strike', 'christmas']
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: '{"data" : ' + json + '}'
      body: JSON.stringify({ data: selectedValue })
      };
      fetch('/postkeywords', requestOptions)
      .then((response) => {
        response.json()
        NotificationManager.success('Success message', 'Keywords Selected');
      })
      .catch((err) => {
        NotificationManager.error('Failure message', 'Failed to Add Keywords');
      })
      // .then(data => this.setState({ postId: data.id }));
  }

      return (
        <>
        <div><NotificationContainer/></div>
        <div class="backgroundImageEvents" style = {{ padding : "3px"}}>
          <h1>Create Events</h1>
        {!viewEvents ? <> <div>
        <Box sx={{
        width: 600,
        height: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        margin: '20px 50px 30px 60px'
        // backgroundColor: 'white',
        // opacity: [0, 0, 1]
      }}>
      <h3>Add Core Event Type</h3>
        <div className="container" style={{padding : '10px 50px 10px 50px'}}>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-12">
              <CreatableSelect options={Keywords} default={Keywords} components={animatedComponents} styles={{  option: (provided) => ({
                  ...provided,
                  color: 'black',
                  fontSize: '15px'
                }),}}
                defaultValue = {Keywords}
                onChange={(option) => {setSelectedValue(option)}}
                isMulti />
            </div>
            <div className="col-md-6" style={{ padding : '10px 10px 0px 10px'}}><button onClick={postAllKeywordsData} variant="contained" class='keyword'>Pick Keywords</button></div>
          </div>
        </div>
        </Box>
        <Box sx={{
          width: 600,
          height: "100%",
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          margin: '20px 20px 30px 60px'
        }}>
          <h3>Add Branches</h3>
          <AddBranches />
        </Box>
        </div>
      <div>
      <FetchEvents keywords={selectedValue} />
      </div>
      </> :
      <div style={{display : 'flex', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), url("https://www.johnlewispartnership.co.uk/content/dam/cws/images/Juniper/shops/Waitrose-and-Partners-Edgware-Road1.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'}} >
        <AddNewKeywords />
      </div>
      }
      </div>
      </>
    );
}

// <button onClick={()=> {setViewEvents(true)}}> Next </button>
