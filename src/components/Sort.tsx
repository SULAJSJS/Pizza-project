import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../store/slices/filter/slice';
import { Sort, SortPropertyEnum } from '../store/slices/filter/types';
import { motion } from 'framer-motion';

type SortItem = {
  name: string,
  sortProperty: SortPropertyEnum,
}

type SortProps = {
  setIsOpen: any;
  isOpen: boolean;
  sort: Sort;
}

export const list: SortItem[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

const SortPopup: React.FC<SortProps> = React.memo(({ setIsOpen, isOpen, sort }) => {
  const dispatch = useDispatch();
  const [vector, setVector] = React.useState(false);
  const sortRef = React.useRef(null);

  function handleClick() {
    setVector((vector) => !vector);
    setIsOpen(!isOpen);
  }
  const clickHandle = React.useCallback((id: SortItem) => {
    dispatch(setSort(id));
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        composedPath(): Node[];
      }
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  let onToggleCheck: any = vector ? 'active' : null;

  const sortAnimation = {
    hidden: {
      y: 200,
      opacity: 0,
    },
    visible: (custom: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.4 },
    })
  }
  return (
    <motion.div initial="hidden"
    whileInView="visible" viewport={{amount: 0.2, once: true}} className="sort" ref={sortRef} variants={sortAnimation} custom={2}>
      <div className="sort__label">
        <svg
          className={onToggleCheck}
          onClick={() => handleClick()}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      <div className="sort__popup">
        <ul>
          {isOpen &&
            list.map((item, id) => (
              <li
                key={id}
                className={sort.sortProperty === item.sortProperty ? 'active' : ''}
                onClick={() => clickHandle(item)}>
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
});

export default SortPopup;
