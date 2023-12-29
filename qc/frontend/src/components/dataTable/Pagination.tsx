import { FC, useState } from "react";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

interface PaginationProps {
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  handleItemsPerPageChange: (value: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  itemsPerPageOptions,
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
  handleItemsPerPageChange,
}) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);

  const [prevButtonDisabled, setPrevButtonDisabled] = useState(currentPage === 1);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(currentPage === pageNumbers);

  const startItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const endItemIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageNumbers) {
      paginate(page);
      setPrevButtonDisabled(page === 1);
      setNextButtonDisabled(page === pageNumbers);
    }
  };
  return (
    <div style={{display:"flex"}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body1" style={{ marginRight: "10px" }}>
        Rows per page:
        </Typography>
        <Select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          // style={{ border: "none", outline: "none" , padding:"0px"}}
          // sx={{
          //   '& .MuiSelect-root': {
          //     boxShadow: 'none',
          //     border: 'none',
          //     '&:focus': {
          //       boxShadow: 'none',
          //       border: 'none',
          //     },
          //   },
          // }}
          size="small"
          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },'.MuiOutlinedInput-input&:focus': { border: 0 , outline:0, boxShadow:'none'}}}
        >
          {itemsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2" style={{ marginRight: "10px" }}>
       {startItemIndex} - {endItemIndex} of {totalItems}
      </Typography>
      </div>
      <ul className="paginationWrapper">
        <li className="paginationItem">
          <button onClick={() => handlePageChange(1)} className="" disabled={prevButtonDisabled}>
            <KeyboardDoubleArrowLeftIcon />
          </button>
        </li>
        <li className="paginationItem">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={` ${currentPage === 1 ? "disabled" : ""}`}
            disabled={prevButtonDisabled}
          >
            <KeyboardArrowLeftIcon/>
          </button>
        </li>
        <li className="paginationItem">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={` ${currentPage === pageNumbers ? "disabled" : ""}`}
            disabled={nextButtonDisabled}
          >
            <KeyboardArrowRightIcon/>
          </button>
        </li>
        <li className="paginationItem">
          <button onClick={() => handlePageChange(pageNumbers)} className=""
          disabled={nextButtonDisabled}>
            <KeyboardDoubleArrowRightIcon/>
          </button>
        </li>
      </ul>
      
    </div>
  );
};

export default Pagination;
