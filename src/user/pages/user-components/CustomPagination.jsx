import { Stack, Pagination } from '@mui/material';

const CustomPagination = ({ currentPage, totalPages, handlePageChange, disabled }) => {
  console.log('current page : ',currentPage);
  return (
    <Stack spacing={2} direction="row" justifyContent="center">
      <Pagination
        count={totalPages}
        page={currentPage + 1}
        onChange={(event, page) => handlePageChange(page - 1)}
        shape="rounded"
        disabled={disabled}
      />
    </Stack>
  );
};

export default CustomPagination;
