import React from 'react';
import { motion } from 'framer-motion';

type ICategories = {
  value: number,
  onClickCategory: (id: number) => void,
} 


const listAnimation = {
  hidden: {
    y: 130,
    opacity: 0,
  },
  visible: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.6 },
  })
}

const Categories: React.FC<ICategories> = React.memo(({value, onClickCategory}) => {

  const catigories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые', ]
  return (
    <div className="categories">
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
      >
        {catigories.map((item, id) => (
            <motion.li variants={listAnimation} custom={1} key={id} className={value === id ? 'active' : ''} onClick={() => onClickCategory(id)}>{item}</motion.li>
        ))}
      </motion.ul>
    </div>
  );
});

export default Categories;
