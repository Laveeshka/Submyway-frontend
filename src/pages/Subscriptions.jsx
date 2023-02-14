// useEffect & useState
import { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { createNewPayment, deleteSubscription } from "../redux/subscriptionsSlice";
// navigation
import { Navigate, useNavigate } from "react-router-dom";
// @mui
import {
  Container,
  Box,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  Paper,
  TableCell,
  Checkbox,
  TablePagination,
  Button,
  Popover,
  MenuItem,
  IconButton
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
// components
import SubscriptionsHeading from "../components/table/SubscriptionsHeading";
import EnhancedTableHead from "../components/table/EnhanceTableHead";
import EnhancedTableToolbar from "../components/table/EnhancedTableToolbar";
// data
import { subscriptionsData } from "../data/tableData";

// --------------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// --------------------------------------------------------------------------

export default function Subscriptions() {
  // retrieve state and actions from store
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  let subscriptions = useSelector((state) => state.subscriptions.subscriptions);
  let rows = [];
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("company");
  const [selected, setSelected] = useState([]); // array of row ids selected
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idForEditOrDelete, setIdForEditOrDelete] = useState(null);

  // --------------------------------------------------------------------------
    
    const handleOpenMenu = (event, id) => {
        //console.log("Current target is: ", event.currentTarget);
        setOpen(event.currentTarget);
        setIdForEditOrDelete(id);
    }

    const handleCloseMenu = () => {
        setOpen(null);
    }

  // --------------------------------------------------------------------------

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    //console.log("Row id is: ", id);
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  if (subscriptions.length > 0) {
    rows = subscriptionsData(subscriptions);
    //console.log("Rows are: ", rows);
  }

  // --------------------------------------------------------------------------

  const addSubscriptionClick = () => {
    console.log("Add sub button was clicked!");
    navigate("create");
  };

  const handleNewPaymentClick = (event, id) => {
    //console.log("Row id is: ", id);
    const params = { token, id };
    try {
        const resultAction = dispatch(createNewPayment(params)).unwrap();
      } catch (err) {
        console.warn(err);
      }
  }

  const handleDeleteSubClick = async (event, id) => {
    //console.log("Row id to be deleted is: ", id);
    const params = { token, id };
    try {
        const resultAction = await dispatch(deleteSubscription(params)).unwrap();
        if (resultAction.data.message){
            handleCloseMenu();
        }
      } catch (err) {
        console.warn(err);
      }
  }

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <>
    <Container>
      <SubscriptionsHeading addSubscriptionClick={addSubscriptionClick} />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.company}
                        </TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="left">{row.billing}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="left">
                          {row.nextPaymentDate}
                        </TableCell>
                        <TableCell align="left">
                          {row.paid ? (
                            "Payment made"
                          ) : (
                            <Button variant="outlined" size="small" onClick={(event) => handleNewPaymentClick(event, row.id)}>
                              Pay Now
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row.id)}>
                                <MoreVertIcon />
                            </IconButton>
                     </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>

    <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
            sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75
                }
            }
        }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem onClick={(event) => handleDeleteSubClick(event, idForEditOrDelete)}>Delete</MenuItem>
    </Popover>
    </>
  );
}
