import { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import json from './data.json'

export default function EventsTable(props){
  console.log(props.data)
  // const arr = []
  // Object.keys(json).forEach(key => arr.push(json[key]))
  // console.log(json[0])
  // console.log(arr)
  // const [rows, setRows] = useState([
  //   { id: 1, name: "John Doe", age: 30, email: "johndoe@example.com" },
  //   { id: 2, name: "Jane Doe", age: 25, email: "janedoe@example.com" },
  //   { id: 3, name: "Bob Smith", age: 45, email: "bobsmith@example.com" },
  // ]);
  const [rows, setRows] = useState(props.data)
  const [editId, setEditId] = useState(null);
  const [newRow, setNewRow] = useState({ TITLE: "", DESC: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", DATE: "", DATETIME: "", LINK: "", KEYWORD: "", BRANCH_X: "", BU_NUM: "", COMPETITOR_EVT_INDCHAR: "", EFSEVT_GUID: "", CREATE_USER: "", UPDATE_USER: "" });

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.GUID !== id));
  };

  const handleEditRow = (id) => {
    setEditId(id);
    const row = rows.find((r) => r.GUID === id);
    setNewRow({ TITLE: row.TITLE, DESC: row.DESC, DATE: row.DATE, DATETIME: row.DATETIME, LINK: row.LINK, KEYWORD: row.KEYWORD, BRANCH_X: row.BRANCH_X, BU_NUM: row.BU_NUM, FIXED_ANNUAL_IND: row.FIXED_ANNUAL_IND, PERM_ENV_IND: row.PERM_ENV_IND, CANCELLED_IND: row.CANCELLED_IND, COMPETITOR_EVT_INDCHAR: row.COMPETITOR_EVT_INDCHAR
    , CREATE_USER: row.CREATE_USER, CREATE_USER: row.CREATE_USER, EFSEVT_GUID: row.EFSEVT_GUID });
  };

  const handleSaveRow = (id) => {
    const editedRows = rows.map((row) =>
      row.GUID === id ? { ...row, ...newRow } : row
    );
    setRows(editedRows);
    setEditId(null);
    setNewRow({ TITLE: "", DESC: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", DATE: "", DATETIME: "", LINK: "", KEYWORD: "", BRANCH_X: "", BU_NUM: "", COMPETITOR_EVT_INDCHAR: "", EFSEVT_GUID: "", CREATE_USER: "", UPDATE_USER: "" });
  };

  const handleAddRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    setRows([...rows, { GUID: newId, ...newRow }]);
    setNewRow({ TITLE: "", DESC: "", FIXED_ANNUAL_IND: "", PERM_ENV_IND: "", CANCELLED_IND: "", DATE: "", DATETIME: "", LINK: "", KEYWORD: "", BRANCH_X: "", BU_NUM: "", COMPETITOR_EVT_INDCHAR: "", EFSEVT_GUID: "", GUID: "", CREATE_USER: "", UPDATE_USER: "" });
  };

  return (
    <>
    {rows !== null && <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell align="right">DESC</TableCell>
            <TableCell align="right">FIXED_ANNUAL_IND</TableCell>
            <TableCell align="right">PERM_ENV_IND</TableCell>
            <TableCell align="right">CANCELLED_IND</TableCell>
            <TableCell align="right">DATE</TableCell>
            <TableCell align="right">SDATE</TableCell>
            <TableCell align="right">LINK</TableCell>
            <TableCell align="right">KEYWORD</TableCell>
            <TableCell align="right">CITY</TableCell>
            <TableCell align="right">BRANCH_X</TableCell>
            <TableCell align="right">BU_NUM</TableCell>
            <TableCell align="right">COMPETITOR_EVT_INDCHAR</TableCell>
            <TableCell align="right">EFSEVT_GUID</TableCell>
            <TableCell align="right">GUID</TableCell>
            <TableCell align="right">CREATE_USER</TableCell>
            <TableCell align="right">UPDATE_USER</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows !== null && rows.map((row) => (
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
                  row.TITLE
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.DESC}
                    onChange={(e) =>
                      setNewRow({ ...newRow, DESC: e.target.value })
                    }
                  />
                ) : (
                  row.DESC
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.FIXED_ANNUAL_IND}
                    onChange={(e) =>
                      setNewRow({ ...newRow, FIXED_ANNUAL_IND: e.target.value })
                    }
                  />
                ) : (
                  row.FIXED_ANNUAL_IND
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.PERM_ENV_IND}
                    onChange={(e) =>
                      setNewRow({ ...newRow, PERM_ENV_IND: e.target.value })
                    }
                  />
                ) : (
                  row.PERM_ENV_IND
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.CANCELLED_IND}
                    onChange={(e) =>
                      setNewRow({ ...newRow, CANCELLED_IND: e.target.value })
                    }
                  />
                ) : (
                  row.CANCELLED_IND
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.DATE}
                    onChange={(e) =>
                      setNewRow({ ...newRow, DATE: e.target.value })
                    }
                  />
                ) : (
                  row.DATE
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
                    value={newRow.LINK}
                    onChange={(e) =>
                      setNewRow({ ...newRow, LINK: e.target.value })
                    }
                  />
                ) : (
                  row.LINK
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.KEYWORD}
                    onChange={(e) =>
                      setNewRow({ ...newRow, KEYWORD: e.target.value })
                    }
                  />
                ) : (
                  row.KEYWORD
                )}
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
                  <TextField
                    value={newRow.COMPETITOR_EVT_INDCHAR}
                    onChange={(e) =>
                      setNewRow({ ...newRow, COMPETITOR_EVT_INDCHAR: e.target.value })
                    }
                  />
                ) : (
                  row.COMPETITOR_EVT_INDCHAR
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.EFSEVT_GUID}
                    onChange={(e) =>
                      setNewRow({ ...newRow, EFSEVT_GUID: e.target.value })
                    }
                  />
                ) : (
                  row.EFSEVT_GUID
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.GUID}
                    onChange={(e) =>
                      setNewRow({ ...newRow, GUID: e.target.value })
                    }
                  />
                ) : (
                  row.GUID
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.email}
                    onChange={(e) =>
                      setNewRow({ ...newRow, email: e.target.value })
                    }
                  />
                ) : (
                  row.DATE
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.CREATE_USER}
                    onChange={(e) =>
                      setNewRow({ ...newRow, CREATE_USER: e.target.value })
                    }
                  />
                ) : (
                  row.CREATE_USER
                )}
              </TableCell>
              <TableCell align="right">
                {editId === row.GUID ? (
                  <TextField
                    value={newRow.UPDATE_USER}
                    onChange={(e) =>
                      setNewRow({ ...newRow, UPDATE_USER: e.target.value })
                    }
                  />
                ) : (
                  row.UPDATE_USER
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
        <TableRow>
          <TableCell>
            <TextField
              placeholder="Name"
              value={newRow.name}
              onChange={(e) =>
                setNewRow({ ...newRow, name: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              placeholder="Age"
              value={newRow.age}
              onChange={(e) =>
                setNewRow({ ...newRow, age: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              placeholder="Email"
              value={newRow.email}
              onChange={(e) =>
                setNewRow({ ...newRow, email: e.target.value })
              }
            />
          </TableCell>
          <TableCell align="right">
            <Button onClick={handleAddRow}>Add</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>}
  </>
);
};
