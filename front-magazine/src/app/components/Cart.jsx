'use client'
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import styles from './Cart.module.scss';

export default function Cart({ cart, setCart }) {
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(prev => {
      const productIndex = prev.findIndex(item => item.id === productId);
      if (productIndex === -1) return prev;
      
      const newCart = [...prev];
      if (change > 0) {
        newCart.push(newCart[productIndex]);
      } else {
        const firstIndex = newCart.findIndex(item => item.id === productId);
        if (firstIndex !== -1) {
          newCart.splice(firstIndex, 1);
        }
      }
      return newCart;
    });
  };

  const getProductCount = (productId) => {
    return cart.filter(item => item.id === productId).length;
  };

  const getUniqueProducts = () => {
    const unique = [];
    const seen = new Set();
    cart.forEach(item => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        unique.push(item);
      }
    });
    return unique;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const uniqueProducts = getUniqueProducts();

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Корзина</h1>
        <div className={styles.empty}>
          <p>Ваша корзина пуста</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>
      
      <div className={styles.productsList}>
        {uniqueProducts.map(product => {
          const count = getProductCount(product.id);
          return (
            <div key={product.id} className={styles.productItem}>
              <div className={styles.productImage}>{product.image}</div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>${product.price}</p>
              </div>
              <div className={styles.quantityControls}>
                <button 
                  onClick={() => updateQuantity(product.id, -1)}
                  className={styles.quantityButton}
                >
                  <Minus size={16} />
                </button>
                <span className={styles.quantity}>{count}</span>
                <button 
                  onClick={() => updateQuantity(product.id, 1)}
                  className={styles.quantityButton}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(product.id)}
                className={styles.removeButton}
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.total}>
        <h2>Итого: ${getTotalPrice()}</h2>
        <button className={styles.checkoutButton}>Оформить заказ</button>
      </div>
    </div>
  );
}
