import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelectorItems } from '../../store/slices/cart/selectors';
import { addProduct } from '../../store/slices/cart/slice';
import { CartItem } from '../../store/slices/cart/types';
import { motion } from 'framer-motion';

const typeNames = ['тонкое', 'традиционное'];

type IPizzaBlock = {
  id: string, 
  types: number[],
  price: number, 
  sizes: number[], 
  imageUrl: string, 
  title: string, 
}

const PizzaBlock: React.FC<IPizzaBlock> = ({ id, types, price, sizes, imageUrl, title }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeTypes, setActiveTypes] = React.useState(0);
  const cartItem = useSelector(cartSelectorItems(id));
  const dispatch = useDispatch();
  const addedItem = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeTypes],
      count: 0,
    };
    dispatch(addProduct(item));
  };

  const pizzaAnimation = {
    hidden: {
      y: 200,
      opacity: 0,
    },
    visible: (custom: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.8 },
    })
  }
  return (
    <>
      <motion.div className="pizza-block" initial="hidden"
        whileInView="visible" viewport={{amount: 0.2, once: true}} custom={1} variants={pizzaAnimation}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeIdx, id) => (
              <li
                key={id}
                onClick={() => setActiveType(id)}
                className={activeType === id ? 'active' : ''}>
                {typeNames[typeIdx]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((el, id) => (
              <li
                className={activeTypes === id ? 'active' : ''}
                onClick={() => setActiveTypes(id)}
                key={id}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div className='button button--outline button--add'>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span onClick={onClickAdd}>Добавить</span>
            {addedItem > 0 && <i>{addedItem}</i>}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PizzaBlock;
