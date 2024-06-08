import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsers,
  deleteUser,
  selectUserData,
  selectUserStatus,
  selectUserError,
  setPage,
  setFilter,
  selectCurrentPage,
  selectFilter,
  selectEntriesPerPage,
  setEntriesPerPage,
  selectTotal,
} from '../state/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);
  const userStatus = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const currentPage = useSelector(selectCurrentPage);
  const filter = useSelector(selectFilter);
  const entriesPerPage = useSelector(selectEntriesPerPage); // Get entriesPerPage from state
  const total = useSelector(selectTotal); // Get totalPages from state
 
  useEffect(() => {
    dispatch(getAllUsers({ page: currentPage, limit: entriesPerPage, filter }));
  }, [currentPage, entriesPerPage, filter, dispatch]);

  const handleEdit = (id) => {
    navigate(`/user/edit/${id}`);
  };
console.log("total",total);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}'s data?`)) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => {
          toast.success(`${name}'s data successfully deleted`);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  const handleFilterChange = (event) => {
    dispatch(setFilter({ ...filter, searchValue: event.target.value }));
  };

  const handleChangePage = (e, newPage) => {
    dispatch(setPage(e.target.value));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setEntriesPerPage(parseInt(event.target.value)));
    dispatch(setPage(1));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        User Dashboard
      </Typography>
      <Box sx={{ mb: 2, display: 'flex'}}>
        <TextField
          label="Search"
          variant="outlined"
          value={filter.searchValue}
          onChange={handleFilterChange}
          
        />
      </Box>
      {userStatus === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {userStatus === 'failed' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={4}>
        {userData.map((user) => (
          <Grid item key={user._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`../../${user.image}`}
                alt={user.fullName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {user.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Password: {user.password}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => handleEdit(user._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(user._id, user.fullName)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center',alignItems:'center' }}>
        <TablePagination
          component="div"
          count={total} // Use totalPages instead of hardcoded count
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={entriesPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};
