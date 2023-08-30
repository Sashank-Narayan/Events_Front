import logo from './logo.svg';
import './App.css';
// Importing modules
import React, { useState, useEffect } from "react";
import CardComponent from './CardComponent'
import json from './data.json'
import Button from '@mui/material/Button';
import HomeScreen from './HomeScreen'
import Sidebar from './common/Sidebar'
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
		name: "",
		age: 0,
		date: "",
		programming: "",
	});

	const [response, setResponse] = useState()
	const [keys, setKeys] = useState(Object.keys(json))

	// const data_json = JSON.parse(json)

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
	}, []);

	return (
		<div className="App">
		<BrowserRouter>
			<Routes>
					<Route path='/' element={<HomeScreen />}>
							<Route index element={<HomeScreen />} />
							<Route path='/started' element={<AddEvents />} />
							<Route path='/calendar' element={<AddBranches />} />
							<Route path='/user' element={<AddNewKeywords />} />
							<Route path='/order' element={<FetchEvents />} />
					</Route>
			</Routes>
		</BrowserRouter>
			<header className="App-header">
				<Box sx={{
					display: "flex",
	        width: 100,
					alignSelf: "flex-start",
	        height: 900,
	        backgroundColor: 'rgba(255, 255, 255, 0.2)',
	        borderRadius: '16px',
	      }}>
				</ Box>
				<HomeScreen />
			</header>
		</div>
	);
}

export default App;

//
// from gspread_dataframe import set_with_dataframe
// import gspread
// from google.auth import default
//
// def save_updated_sheet():
//   gc = gspread.authorize(creds)
//   worksheet = gc.open(date.today().strftime("%d/%m/%Y")).sheet1
//   set_with_dataframe(worksheet)
