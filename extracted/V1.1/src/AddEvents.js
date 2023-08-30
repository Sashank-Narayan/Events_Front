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

export default function AddEvents() {

  const [selectedValue, setSelectedValue] = useState()

  const animatedComponents = makeAnimated();
  const Keywords = [
    { label: "Strike", value: 355 },
    { label: "Holiday", value: 54 },
    { label: "Lockdown", value: 43 },
    { label: "Inflation", value: 61 },
    { label: "Lidl", value: 965 },
    { label: "Grocery Sales", value: 46 },
    { label: "Carnival", value: 58 },
    { label: "Festival", value: 50 },
    { label: "Party", value: 51 },
    { label: "Walmart", value: 52 },
    { label: "Tesco", value: 53 },
    { label: "Sainbury's", value: 55 },
    { label: "Supply chain", value: 56 },
    { label: "Flood", value: 57 },
    { label: "Wendys", value: 59 }
  ];
  const [viewEvents, setViewEvents] = useState(false)

  const postAllKeywordsData = () => {
    const keywords = ['strike', 'christmas']
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: '{"data" : ' + json + '}'
      body: JSON.stringify({ data: selectedValue })
      };
      fetch('/postkeywords', requestOptions)
      .then((response) => response.json())
      // .then(data => this.setState({ postId: data.id }));
  }

      return (
        <div>
        {!viewEvents ? <div style={{display : 'flex'}} class="backgroundImage">
        <Box sx={{
        width: 500,
        height: 600,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        margin: '20px'
        // backgroundColor: 'white',
        // opacity: [0, 0, 1]
      }}>
      <h1>Add Keywords</h1>
        <div className="container" style={{padding : '50px'}}>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-12">
              <Select options={Keywords} components={animatedComponents} styles={{  option: (provided) => ({
                  ...provided,
                  color: 'black',
                  fontSize: '15px'
                }),}}
                onChange={(option) => {setSelectedValue(option)}}
                isMulti />
            </div>
            <div className="col-md-6" style={{ padding : '20px'}}><button onClick={postAllKeywordsData} variant="contained" class='keyword'>Pick Keywords</button></div>
          </div>
        </div>
        </Box>
        <Box sx={{
          width: 500,
          height: 600,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          margin: '20px'
        }}>
          <h1>Add Branches</h1>
          <AddBranches />
          <button onClick={() => {setViewEvents(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '200px', backgroundColor: '', width: '150px'}}>Next</button>
        </Box>
      </div> :
      <div style={{display : 'flex', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), url("https://www.johnlewispartnership.co.uk/content/dam/cws/images/Juniper/shops/Waitrose-and-Partners-Edgware-Road1.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'}} >
        <AddNewKeywords />
      </div>
      }
      </div>
    );
}

// <button onClick={()=> {setViewEvents(true)}}> Next </button>
