import React from 'react';
import styles from './NotFound.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
        <h1>
            <span>😕</span>
            <br />
            Ничего не найдено
        </h1>
        <p>Извените, но этой страницы не сушествует, просим вас перепроверить адрес ссылки</p>
    </div>
  )
}

export default NotFoundBlock