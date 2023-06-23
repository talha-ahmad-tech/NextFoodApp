import { usePagination, DOTS } from './usePagination';
import { Icon } from '@fridayfood/shared/components/Icon';
interface IPagination {
  onPageChange: (pages: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}
const Pagination = (props: IPagination) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange =
    (usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) as (string | number)[] | undefined) || [];

  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <>
      <ul className="custom-flex-start py-2 align-items-center">
        <span
          className="mx-2 pagination-buttons-count"
          // style={{ margi }}
        >
          Page:{currentPage} of {lastPage}
        </span>
        <button
          disabled={currentPage === 1}
          onClick={onPrevious}
          className="mx-2"
        >
          <Icon variant="arrowLeft" />
        </button>
        {paginationRange.map((pageNumber: number | string, index: number) => {
          if (pageNumber === DOTS) {
            return (
              <span key={index} className="pagination-item dots">
                &#8230;
              </span>
            );
          }
          return (
            <div
              key={Math.random() * index}
              onClick={() => onPageChange(Number(pageNumber))}
              className={`${
                pageNumber === currentPage ? 'active' : ''
              } pagination-buttons `}
            >
              {pageNumber}
            </div>
          );
        })}
        <button
          disabled={currentPage === lastPage}
          onClick={onNext}
          className="mx-2"
        >
          <Icon variant="arrowRight" />
        </button>
      </ul>
    </>
  );
};

export default Pagination;
