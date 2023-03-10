// useEffect & useState
import { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPayment,
  deleteSubscription,
} from "../redux/subscriptionsSlice";
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
  IconButton,
  Chip
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { theme } from "../theme/theme"
// components
import SubscriptionsHeading from "../components/table/SubscriptionsHeading";
import EnhancedTableHead from "../components/table/EnhanceTableHead";
import EnhancedTableToolbar from "../components/table/EnhancedTableToolbar";
import EmptySubscriptionsContainer from "../components/emptyState/subscriptions";
import ConfirmationDialog from "../components/dialog/ConfirmationDialog";
import { complementaryColor } from "../utils/complementaryColor";
// data
import { subscriptionsData, createData } from "../data/tableData";

// --------------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  let valueA = a[orderBy]
  let valueB = b[orderBy]
  //console.log(`a is ${valueA} and b is ${valueB} and orderBy is ${orderBy}`)

  //check orderBy
  if(orderBy === 'nextPaymentDate'){
    valueA = new Date(valueA)
    valueB = new Date(valueB)
  }
  //check type
  if (typeof valueA === 'string' && typeof valueB === 'string'){
    valueA = valueA.toUpperCase()
    valueB = valueB.toUpperCase()
  }
  if (valueB < valueA) {
    return -1;
  }
  if (valueB > valueA) {
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
  let categories = useSelector((state) => state.categories.categories);
  let rows = [];
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("company");
  const [selected, setSelected] = useState([]); // array of row ids selected
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idForEditOrDelete, setIdForEditOrDelete] = useState(null);
  const [filteredRows, setFilteredRows] = useState(subscriptionsData(subscriptions) || []);

  // --------------------------------------------------------------------------

  const categoryColor = (title) => {
    if (title.length !== 0){
      // find category based on title and return its color value
      const cat = categories.find((cat) => cat.title === title);
      return cat.color;
    } else {
      return theme.palette.primary.main;
    }
  }

  const categoryTextColor = (primaryColor) => {
    return complementaryColor(primaryColor);
  }

  // --------------------------------------------------------------------------

  const handleOpenMenu = (event, id) => {
    //console.log("Current target is: ", event.currentTarget);
    setOpen(event.currentTarget);
    setIdForEditOrDelete(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // --------------------------------------------------------------------------

  const handleClickOpenDialog = (event, id) => {
    setIdForEditOrDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


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

  const handleNewPaymentClick = async () => {
    setOpenDialog(false);
    const id = idForEditOrDelete;
    const params = { token, id };
    try {
      const resultAction = await dispatch(createNewPayment(params)).unwrap();
      console.log(resultAction)
      if(resultAction.id){
        const editedRows = filteredRows.map((row) => {
          if(row.id === resultAction.id){
            row = createData(resultAction)
          }
          return row
        })
        setFilteredRows(editedRows)
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDeleteSubClick = async (event, id) => {
    //console.log("Row id to be deleted is: ", id);
    const params = { token, id };
    try {
      const resultAction = await dispatch(deleteSubscription(params)).unwrap();
      if (resultAction.data.message) {
        handleCloseMenu();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleEditSubClick = (event, id) => {
    navigate(`edit/${id}`);
  };

  const onCategoriesChange = (categoriesSelected) => {
    console.log(categoriesSelected.length)
    const categoryValues = categoriesSelected.length > 0 ? categoriesSelected.map((cat) => cat) : [];
    console.log(categoryValues);
    setFilteredRows(rows.filter((row) => {
      if (categoryValues.includes(row.category) || categoryValues.length === 0){
        return row;
      }
    }))
  }

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <>
      {subscriptions.length === 0 ? (
        <EmptySubscriptionsContainer />
      ) : (
        <Container>
          <SubscriptionsHeading addSubscriptionClick={addSubscriptionClick} categories={categories.map((cat => cat.title)) || []} onCategoriesChange={onCategoriesChange}/>
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
                    {stableSort(filteredRows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                            <TableCell align="center">{row.category === "" ? row.category : <Chip label={row.category} sx={{
                              backgroundColor: categoryColor(row.category),
                              color: complementaryColor(categoryColor(row.category))
                            }}/>}</TableCell>
                            <TableCell align="left">
                              {row.nextPaymentDate}
                            </TableCell>
                            <TableCell align="left">
                              {row.paid ? (
                                "Payment made"
                              ) : (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  onClick={(event) =>
                                    handleClickOpenDialog(event, row.id)
                                  }
                                >
                                  Mark as paid
                                </Button>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="large"
                                sx={{ color: `${theme.palette.grey[400]}`,
                                "& .MuiTouchRipple-child": {
                                  backgroundColor: "primary.main",
                              }}}
                                onClick={(event) =>
                                  handleOpenMenu(event, row.id)
                                }
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 20 * emptyRows,
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
      )}

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={(event) => handleEditSubClick(event, idForEditOrDelete)}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={(event) => handleDeleteSubClick(event, idForEditOrDelete)}
        >
          Delete
        </MenuItem>
      </Popover>
      <ConfirmationDialog open={openDialog} title="Mark this billing cycle as paid?" content="By clicking Confirm, you will roll over to the next billing cycle" handleCloseDialog={handleCloseDialog} handleNextPayment={handleNewPaymentClick}/>
    </>
  );
}
