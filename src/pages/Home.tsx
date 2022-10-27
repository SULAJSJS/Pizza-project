import React from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { list } from '../components/Sort';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../store/slices/filter/slice';

import {add} from '../utils/math';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../store/slices/pizza/asyncAtions';
import { useAppDispatch } from '../store';
import { filterSelector } from '../store/slices/filter/selectors';
import { pizzaSelector } from '../store/slices/pizza/selectors';
import { SearchPizzaParams } from '../store/slices/pizza/types';
import { motion } from 'framer-motion';
const Home = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  add(77, 888);

  const onClickHandle = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  // Парсим
  React.useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(setFilters({
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || list[0],
        searchValue: params.search
      }));
      isSearch.current = true;
    }
  }, []);

  // Запрос на пиццы
  React.useEffect(() => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;
    if (!isSearch.current) {
      dispatch(
        // @ts-ignore
        fetchPizzas({
          sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
        }));
    } 
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage, searchValue]);

  // Проверяем был ли рендер и вшиваем в URL параметры
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const textAnimation = {
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

  const pizzas = items?.map((item: any) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  return (
    <motion.div initial="hidden"
    whileInView="visible" viewport={{amount: 0.2, once: true}} className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickHandle} />
        <Sort isOpen={isOpen} setIsOpen={setIsOpen} sort={sort} />
      </div>
      <motion.h2 className="content__title" variants={textAnimation} custom={2}>Все пиццы</motion.h2>
      <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </motion.div>
  );
};

export default Home;
