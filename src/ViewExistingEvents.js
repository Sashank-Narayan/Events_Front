import React, { useState, useEffect } from "react";
import json from './data.json'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ViewAndModifyEvents from './ViewAndModifyEvents';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Paper
} from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import './ViewExistingEvents.css'
import './AddEvents.css';

export default function ViewExistingEvents(props){
  const today = new Date();
  const date = today.setDate(today.getDate());
  const defaultValue = new Date(date).toISOString().split('T')[0]
  const dateYesterday = today.setDate(today.getDate() - 1);
  const defaultValueYesterday = new Date(dateYesterday).toISOString().split('T')[0]

  const [startDate, setStartDate] = useState(defaultValueYesterday)
  const [endDate, setEndDate] = useState(defaultValue)


    const [data, setdata] = useState()
    const [respone, setResponse] = useState()
    const [eventOccurence, setEventOccurence] = useState(false)
    const arr = []
    const [tableArr,setTableArr] = useState()
    const [rows, setRows] = useState([])
    const [editId, setEditId] = useState(null);
    const [newRow, setNewRow] = useState({ TITLE: "", DESC: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", DATE: "", DATETIME: "", LINK: "", KEYWORD: "", BRANCH_X: "", BU_NUM: "", COMPETITOR_EVT_INDCHAR: "", CREATE_USER: "", UPDATE_USER: "" });
    let initialized = false
    const [editMode, setEditMode] = useState(false)

    const handleDeleteRow = (id) => {
      setRows(rows.filter((row) => row.GUID !== id));
    };

    const handleEditRow = (id) => {
      setEditMode(true)
      setEditId(id);
      const row = rows.find((r) => r.GUID === id);
      setNewRow({ TITLE: row.TITLE, DESC: row.DESC, DATE: row.DATE, DATETIME: row.DATETIME, LINK: row.LINK, KEYWORD: row.KEYWORD, BRANCH_X: row.BRANCH_X, BU_NUM: row.BU_NUM, FIXED_ANNUAL_IND: row.FIXED_ANNUAL_IND, PERM_ENV_IND: row.PERM_ENV_IND, CANCELLED_IND: row.CANCELLED_IND, COMPETITOR_EVT_INDCHAR: row.COMPETITOR_EVT_INDCHAR
      , CREATE_USER: row.CREATE_USER, CREATE_USER: row.CREATE_USER, EFSEVT_GUID: row.EFSEVT_GUID, GUID: row.GUID });
    };

    const handleSaveRow = (id) => {
      setEditMode(false)
      const editedRows = rows.map((row) =>
        row.GUID === id ? { ...row, ...newRow } : row
      );
      setRows(editedRows);
      setEditId(null);
      setNewRow({ TITLE: "", DESC: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", DATE: "", DATETIME: "", LINK: "", KEYWORD: "", BRANCH_X: "", BU_NUM: "", COMPETITOR_EVT_INDCHAR: "", CREATE_USER: "", UPDATE_USER: "" });
    };

    const handleAddRow = () => {
      const today = new Date();
      const date = today.setDate(today.getDate());
      console.log(date)
      const newId = rows["length"] > 0 ? rows[rows["length"] - 1].GUID + 1 : date;
      setRows([...rows, { GUID: newId, EFSEVT_GUID: newId *2, ...newRow }]);
      setNewRow({ TITLE: "", DESC: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", DATE: "", DATETIME: "", LINK: "", KEYWORD: "", BRANCH_X: "", BU_NUM: "", COMPETITOR_EVT_INDCHAR: "", CREATE_USER: "", UPDATE_USER: "" });
    };

    useEffect(() => {
      if (!initialized) {
        initialized = true
      fetch('/gsheetlinks')
      .then((res) =>{
        res.json().then((data) => {
          // Setting a data from api
          setResponse(data)
          console.log(data)
          if(data)
            Object.keys(data).forEach(key => arr.push(data[key]))
          NotificationManager.success('Success message', 'Reports Fetched');
        })
      });
    }
      setRows(arr)

    },[])

  return(
    <div class="backgroundImageReports">
    <div><NotificationContainer/></div>
      <Box sx={{
          width: 800,
          height: 500,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '5px',
          margin: '50px 50px 50px 50px',
          overflow: "hidden",
          scrollbarWidth: "none",
          overflowY: "scroll",
          overflowX: "scroll",
          padding: "20px"
        }}>
        <h2>Reports</h2>
        {!eventOccurence ? <>
          <Box sx={{
          width: 700,
          height: 300,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          margin: '50px',
          borderRadius: "25px"
        }} class="boxScroll">
        {rows !== null && <TableContainer component={Paper}>
          <Table class="example-table-history">
            <TableHead>
              <TableRow component={Card}>
                <TableCell>DATE</TableCell>
                <TableCell align="right">TIME</TableCell>
                <TableCell align="right">REPORT LINK</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows !== null && rows?.map((row) => (
                <TableRow key={row.GUID}>
                  <TableCell>
                    {
                      row.DATE
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      row.TIME
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      <a href={row.SPREADSHEET_URL}>Click Here to View Spreadsheet</a>
                    }
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      </Box></> : <></>}
      </Box>
    </div>
  )
}
