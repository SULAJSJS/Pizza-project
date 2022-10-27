import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { filterSelector } from '../../store/slices/filter/selectors';


type IPagination = {
  onChangePage: (page: number) => void,
  currentPage: number
}

const Pagination: React.FC<IPagination> = ({ onChangePage }) => {
  const { currentPage } = useSelector(filterSelector)
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
