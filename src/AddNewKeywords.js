import React, { useState, useEffect } from "react";
import json from './data.json'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Text } from '@mantine/core';
import AddEventOccurence from './AddEventOccurence'
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
import './ViewAndModifyEvents.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import LaunchIcon from '@mui/icons-material/Launch';
import Switch from "react-switch";

export default function ViewAndModifyEvents(props){

  const [data, setdata] = useState()
  const [respone, setResponse] = useState()
  const [eventOccurence, setEventOccurence] = useState(false)
  const arr = []
  const new_arr = []
  Object.keys(json).forEach(key => arr.push(json[key]))
  const [tableArr,setTableArr] = useState(arr)
  const [rows, setRows] = useState()
  const [editId, setEditId] = useState(null);
  const [newRow, setNewRow] = useState({ TITLE: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", BRANCH_X: ""});
  const [checked, setChecked] = useState(false)

  const [editMode, setEditMode] = useState(false)
  let initialized = false

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.GUID !== id));
  };

  const handleEditRow = (id) => {
    setEditMode(true)
    setEditId(id);
    const row = rows.find((r) => r.GUID === id);
    setNewRow({ TITLE: row.TITLE, BRANCH_X: row.BRANCH_X, FIXED_ANNUAL_IND: row.FIXED_ANNUAL_IND, PERM_ENV_IND: row.PERM_ENV_IND, CANCELLED_IND: row.CANCELLED_IND, SOURCE_OF_EVENT: row.SOURCE_OF_EVENT});
  };

  const handleSaveRow = (id) => {
    setEditMode(false)
    const editedRows = rows?.map((row) =>
      row.GUID === id ? { ...row, ...newRow } : row
    );
    setRows(editedRows);
    setEditId(null);
    setNewRow({ TITLE: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", BRANCH_X: "", SOURCE_OF_EVENT: "" });
  };

  const handleAddRow = () => {
    const today = new Date();
    const date = today.setDate(today.getDate());
    console.log(date)
    const newId = rows["length"] > 0 ? rows[rows["length"] - 1].GUID + 1 : date;
    setRows([...rows, { GUID: newId, EFSEVT_GUID: newId *2, ...newRow }]);
    setNewRow({ TITLE: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", BRANCH_X: "", SOURCE_OF_EVENT: "" });
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
          console.log("IN")
          setRows(new_arr)
          NotificationManager.success('Success message', 'EventsList Added');
        }).catch((err) => {
          NotificationManager.error('Failure message', 'Failed to Fetch');
        })
      })}
    // Object.keys(json).forEach(key => arr.push(json[key]))

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
      height: 500,
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
            <TableCell align="right">PERM_ENV_EVT</TableCell>
            <TableCell align="right">BRANCH</TableCell>
            <TableCell align="right">LINK</TableCell>
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
          <TableRow>
            <TableCell>
            FIXED_ANNUAL_IND <TextField
              placeholder="FIXED_ANNUAL_IND"
              value={newRow.FIXED_ANNUAL_IND}
              onChange={(e) =>
                setNewRow({ ...newRow, FIXED_ANNUAL_IND: e.target.value })
              }
              inputProps={{
                style: { width: "40px", height: "20px", padding: "0px 0px 0px 2px"}
              }}
            />
          </TableCell>
          </TableRow>
          <TableRow>
          <TableCell align="right">
            PERM_ENV_IND <TextField
              placeholder="PERM_ENV_IND"
              value={newRow.PERM_ENV_IND}
              onChange={(e) =>
                setNewRow({ ...newRow, PERM_ENV_IND: e.target.value })
              }
              inputProps={{
                style: { width: "40px", height: "20px", padding: "0px 0px 0px 2px"}
              }}
            />
          </TableCell>
          </TableRow>
          <TableRow>
          <TableCell align="right">
            CANCELLED_IND <TextField
              placeholder="CANCELLED_IND"
              value={newRow.CANCELLED_IND}
              onChange={(e) =>
                setNewRow({ ...newRow, CANCELLED_IND: e.target.value })
              }
              inputProps={{
                style: { width: "40px", height: "20px", padding: "0px 0px 0px 2px"}
              }}
            />
          </TableCell>
          </TableRow>
          </TableCell>
          <TableCell align="right">
            <TextField
              placeholder="BRANCH_X"
              value={newRow.BRANCH_X}
              onChange={(e) =>
                setNewRow({ ...newRow, BRANCH_X: e.target.value })
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
            <Button onClick={handleAddRow}>Add</Button>
          </TableCell>
        </TableRow> : <TableRow>
        <TableCell align="right">
          <Button onClick={handleAddRow}>Add</Button>
        </TableCell>
        </TableRow>}
        <TableBody>
          {rows !== null && rows?.map((row) => (
            <TableRow key={row.GUID}>
              <TableCell>
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.TITLE}
                    onChange={(e) =>
                      setNewRow({ ...newRow, TITLE: e.target.value })
                    }
                  />
                ) : (
                  row.TITLE.replace("...", "")
                )}
              </TableCell>
            <TableCell align="right">
              <TableRow>
              <TableCell>
                {editId === row.GUID ? (
                  <div style={{display: "flex"}}>FIXED_ANNUAL_EVT:
                  <TextField
                    value={newRow.FIXED_ANNUAL_IND}
                    onChange={(e) =>
                      setNewRow({ ...newRow, FIXED_ANNUAL_IND: e.target.value })
                    }
                    inputProps={{
                      style: { width: "40px", height: "20px", padding: "0px 0px 0px 2px"}
                    }}
                  />
                  </div>
                ) : (
                  <div style={{ display: "flex"}}>FIXED_ANNUAL_IND
                    <span style={{ padding: "2px"}}><Switch checked={row.FIXED_ANNUAL_IND == 'y' ? true : false} height={20} width={35}/></span>
                  </div>
                )}
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                {editId === row.GUID ? (
                  <div style={{display: "flex"}}>PERM_ENV_IND:
                  <TextField
                    value={newRow.PERM_ENV_IND}
                    onChange={(e) =>
                      setNewRow({ ...newRow, PERM_ENV_IND: e.target.value })
                    }
                    inputProps={{
                      style: { width: "40px", height: "20px", padding: "0px 0px 0px 2px"}
                    }}
                  />
                  </div>
                ) : (
                  <div style={{ display: "flex"}}>PERM_ENV_IND
                    <Switch checked={row.PERM_ENV_IND == 'y' ? true : false}/>
                  </div>
                )}
                </TableCell>
                </TableRow>
              <TableRow>
              <TableCell>
                {editId === row.GUID ? (
                  <div style={{display: "flex"}}>CANCELLED_IND:
                  <TextField
                    value={newRow.CANCELLED_IND}
                    onChange={(e) =>
                      setNewRow({ ...newRow, CANCELLED_IND: e.target.value })
                    }
                    inputProps={{
                      style: { width: "40px", height: "20px", padding: "0px 0px 0px 2px"}
                    }}
                  />
                  </div>
                ) : (
                  <div style={{ display: "flex"}}>CANCELLED_IND
                    <Switch checked={row.CANCELLED_IND == 'y' ? true : false}/>
                  </div>
                )}
                </TableCell>
              </TableRow>
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.BRANCH_X}
                    onChange={(e) =>
                      setNewRow({ ...newRow, BRANCH_X: e.target.value })
                    }
                  />
                ) : (
                  row.BRANCH_X
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
                  <a href={row.SOURCE_OF_EVENT.includes('http') ? row.SOURCE_OF_EVENT : 'https://' + row.SOURCE_OF_EVENT}><LaunchIcon /></a>
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


// ##############################################


// import React, { useState, useEffect } from "react";
// import json from './data.json'
// import Card from '@mui/material/Card';
// import Box from '@mui/material/Box';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Text } from '@mantine/core';
// import AddEventOccurence from './AddEventOccurence'
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TextField,
//   IconButton,
//   Paper
// } from "@mui/material";
// import { Delete, Edit, Save } from "@mui/icons-material";
// import './ViewAndModifyEvents.css';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import LaunchIcon from '@mui/icons-material/Launch';
// import Switch from "react-switch";
//
// export default function ViewAndModifyEvents(props){
//
//   const [data, setdata] = useState()
//   const [respone, setResponse] = useState()
//   const [eventOccurence, setEventOccurence] = useState(false)
//   const arr = []
//   const new_arr = []
//   Object.keys(json).forEach(key => arr.push(json[key]))
//   const [tableArr,setTableArr] = useState(arr)
//   const [rows, setRows] = useState()
//   const [editId, setEditId] = useState(null);
//   const [newRow, setNewRow] = useState({ TITLE: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", BRANCH_X: ""});
//   const [checked, setChecked] = useState(false)
//
//   const [editMode, setEditMode] = useState(false)
//   let initialized = false
//
//   const handleDeleteRow = (id) => {
//     setRows(rows.filter((row) => row.GUID !== id));
//   };
//
//   const handleEditRow = (id) => {
//     setEditMode(true)
//     setEditId(id);
//     const row = rows.find((r) => r.GUID === id);
//     setNewRow({ TITLE: row.TITLE, BRANCH_X: row.BRANCH_X, FIXED_ANNUAL_IND: row.FIXED_ANNUAL_IND, PERM_ENV_IND: row.PERM_ENV_IND, CANCELLED_IND: row.CANCELLED_IND, SOURCE_OF_EVENT: row.SOURCE_OF_EVENT});
//   };
//
//   const handleSaveRow = (id) => {
//     setEditMode(false)
//     const editedRows = rows?.map((row) =>
//       row.GUID === id ? { ...row, ...newRow } : row
//     );
//     setRows(editedRows);
//     setEditId(null);
//     setNewRow({ TITLE: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", BRANCH_X: "", SOURCE_OF_EVENT: "" });
//   };
//
//   const handleAddRow = () => {
//     const today = new Date();
//     const date = today.setDate(today.getDate());
//     console.log(date)
//     const newId = rows["length"] > 0 ? rows[rows["length"] - 1].GUID + 1 : date;
//     setRows([...rows, { GUID: newId, EFSEVT_GUID: newId *2, ...newRow }]);
//     setNewRow({ TITLE: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", BRANCH_X: "", SOURCE_OF_EVENT: "" });
//   };
//
//   const handleChange = () => {
//     setChecked(true)
//     setNewRow({ ...newRow, FIXED_ANNUAL_IND: 'y' })
//   }
//
//   useEffect(() => {
//     console.log("INI")
//     if (!initialized) {
//       initialized = true
//         fetch("/fetchevents").then((res) =>{
//         res.json().then((data) => {
//           // Setting a data from api
//           setResponse(data)
//           console.log(data)
//           Object.keys(data).forEach(key => new_arr.push(data[key]))
//           console.log("IN")
//           setRows(new_arr)
//           NotificationManager.success('Success message', 'EventsList Added');
//         }).catch((err) => {
//           NotificationManager.error('Failure message', 'Failed to Fetch');
//         })
//       })}
//     // Object.keys(json).forEach(key => arr.push(json[key]))
//
//     setRows(arr)
//     console.log(arr)
//   },[])
//
//   const postAllEventData = () => {
//     console.log(rows)
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ data: rows })
//       };
//       fetch('/postevents', requestOptions)
//       .then((response) => {
//         response.json()
//         NotificationManager.success('Success message', 'Spreadsheets Created');
//       })
//   }
//
//   return (
//     <div style={{display : 'flex', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 90%), url("https://www.johnlewispartnership.co.uk/content/dam/cws/images/Juniper/shops/Waitrose-and-Partners-Edgware-Road1.jpg")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat'}} >
//     <div><NotificationContainer/></div>
//     <Box sx= {{
//       width: 900,
//       height: 720,
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//       borderRadius: '16px',
//       margin: '50px 20px 50px 20px'
//     }}>
//     <h2>View Entries</h2>
//     <Box sx={{
//       width: 850,
//       height: 500,
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//       borderRadius: '5px',
//       margin: '20px',
//       overflow: "hidden",
//       scrollbarWidth: "none",
//       overflowY: "scroll",
//       overflowX: "scroll",
//     }}>
//     {!eventOccurence ? <>
//       <Box sx={{
//       width: 800,
//       height: 300,
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//       margin: '20px',
//     }} class="boxScroll">
//     {rows !== null && <TableContainer component={Paper}>
//       <Table class="example-table">
//         <TableHead>
//           <TableRow component={Card}>
//             <TableCell>TITLE</TableCell>
//             <TableCell align="right">FIXED_ANNUAL_EVT</TableCell>
//             <TableCell align="right">PERM_ENV_EVT</TableCell>
//             <TableCell align="right">CANCELLED_EVT</TableCell>
//             <TableCell align="right">BRANCH</TableCell>
//             <TableCell align="right">LINK</TableCell>
//           </TableRow>
//         </TableHead>
//         {!editMode ? <TableRow>
//           <TableCell>
//             <TextField
//               placeholder="Title"
//               value={newRow.TITLE}
//               onChange={(e) =>
//                 setNewRow({ ...newRow, TITLE: e.target.value })
//               }
//             />
//           </TableCell>
//           <TableCell align="right">
//             <TextField
//               placeholder="FIXED_ANNUAL_IND"
//               value={newRow.FIXED_ANNUAL_IND}
//               onChange={(e) =>
//                 setNewRow({ ...newRow, FIXED_ANNUAL_IND: e.target.value })
//               }
//             />
//           </TableCell>
//           <TableCell align="right">
//             <TextField
//               placeholder="PERM_ENV_IND"
//               value={newRow.PERM_ENV_IND}
//               onChange={(e) =>
//                 setNewRow({ ...newRow, PERM_ENV_IND: e.target.value })
//               }
//             />
//           </TableCell>
//           <TableCell align="right">
//             <TextField
//               placeholder="CANCELLED_IND"
//               value={newRow.CANCELLED_IND}
//               onChange={(e) =>
//                 setNewRow({ ...newRow, CANCELLED_IND: e.target.value })
//               }
//             />
//           </TableCell>
//           <TableCell align="right">
//             <TextField
//               placeholder="BRANCH_X"
//               value={newRow.BRANCH_X}
//               onChange={(e) =>
//                 setNewRow({ ...newRow, BRANCH_X: e.target.value })
//               }
//             />
//           </TableCell>
//           <TableCell align="right">
//             <TextField
//               placeholder="SOURCE_OF_EVENT"
//               value={newRow.SOURCE_OF_EVENT}
//               onChange={(e) =>
//                 setNewRow({ ...newRow, SOURCE_OF_EVENT: e.target.value })
//               }
//             />
//           </TableCell>
//           <TableCell align="right">
//             <Button onClick={handleAddRow}>Add</Button>
//           </TableCell>
//         </TableRow> : <TableRow>
//         <TableCell align="right">
//           <Button onClick={handleAddRow}>Add</Button>
//         </TableCell>
//         </TableRow>}
//         <TableBody>
//           {rows !== null && rows?.map((row) => (
//             <TableRow key={row.GUID}>
//               <TableCell>
//                 {editId === row.GUID ? (
//                   <TextField
//                     value={newRow.TITLE}
//                     onChange={(e) =>
//                       setNewRow({ ...newRow, TITLE: e.target.value })
//                     }
//                   />
//                 ) : (
//                   row.TITLE.replace("...", "")
//                 )}
//               </TableCell>
//               <TableCell align="right">
//                 {editId === row.GUID ? (
//                   <TextField
//                     value={newRow.FIXED_ANNUAL_IND}
//                     onChange={(e) =>
//                       setNewRow({ ...newRow, FIXED_ANNUAL_IND: e.target.value })
//                     }
//                   />
//                 ) : (
//                   row.FIXED_ANNUAL_IND
//                 )}
//               </TableCell>
//               <TableCell align="right">
//                 {editId === row.GUID ? (
//                   <TextField
//                     value={newRow.PERM_ENV_IND}
//                     onChange={(e) =>
//                       setNewRow({ ...newRow, PERM_ENV_IND: e.target.value })
//                     }
//                   />
//                 ) : (
//                   row.PERM_ENV_IND
//                 )}
//               </TableCell>
//               <TableCell align="right">
//                 {editId === row.GUID ? (
//                   <TextField
//                     value={newRow.CANCELLED_IND}
//                     onChange={(e) =>
//                       setNewRow({ ...newRow, CANCELLED_IND: e.target.value })
//                     }
//                   />
//                 ) : (
//                   row.CANCELLED_IND
//                 )}
//               </TableCell>
//               <TableCell align="right">
//                 {editId === row.GUID ? (
//                   <TextField
//                     value={newRow.BRANCH_X}
//                     onChange={(e) =>
//                       setNewRow({ ...newRow, BRANCH_X: e.target.value })
//                     }
//                   />
//                 ) : (
//                   row.BRANCH_X
//                 )}
//               </TableCell>
//               <TableCell align="right">
//                 {editId === row.GUID ? (
//                   <TextField
//                     value={newRow.SOURCE_OF_EVENT}
//                     onChange={(e) =>
//                       setNewRow({ ...newRow, SOURCE_OF_EVENT: e.target.value })
//                     }
//                   />
//                 ) : (
//                   <a href={row.SOURCE_OF_EVENT.includes('http') ? row.SOURCE_OF_EVENT : 'https://' + row.SOURCE_OF_EVENT}><LaunchIcon /></a>
//                 )}
//               </TableCell>
//               <TableCell align="right">
//                 {editId === row.GUID ? (
//                   <IconButton onClick={() => handleSaveRow(row.GUID)}>
//                     <Save />
//                   </IconButton>
//                 ) : (
//                   <>
//                     <IconButton onClick = {() => handleEditRow(row.GUID)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteRow(row.GUID)}>
//                     <Delete />
//                   </IconButton>
//                 </>
//               )}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>}
//       </Box>
//       </> :
//       <AddEventOccurence />
//     }</Box>
//     <button onClick={postAllEventData} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '400px', backgroundColor: '', width: '150px', marginTop: "10px"}}>Save</button>
//     <button onClick={() => {setEventOccurence(true)}} color="secondary" variant="outlined" class='keyword' style={{marginLeft: '50px', backgroundColor: '', width: '200px'}}>Migrate To SAS</button>
//     </Box></div>
//   )
//
// }

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
