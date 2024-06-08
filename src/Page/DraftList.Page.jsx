import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Box,
    Container,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
    IconButton,
    TextField,
    CircularProgress,
    Alert,
    TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getUserDraftList,
    selectCurrentPage,
    selectDratData,
    selectDratDataError,
    selectDratDataStatus,
    selectEntriesPerPage,
    selectFilter,
    selectTotal,
    setFilter,
    setPage,
    setEntriesPerPage,
    // deletedraft,
} from '../state/features/user/draftSlice';

export const DraftListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const draftData = useSelector(selectDratData);
    const draftStatus = useSelector(selectDratDataStatus);
    const draftError = useSelector(selectDratDataError);
    const currentPage = useSelector(selectCurrentPage);
    const filter = useSelector(selectFilter);
    const entriesPerPage = useSelector(selectEntriesPerPage);
    const total = useSelector(selectTotal);

    useEffect(() => {
        dispatch(getUserDraftList({ page: currentPage, limit: entriesPerPage, filter }));
    }, [currentPage, entriesPerPage, filter, dispatch]);

    const handleEdit = (id) => {
        navigate(`/draft/edit/${id}`);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}'s data?`)) {
            dispatch(deletedraft(id))
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

    const handleChangePage = (event, newPage) => {
        dispatch(setPage(newPage + 1)); // `TablePagination` is zero-indexed, so adjust by +1 for your state
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setEntriesPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(1)); // Reset to first page when entries per page changes
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
                Draft DraftListPage
            </Typography>
            <Box sx={{ mb: 2, display: 'flex' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={filter.searchValue}
                    onChange={handleFilterChange}
                />
            </Box>
            {draftStatus === 'loading' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress />
                </Box>
            )}
            {draftStatus === 'failed' && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {draftError ? draftError : 'Error fetching data.'}
                </Alert>
            )}
            {draftData.length === 0 && draftStatus === 'succeeded' && (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                    No data found.
                </Typography>
            )}
            <Grid container spacing={4}>
                {draftData.map((draft) => (
                    <Grid item key={draft._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                {draft.notes.map((note, index) => (
                                    <Typography key={index} gutterBottom variant="body2" component="p">
                                        {note}
                                    </Typography>
                                ))}
                            </CardContent>
                            <CardActions>
                                <IconButton color="primary" onClick={() => handleEdit(draft._id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDelete(draft._id, draft.fullName)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TablePagination
                    component="div"
                    count={total}
                    page={currentPage - 1} // `TablePagination` is zero-indexed, so adjust by -1 for display
                    onPageChange={handleChangePage}
                    rowsPerPage={entriesPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Container>
    );
};
