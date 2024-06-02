import React from 'react';
import styles from './styles.module.css';

const ProductCard = ({ product = {} }) => {
    return (
        <div className={styles.card}>
            <div className={styles.product_image}>
                <img src={product.images?.[0]} alt={product.title} />
            </div>
            <div className={styles.product_info}>
                <h4>{product.title}</h4>
                <p>$ {product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;