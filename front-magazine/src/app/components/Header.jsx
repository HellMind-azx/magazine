'use client'
import React, { useState } from 'react';
import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Cart from './Cart';
import Favorites from './Favorites';
import Profile from './Profile';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';

// Моковые данные товаров
const mockProducts = [
  {
    id: 1,
    name: 'Беспроводные наушники',
    price: 89.99,
    category: 'Электроника',
    image: '🎧',
    rating: 4.5,
    description: 'Премиальные беспроводные наушники с активным шумоподавлением и превосходным качеством звука. Идеальны для музыки, звонков и работы.',
    features: ['Bluetooth 5.0', 'До 30 часов работы', 'Быстрая зарядка', 'Складная конструкция'],
    inStock: true
  },
  {
    id: 2,
    name: 'Смарт-часы',
    price: 199.99,
    category: 'Электроника',
    image: '⌚',
    rating: 4.8,
    description: 'Многофункциональные смарт-часы с мониторингом здоровья, GPS и влагозащитой. Следите за активностью и получайте уведомления.',
    features: ['Пульсометр', 'Водонепроницаемые', 'GPS навигация', '7 дней автономности'],
    inStock: true
  },
  {
    id: 3,
    name: 'Кожаный рюкзак',
    price: 129.99,
    category: 'Аксессуары',
    image: '🎒',
    rating: 4.3,
    description: 'Стильный рюкзак из натуральной кожи с множеством отделений. Подходит для работы, учебы и путешествий.',
    features: ['Натуральная кожа', 'Отделение для ноутбука', 'USB порт', 'Водоотталкивающее покрытие'],
    inStock: true
  },
  {
    id: 4,
    name: 'Спортивные кроссовки',
    price: 149.99,
    category: 'Обувь',
    image: '👟',
    rating: 4.7,
    description: 'Профессиональные беговые кроссовки с амортизацией и дышащим материалом. Максимальный комфорт при любых нагрузках.',
    features: ['Дышащая сетка', 'Амортизация Air', 'Легкий вес', 'Противоскользящая подошва'],
    inStock: true
  },
  {
    id: 5,
    name: 'Солнцезащитные очки',
    price: 79.99,
    category: 'Аксессуары',
    image: '🕶️',
    rating: 4.2,
    description: 'Модные солнцезащитные очки с поляризационными линзами и UV защитой. Стиль и защита для ваших глаз.',
    features: ['UV400 защита', 'Поляризация', 'Легкая оправа', 'Прочный футляр в комплекте'],
    inStock: false
  },
  {
    id: 6,
    name: 'Портативная колонка',
    price: 59.99,
    category: 'Электроника',
    image: '🔊',
    rating: 4.6,
    description: 'Компактная беспроводная колонка с мощным звуком и защитой от воды. Отличный выбор для пикников и вечеринок.',
    features: ['360° звук', 'Водонепроницаемая', '12 часов работы', 'Bluetooth и AUX'],
    inStock: true
  },
  {
    id: 7,
    name: 'Фитнес-браслет',
    price: 49.99,
    category: 'Электроника',
    image: '📱',
    rating: 4.4,
    description: 'Удобный фитнес-трекер для отслеживания активности, сна и калорий. Мотивация к здоровому образу жизни на вашем запястье.',
    features: ['Счетчик шагов', 'Мониторинг сна', 'Уведомления', 'Сменные ремешки'],
    inStock: true
  },
  {
    id: 8,
    name: 'Дизайнерская футболка',
    price: 39.99,
    category: 'Одежда',
    image: '👕',
    rating: 4.1,
    description: 'Стильная футболка из премиум хлопка с уникальным принтом. Комфорт и стиль на каждый день.',
    features: ['100% хлопок', 'Дизайнерский принт', 'Не выцветает', 'Удобная посадка'],
    inStock: true
  },
];

const categories = ['Все', 'Электроника', 'Аксессуары', 'Обувь', 'Одежда'];

