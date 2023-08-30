import logo from './logo.svg';
import './App.css';
// Importing modules
import React, { useState, useEffect } from "react";
import json from './data.json'
import Button from '@mui/material/Button';
import HomeScreen from './HomeScreen'
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEvents from './AddEvents';
import AddBranches from './AddBranches';
import AddNewKeywords from './AddNewKeywords';
import FetchEvents from './FetchEvents';
import AppLayout from './AppLayout';
import ViewAndModifyEvents from './ViewAndModifyEvents'
import Migrate from './Migrate'
import AddEventOccurence from './AddEventOccurence'
import 'boxicons/css/boxicons.min.css';
import ViewExistingEvents from './ViewExistingEvents'; 

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
		<header className="App-header">
		<BrowserRouter>
			<Routes>
					<Route path='/' element={<AppLayout />}>
							<Route index element={<HomeScreen />} />
							<Route path='/requirements' element={<AddEvents />} />
							<Route path='/view' element={<ViewAndModifyEvents />} />
							<Route path='/occurence' element={<AddEventOccurence />} />
							<Route path='/migrate' element={<Migrate />} />
							<Route path='/history' element={<ViewExistingEvents />} />
					</Route>
			</Routes>
		</BrowserRouter>

		</header></div>
	);
}

export default App;

//
// <Route path='/view' element={<ViewAndModifyEvents />} />
// <Route path='/occurence' element={<AddEventOccurence />} />
// <Route path='/migrate' element={<Migrate />} />


// from gspread_dataframe import set_with_dataframe
// import gspread
// from google.auth import default
//
// def save_updated_sheet():
//   gc = gspread.authorize(creds)
//   worksheet = gc.open(date.today().strftime("%d/%m/%Y")).sheet1
//   set_with_dataframe(worksheet)
