'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Cart from './Cart';
import Favorites from './Favorites';
import Profile from './Profile';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';


const API_URL = 'http://localhost:8000/api/products/';

export default function MiniShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname()

  const links = [
    {href: '/auth/login', label: 'Войти'},
    {href: '/auth/register', label: 'Регистрация'},
  ]
  
  const isActive = (href) => pathname === href;

  // Загрузка продуктов с API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке продуктов');
        }
        const data = await response.json();
        setProducts(data);
        
        // Устанавливаем максимальную цену для фильтра после загрузки
        if (data.length > 0) {
          const maxPrice = Math.max(...data.map(p => parseFloat(p.price)));
          setPriceRange([0, Math.ceil(maxPrice / 100) * 100]); // Округляем до сотен
        }
      } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки продуктов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Вычисляем максимальную цену для фильтра
  const maxPrice = products.length > 0 
    ? Math.max(...products.map(p => parseFloat(p.price)))
    : 1000;

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = parseFloat(product.price) >= priceRange[0] && parseFloat(product.price) <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  const addToCart = (product, qty = 1) => {
    for (let i = 0; i < qty; i++) {
      setCart(prev => [...prev, product]);
    }
    setSelectedProduct(null);
    setQuantity(1);
  };

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const isFavorite = prev.some(item => item.id === product.id);
      if (isFavorite) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const cartCount = cart.length;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Бургер-меню для каталога */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.catalogButton}
          >
            <Menu size={24} />
            Каталог
          </button>

          {/* Логотип */}
          <div className={styles.logo}>
            <Link href='/'>🛍️ ShopHub</Link>
          </div>

          {/* Поиск */}
          <div className={styles.searchContainer}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Иконки */}
          <div className={styles.iconsContainer}>
            <button 
              onClick={() => setIsFavoritesOpen(true)}
              className={styles.iconButton}
            >
              <Heart size={24} color="#333" />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className={styles.iconButton}
            >
              <ShoppingCart size={24} color="#333" />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </button>

            <button 
              onClick={() => setIsProfileOpen(true)}
              className={styles.iconButton}
            >
              <User size={24} color="#333" />
            </button>
          </div>

          <div className={styles.loginButtonContainer}>
          {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.loginButton} ${
                  isActive(item.href) ? styles.active : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Overlay для затемнения фона */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className={styles.overlay}
        />
      )}

      {/* Боковое меню каталога */}
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        {/* Заголовок меню */}
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Каталог</h3>
          <button
            onClick={() => setIsMenuOpen(false)}
            className={styles.sidebarCloseButton}
          >
            <X size={24} color="white" />
          </button>
        </div>

        {/* Содержимое меню */}
        <div className={styles.sidebarContent}>
          {/* Диапазон цен */}
          <div>
            <h4 className={styles.sectionTitle}>Диапазон цен</h4>
            <div className={styles.priceRangeContainer}>
              <span>{priceRange[0]} $</span>
              <span>{priceRange[1]} $</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxPrice || 1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className={styles.priceRangeSlider}
              style={{
                background: `linear-gradient(to right, #667eea 0%, #667eea ${(priceRange[1] / (maxPrice || 1000)) * 100}%, #e0e0e0 ${(priceRange[1] / (maxPrice || 1000)) * 100}%, #e0e0e0 100%)`
              }}
            />
          </div>

          {/* Кнопка применить */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className={styles.applyFiltersButton}
          >
            Применить фильтры
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h2 className={styles.contentTitle}>
            Все товары
          </h2>
          <span className={styles.productsCount}>
            {filteredProducts.length} товаров
          </span>
        </div>

        {/* Состояние загрузки */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Загрузка товаров...</p>
          </div>
        )}

        {/* Состояние ошибки */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#ff4757' }}>
            <p>Ошибка: {error}</p>
            <p style={{ fontSize: '14px', marginTop: '10px', color: '#666' }}>
              Убедитесь, что backend запущен на http://localhost:8000
            </p>
          </div>
        )}

        {/* Сетка товаров */}
        {!loading && !error && (
          <div className={styles.productsGrid}>
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                <p>Товары не найдены</p>
              </div>
            ) : (
              filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={styles.productCard}
            >
              {/* Изображение товара */}
              <div className={styles.productImage}>
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>📦</div>
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className={styles.favoriteButton}
                >
                  <Heart size={18} color={isFavorite(product.id) ? "#ff4757" : "#ccc"} fill={isFavorite(product.id) ? "#ff4757" : "none"} />
                </button>
              </div>

              {/* Информация о товаре */}
              <div className={styles.productInfo}>
                <div className={styles.productCategory}>
                  Товар
                </div>
                <h3 className={styles.productName}>
                  {product.name}
                </h3>

                <div className={styles.productFooter}>
                  <span className={styles.productPrice}>
                    {parseFloat(product.price).toFixed(2)} $
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className={styles.addToCartButton}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? 'В корзину' : 'Нет в наличии'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
        )}
      </div>

      {/* Модальное окно карточки товара */}
      {selectedProduct && (
        <>
          {/* Overlay */}
          <div
            onClick={() => {
              setSelectedProduct(null);
              setQuantity(1);
            }}
            className={styles.modalOverlay}
          />

          {/* Модальное окно */}
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                setSelectedProduct(null);
                setQuantity(1);
              }}
              className={styles.modalCloseButton}
            >
              <X size={24} color="#333" />
            </button>

            <div className={styles.modalContent}>
              {/* Левая часть - изображение */}
              <div>
                <div className={styles.modalImageContainer}>
                  {selectedProduct.image_url ? (
                    <img src={selectedProduct.image_url} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px' }}>📦</div>
                  )}
                </div>
              </div>

              {/* Правая часть - информация */}
              <div className={styles.modalInfo}>
                {/* Категория */}
                <div className={styles.modalCategory}>
                  Товар
                </div>

                {/* Название */}
                <h2 className={styles.modalTitle}>
                  {selectedProduct.name}
                </h2>

                {/* Цена */}
                <div className={styles.modalPrice}>
                  {parseFloat(selectedProduct.price).toFixed(2)} ₽
                </div>

                {/* Наличие */}
                <div className={`${styles.modalStock} ${selectedProduct.stock > 0 ? styles.modalStockInStock : styles.modalStockOutOfStock}`}>
                  <span className={styles.modalStockIcon}>
                    {selectedProduct.stock > 0 ? '✓' : '✗'}
                  </span>
                  <span className={`${styles.modalStockText} ${selectedProduct.stock > 0 ? styles.modalStockTextInStock : styles.modalStockTextOutOfStock}`}>
                    {selectedProduct.stock > 0 ? `В наличии (${selectedProduct.stock} шт.)` : 'Нет в наличии'}
                  </span>
                </div>

                {/* Описание */}
                {selectedProduct.description && (
                  <div className={styles.modalSection}>
                    <h3 className={styles.modalSectionTitle}>
                      Описание
                    </h3>
                    <p className={styles.modalDescription}>
                      {selectedProduct.description}
                    </p>
                  </div>
                )}

                {/* Выбор количества */}
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>
                    Количество
                  </h3>
                  <div className={styles.modalQuantity}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className={styles.quantityButton}
                    >
                      −
                    </button>

                    <span className={styles.quantityValue}>
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>

                    <span className={styles.quantityTotal}>
                      Итого: ${(selectedProduct.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className={styles.modalActions}>
                  <button
                    onClick={() => addToCart(selectedProduct, quantity)}
                    disabled={selectedProduct.stock <= 0}
                    className={`${styles.modalAddToCartButton} ${selectedProduct.stock > 0 ? styles.modalAddToCartButtonInStock : styles.modalAddToCartButtonOutOfStock}`}
                  >
                    {selectedProduct.stock > 0 ? 'Добавить в корзину' : 'Товар недоступен'}
                  </button>

                  <button 
                    onClick={() => toggleFavorite(selectedProduct)}
                    className={styles.modalFavoriteButton}
                  >
                    <Heart size={24} color={isFavorite(selectedProduct.id) ? "#ff4757" : "#ccc"} fill={isFavorite(selectedProduct.id) ? "#ff4757" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Модальное окно корзины */}
      {isCartOpen && (
        <>
          <div
            onClick={() => setIsCartOpen(false)}
            className={styles.modalOverlay}
          />
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCartOpen(false)}
              className={styles.modalCloseButton}
            >
              <X size={24} color="#333" />
            </button>
            <Cart cart={cart} setCart={setCart} />
          </div>
        </>
      )}

      {/* Модальное окно избранного */}
      {isFavoritesOpen && (
        <>
          <div
            onClick={() => setIsFavoritesOpen(false)}
            className={styles.modalOverlay}
          />
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFavoritesOpen(false)}
              className={styles.modalCloseButton}
            >
              <X size={24} color="#333" />
            </button>
            <Favorites favorites={favorites} setFavorites={setFavorites} />
          </div>
        </>
      )}

      {/* Модальное окно профиля */}
      {isProfileOpen && (
        <>
          <div
            onClick={() => setIsProfileOpen(false)}
            className={styles.modalOverlay}
          />
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsProfileOpen(false)}
              className={styles.modalCloseButton}
            >
              <X size={24} color="#333" />
            </button>
            <Profile />
          </div>
        </>
      )}
    </div>
  );
}