export default function MiniShop() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
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
  // Фильтрация товаров
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
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
          {/* Категории */}
          <div>
            <h4 className={styles.sectionTitle}>Категории</h4>
            <div className={styles.categoriesList}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsMenuOpen(false);
                  }}
                  className={`${styles.categoryButton} ${selectedCategory === cat ? styles.categoryButtonActive : ''}`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Диапазон цен */}
          <div>
            <h4 className={styles.sectionTitle}>Диапазон цен</h4>
            <div className={styles.priceRangeContainer}>
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className={styles.priceRangeSlider}
              style={{
                background: `linear-gradient(to right, #667eea 0%, #667eea ${(priceRange[1] / 300) * 100}%, #e0e0e0 ${(priceRange[1] / 300) * 100}%, #e0e0e0 100%)`
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
            {selectedCategory === 'Все' ? 'Все товары' : selectedCategory}
          </h2>
          <span className={styles.productsCount}>
            {filteredProducts.length} товаров
          </span>
        </div>

        {/* Сетка товаров */}
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={styles.productCard}
            >
              {/* Изображение товара */}
              <div className={styles.productImage}>
                {product.image}
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
                  {product.category}
                </div>
                <h3 className={styles.productName}>
                  {product.name}
                </h3>

                <div className={styles.productRating}>
                  <span className={styles.ratingStar}>★</span>
                  <span className={styles.ratingValue}>{product.rating}</span>
                </div>

                <div className={styles.productFooter}>
                  <span className={styles.productPrice}>
                    ${product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className={styles.addToCartButton}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
                  {selectedProduct.image}
                </div>

                {/* Миниатюры (для демонстрации) */}
                <div className={styles.modalThumbnails}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`${styles.modalThumbnail} ${i === 1 ? styles.modalThumbnailActive : ''}`}
                    >
                      {selectedProduct.image}
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая часть - информация */}
              <div className={styles.modalInfo}>
                {/* Категория */}
                <div className={styles.modalCategory}>
                  {selectedProduct.category}
                </div>

                {/* Название */}
                <h2 className={styles.modalTitle}>
                  {selectedProduct.name}
                </h2>

                {/* Рейтинг */}
                <div className={styles.modalRating}>
                  <div className={styles.modalStars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`${styles.modalStar} ${i < Math.floor(selectedProduct.rating) ? styles.modalStarFilled : styles.modalStarEmpty}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={styles.modalRatingValue}>
                    {selectedProduct.rating}
                  </span>
                  <span className={styles.modalReviews}>
                    (128 отзывов)
                  </span>
                </div>

                {/* Цена */}
                <div className={styles.modalPrice}>
                  ${selectedProduct.price}
                </div>

                {/* Наличие */}
                <div className={`${styles.modalStock} ${selectedProduct.inStock ? styles.modalStockInStock : styles.modalStockOutOfStock}`}>
                  <span className={styles.modalStockIcon}>
                    {selectedProduct.inStock ? '✓' : '✗'}
                  </span>
                  <span className={`${styles.modalStockText} ${selectedProduct.inStock ? styles.modalStockTextInStock : styles.modalStockTextOutOfStock}`}>
                    {selectedProduct.inStock ? 'В наличии' : 'Нет в наличии'}
                  </span>
                </div>

                {/* Описание */}
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>
                    Описание
                  </h3>
                  <p className={styles.modalDescription}>
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Характеристики */}
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>
                    Особенности
                  </h3>
                  <div className={styles.modalFeatures}>
                    {selectedProduct.features.map((feature, index) => (
                      <div
                        key={index}
                        className={styles.modalFeature}
                      >
                        <span className={styles.modalFeatureIcon}>✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

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
                    disabled={!selectedProduct.inStock}
                    className={`${styles.modalAddToCartButton} ${selectedProduct.inStock ? styles.modalAddToCartButtonInStock : styles.modalAddToCartButtonOutOfStock}`}
                  >
                    {selectedProduct.inStock ? 'Добавить в корзину' : 'Товар недоступен'}
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