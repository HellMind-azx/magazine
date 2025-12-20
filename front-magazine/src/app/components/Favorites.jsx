'use client'
import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import styles from './Favorites.module.scss';

export default function Favorites({ favorites, setFavorites }) {
  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Избранное</h1>
        <div className={styles.empty}>
          <Heart size={48} color="#ccc" />
          <p>Нет избранных товаров</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>
      
      <div className={styles.productsGrid}>
        {favorites.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>{product.image}</div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productCategory}>{product.category}</p>
              <p className={styles.productPrice}>${product.price}</p>
            </div>
            <button 
              onClick={() => removeFromFavorites(product.id)}
              className={styles.removeButton}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
