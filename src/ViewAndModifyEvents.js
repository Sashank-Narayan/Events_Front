import React, { useState, useEffect } from "react";
import json from './data.json'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Text } from '@mantine/core';
import AddEventOccurence from './AddEventOccurence';
import makeAnimated from 'react-select/animated';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Paper,
  Select,
  MenuItem,
  Menu
} from "@mui/material";
import { Delete, Edit, Save, ArrowDropDown } from "@mui/icons-material";
import './ViewAndModifyEvents2.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import LaunchIcon from '@mui/icons-material/Launch';
import Switch from "react-switch";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CreatableSelect from 'react-select/creatable';

export default function ViewAndModifyEvents(props){

  const animatedComponents = makeAnimated();
  const [data, setdata] = useState()
  const [respone, setResponse] = useState()
  const [eventOccurence, setEventOccurence] = useState(false)
  const arr = []
  const new_arr = []
  Object.keys(json).forEach(key => arr.push(json[key]))
  const [tableArr,setTableArr] = useState(arr)
  const [rows, setRows] = useState()
  const [editId, setEditId] = useState(null);
  const [newRow, setNewRow] = useState({ TITLE: "", MEDIA: "", BRANCH_X: "", DISTANCE: "", BU_NUM: ""});
  const [checked, setChecked] = useState(false)
  const [filterBU, setFilterBU] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [options,setOptions] = useState([])
  const [searchText, setSearchText] = useState(null);
  const [filterBUBranch, setFilterBUBranch] = useState("");
  const [anchorElBranch, setAnchorElBranch] = useState(null);
  const [searchTextBranch, setSearchTextBranch] = useState('');

  const [editMode, setEditMode] = useState(false)
  let initialized = false

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.GUID !== id));
  };

  const handleEditRow = (id) => {
    setEditMode(true)
    setEditId(id);
    const row = rows.find((r) => r.GUID === id);
    setNewRow({ TITLE: row.TITLE, BRANCH: row.BRANCH, MEDIA: row.MEDIA, SOURCE_OF_EVENT: row.SOURCE_OF_EVENT, DISTANCE: row.DISTANCE, BU_NUM: row.BU_NUM});
  };

  const handleSaveRow = (id) => {
    setEditMode(false)
    const editedRows = rows?.map((row) =>
      row.GUID === id ? { ...row, ...newRow } : row
    );
    setRows(editedRows);
    setEditId(null);
    setNewRow({ TITLE: "", MEDIA: "", BRANCH: "", SOURCE_OF_EVENT: "", DISTANCE: "", BU_NUM: "" });
  };

  const handleAddRow = () => {
    const today = new Date();
    const date = today.setDate(today.getDate());
    console.log(date)
    const newId = rows["length"] > 0 ? rows[rows["length"] - 1].GUID + 1 : date;
    setRows([...rows, { GUID: newId, EFSEVT_GUID: newId *2, ...newRow }]);
    setNewRow({ TITLE: "", MEDIA: "", BRANCH: "", SOURCE_OF_EVENT: "", DISTANCE: "", BU_NUM: "" });
  };

  const handleChange = () => {
    setChecked(true)
    setNewRow({ ...newRow, FIXED_ANNUAL_IND: 'y' })
  }

  useEffect(() => {
    console.log("INI")
    if (!initialized) {
      initialized = true
        fetch("/fetchevents").then((res) =>{
        res.json().then((data) => {
          // Setting a data from api
          setResponse(data)
          console.log(data)
          Object.keys(data).forEach(key => new_arr.push(data[key]))
          // setOptions(Array.from(new Set(rows?.map((row) => row.BU_NUM))))
          console.log("IN")
          if(new_arr[0] === "Admin access is required"){
            setRows(arr)
            setOptions(Array.from((arr?.map((arr, index) => {
              return {"label": index, "value": arr.BU_NUM}
            }))))
          }
          else {
            setRows(new_arr)
            setOptions(Array.from((arr?.map((arr, index) => {
              return {"label": index, "value": arr.BU_NUM}
            }))))
          }
          NotificationManager.success('Success message', 'EventsList Added');
        })
      }).catch((err) => {
        setRows(arr)
        NotificationManager.error('Failure message', 'Failed to Fetch');
      })
    }
    // Object.keys(json).forEach(key => arr.push(json[key]))
    setOptions(Array.from((arr?.map((arr, index) => {
      return {"label": arr.BU_NUM, "value": index}
    }))))
    setRows(arr)
    console.log(arr)
  },[])

  const postAllEventData = () => {
    console.log(rows)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: rows })
      };
      fetch('/postevents', requestOptions)
      .then((response) => {
        response.json()
        NotificationManager.success('Success message', 'Spreadsheets Created');
      })
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (selectedBU) => {
    setFilterBU(selectedBU);
    handleMenuClose();
  };

  const handleMenuOpenBranch = (event) => {
    setAnchorElBranch(event.currentTarget);
  };

  const handleMenuCloseBranch = () => {
    setAnchorElBranch(null);
  };

  const handleFilterChangeBranch = (selectedBUBranch) => {
    setFilterBUBranch(selectedBUBranch);
    handleMenuCloseBranch();
  };

  // const filteredRows = filterBU ? rows.filter((row) => row.BU_NUM === filterBU) : filterBUBranch ? rows.filter((row) => row.BRANCH === filterBUBranch) : rows;
  const filteredRows = filterBU
  ? rows.filter((row) => row.BU_NUM === filterBU)
  : searchText
  ? rows.filter((row) =>
      row.BU_NUM.toString().includes(searchText.toString())
    )
  : filterBUBranch
  ? rows.filter((row) => row.BRANCH === filterBUBranch)
  : searchTextBranch
  ? rows.filter((row) =>
      row.BRANCH.toLowerCase().includes(searchTextBranch.toLowerCase())
    )
  : rows;

  const filteredRowsBranch = filterBUBranch ? rows.filter((row) => row.BRANCH === filterBUBranch) : rows;

  return (
    <div style={{display : 'flex', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 90%), url("https://www.johnlewispartnership.co.uk/content/dam/cws/images/Juniper/shops/Waitrose-and-Partners-Edgware-Road1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'}} >
    <div><NotificationContainer/></div>
    <Box sx= {{
      width: 900,
      height: 720,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      margin: '50px 20px 50px 20px'
    }}>
    <h2>View Entries</h2>
    <Box sx={{
      width: 850,
      height: 480,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '5px',
      margin: '20px',
      overflow: "hidden",
      scrollbarWidth: "none",
      overflowY: "scroll",
      overflowX: "scroll",
    }}>
    {!eventOccurence ? <>
      <Box sx={{
      width: 800,
      height: 300,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      margin: '20px',
    }} class="boxScroll">
    {rows !== null && <TableContainer component={Paper}>
      <Table class="example-table">
        <TableHead>
          <TableRow component={Card}>
            <TableCell>TITLE</TableCell>
            <TableCell align="right">
            <div style={{display : "flex"}}><div style={{paddingTop : "8px"}}>BRANCH</div>
            <div><IconButton onClick={handleMenuOpenBranch}>
              <ArrowDropDown />
            </IconButton></div></div>
            <Menu
              anchorEl={anchorElBranch}
              open={Boolean(anchorElBranch)}
              onClose={handleMenuCloseBranch}
              style={{height: '350px'}}
            >
              {console.log(options)}
              <MenuItem>
                <input
                  type="text"
                  value={searchTextBranch}
                  onChange={(e) => setSearchTextBranch(e.target.value)}
                  placeholder="Search..."
                  style={{
                    width: '100%',
                    padding: '5px',
                    fontSize: '15px',
                  }}
                />
              </MenuItem>
              <MenuItem onClick={() => handleFilterChangeBranch("")}>All</MenuItem>
              {Array.from(new Set(rows?.map((row) => row.BRANCH)))?.map((num) => (
                <MenuItem
                  key={num}
                  onClick={() => handleFilterChangeBranch(num)}
                >
                  {num}
                </MenuItem>
              ))}
            </Menu>
            </TableCell>
            <TableCell align="right">LINK</TableCell>
            <TableCell align="right">DATE</TableCell>
            <TableCell align="right">DISTANCE</TableCell>
            <TableCell align="right">
            <div style={{display : "flex"}}><div style={{paddingTop : "8px"}}>BRANCH_NUM</div>
            <div><IconButton onClick={handleMenuOpen}>
              <ArrowDropDown />
            </IconButton></div></div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              style={{height: '350px'}}
            >
              {console.log(options)}
              <MenuItem>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search..."
                  style={{
                    maxWidth: '80px',
                    padding: '5px',
                    fontSize: '15px',
                  }}
                />
              </MenuItem>

            </Menu>
            </TableCell>
          </TableRow>
        </TableHead>
        {!editMode ? <TableRow>
          <TableCell>
            <TextField
              placeholder="Title"
              value={newRow.TITLE}
              onChange={(e) =>
                setNewRow({ ...newRow, TITLE: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              placeholder="BRANCH_X"
              value={newRow.BRANCH}
              onChange={(e) =>
                setNewRow({ ...newRow, BRANCH: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              placeholder="SOURCE_OF_EVENT"
              value={newRow.SOURCE_OF_EVENT}
              onChange={(e) =>
                setNewRow({ ...newRow, SOURCE_OF_EVENT: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              placeholder="DATE"
              value={newRow.DATETIME}
              onChange={(e) =>
                setNewRow({ ...newRow, SOURCE_OF_EVENT: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              placeholder="DATE"
              value={newRow.DISTANCE}
              onChange={(e) =>
                setNewRow({ ...newRow, DISTANCE: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              placeholder="DATE"
              value={newRow.BU_NUM}
              onChange={(e) =>
                setNewRow({ ...newRow, BU_NUM: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <Button onClick={handleAddRow}>Add</Button>
          </TableCell>
        </TableRow> : <TableRow>
        <TableCell align="right">
          <Button onClick={handleAddRow}>Add</Button>
        </TableCell>
        </TableRow>}
        <TableBody>
          {filteredRows?.length > 0 && filteredRows?.map((row) => (
            <TableRow key={row.GUID}>
              <TableCell
              style ={{ maxWidth: "250px"}}
              >
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.TITLE}
                    onChange={(e) =>
                      setNewRow({ ...newRow, TITLE: e.target.value })
                    }
                  />
                ) : (
                  row.TITLE?.replace("...", "")
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.BRANCH}
                    onChange={(e) =>
                      setNewRow({ ...newRow, BRANCH: e.target.value })
                    }
                  />
                ) : (
                  row.BRANCH
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.SOURCE_OF_EVENT}
                    onChange={(e) =>
                      setNewRow({ ...newRow, SOURCE_OF_EVENT: e.target.value })
                    }
                  />
                ) : (
                  <a href={row.SOURCE_OF_EVENT?.includes('http') ? row.SOURCE_OF_EVENT : 'https://' + row.SOURCE_OF_EVENT}><LaunchIcon /></a>
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.DATETIME}
                    onChange={(e) =>
                      setNewRow({ ...newRow, DATETIME: e.target.value })
                    }
                  />
                ) : (
                  row.DATETIME
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.DISTANCE}
                    onChange={(e) =>
                      setNewRow({ ...newRow, DISTANE: e.target.value })
                    }
                  />
                ) : (
                  row.DISTANCE
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.BU_NUM}
                    onChange={(e) =>
                      setNewRow({ ...newRow, BU_NUM: e.target.value })
                    }
                  />
                ) : (
                  row.BU_NUM
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <IconButton onClick={() => handleSaveRow(row.GUID)}>
                    <Save />
                  </IconButton>
                ) : (
                  <>
                    <IconButton onClick = {() => handleEditRow(row.GUID)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteRow(row.GUID)}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>}
      </Box>
      </> :
      <AddEventOccurence />
    }</Box>
    <button onClick={postAllEventData} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '400px', backgroundColor: '', width: '150px', marginTop: "10px"}}>Save</button>
    <button onClick={() => {setEventOccurence(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '50px', backgroundColor: '', width: '200px'}}>Migrate To SAS</button>
    </Box></div>
  )

}

// <MenuItem onClick={() => handleFilterChange("")}>All</MenuItem>
// {Array.from(new Set(rows?.map((row) => row.BU_NUM)))?.map((num) => (
//   <MenuItem
//     key={num}
//     onClick={() => handleFilterChange(num)}
//   >
//     {num}
//   </MenuItem>
// ))}




// <Switch onChange={handleChange} checked={row.FIXED_ANNUAL_IND} />

// <Box sx={{
//   width: 700,
//   height: 400,
//   backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   borderRadius: '16px',
//   margin: '50px',
//   overflow: "hidden",
//  overflowY: "scroll"
// }}>
// {Object.keys(props.data).map((d) => { return(<Card sx={{ display: 'flex', height: "50px", margin: "5px" }} key={d}>
//       <Box sx={{ display: 'flex', flexDirection: 'column'}} >
//         <CardContent sx={{ flex: '1 0 auto' }}>
//           <Typography component="div" variant="h5">
//             Live From Space
//           <Button color="secondary">View</Button>
//           <Button>Delete</Button>
//           </Typography>
//         </CardContent>
//       </Box>
// </Card>)})}
// </Box>
