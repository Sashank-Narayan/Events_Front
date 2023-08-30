import React, { useState, useEffect } from "react";
import json from './data.json'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import AddBranches from './AddBranches'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddEvents.css'
import FetchEvents from './FetchEvents'
import InputBase from '@mui/material/InputBase';

// import './AddNewEvents.css'

export default function AddNewEvents() {

  const [keyword, setKeyword] = useState()

  const animatedComponents = makeAnimated();
  const Keywords = [
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 }
  ];
  const [fetchEvents, setFetchEvents] = useState(false)

  const postAllKeywordsData = () => {
    console.log(keyword)
    const keywords = ['strike', 'christmas']
    console.log(json)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: '{"data" : ' + json + '}'
      body: JSON.stringify({ data: keyword })
      };
      fetch('/postnewkeyword', requestOptions)
      .then((response) => response.json())
      // .then(data => this.setState({ postId: data.id }));
  }

      return (
        <>
        {!fetchEvents ? <Box sx={{
        width: 700,
        height: 500,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        margin: '50px'
      }}>
      <h1>Add Keywords</h1>
        <div className="container" style={{padding : '50px'}}>
          <div className="row">
            <div className="col-md-6"></div>
            <label>Add New Keyword </label>
            <div className="col-md-12">
              <input label="Keyword Name" onChange={(e) => setKeyword(e.target.value)} style={{width : "100%", borderRadius: "10px"}}/>
            </div>
            <div className="col-md-6" style={{ padding : '20px'}}><button onClick={postAllKeywordsData} variant="contained" class='keyword' style={{width : '250px'}}>Submit Keyword</button></div>
          </div>
        </div>
        <button onClick={() => {setFetchEvents(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '400px', backgroundColor: '', width: '150px'}}>Next</button>
        </Box> :

        <FetchEvents />
      }
      </>
    );
}

// <button onClick={()=> {setViewEvents(true)}}> Next </button>
