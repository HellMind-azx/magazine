'use client'
import React, { useState } from 'react';
import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const cartCount = cart.length;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem'
        }}>
          {/* Бургер-меню для каталога */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#333'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            <Menu size={24} />
            Каталог
          </button>

          {/* Логотип */}
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🛍️ ShopHub
          </div>

          {/* Поиск */}
          <div style={{
            flex: 1,
            position: 'relative',
            maxWidth: '500px'
          }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999'
            }} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '50px',
                border: '2px solid #e0e0e0',
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Иконки */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
              <Heart size={24} color="#333" />
            </button>
            
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
              <ShoppingCart size={24} color="#333" />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: '#ff4757',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>{cartCount}</span>
              )}
            </button>

            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
              <User size={24} color="#333" />
            </button>
          </div>

          <div style={{
            display:'flex',
            alignItems:'center',
          }}>
            <button style={{
                 background: '#667eea',
                 border: '2px solid #667eea',
                 cursor: 'pointer',
                 color: 'white',
                 padding: '0.5rem 1rem',
                 borderRadius: '0.7rem',
                 transition: 'background 0.3s'
            }}>Войти</button>
          </div>
        </div>
      </header>

      {/* Overlay для затемнения фона */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 150,
            animation: 'fadeIn 0.3s ease'
          }}
        />
      )}

      {/* Боковое меню каталога */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: isMenuOpen ? 0 : '-320px',
        height: '100vh',
        width: '320px',
        background: 'white',
        zIndex: 200,
        transition: 'left 0.3s ease',
        boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
        overflowY: 'auto'
      }}>
        {/* Заголовок меню */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '1.3rem',
            fontWeight: '700',
            color: 'white'
          }}>Каталог</h3>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            <X size={24} color="white" />
          </button>
        </div>

        {/* Содержимое меню */}
        <div style={{ padding: '1.5rem' }}>
          {/* Категории */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#666',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Категории</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    padding: '0.8rem 1rem',
                    border: 'none',
                    borderRadius: '10px',
                    background: selectedCategory === cat ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f5f5f5',
                    color: selectedCategory === cat ? 'white' : '#333',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: selectedCategory === cat ? '600' : '400',
                    transition: 'all 0.3s',
                    fontSize: '0.95rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.background = '#e8e8e8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.background = '#f5f5f5';
                    }
                  }}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Диапазон цен */}
          <div>
            <h4 style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#666',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Диапазон цен</h4>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#333'
            }}>
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '5px',
                background: `linear-gradient(to right, #667eea 0%, #667eea ${(priceRange[1]/300)*100}%, #e0e0e0 ${(priceRange[1]/300)*100}%, #e0e0e0 100%)`,
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Кнопка применить */}
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              width: '100%',
              marginTop: '2rem',
              padding: '0.9rem',
              border: 'none',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
          >
            Применить фильтры
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: '700',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {selectedCategory === 'Все' ? 'Все товары' : selectedCategory}
          </h2>
          <span style={{
            color: 'white',
            fontSize: '0.95rem',
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)'
          }}>
            {filteredProducts.length} товаров
          </span>
        </div>

        {/* Сетка товаров */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
              }}
            >
              {/* Изображение товара */}
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
                position: 'relative'
              }}>
                {product.image}
                <button style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  <Heart size={18} color="#ff4757" />
                </button>
              </div>

              {/* Информация о товаре */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {product.category}
                </div>
                <h3 style={{
                  margin: '0 0 0.75rem 0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {product.name}
                </h3>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ color: '#ffa502' }}>★</span>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>{product.rating}</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#667eea'
                  }}>
                    ${product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    style={{
                      padding: '0.6rem 1.25rem',
                      border: 'none',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                    }}
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
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 300,
              animation: 'fadeIn 0.3s ease'
            }}
          />

          {/* Модальное окно */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              borderRadius: '24px',
              width: '90%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflowY: 'auto',
              zIndex: 400,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                setSelectedProduct(null);
                setQuantity(1);
              }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'white';
              }}
            >
              <X size={24} color="#333" />
            </button>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              padding: '3rem'
            }}>
              {/* Левая часть - изображение */}
              <div>
                <div style={{
                  height: '400px',
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10rem',
                  marginBottom: '1.5rem'
                }}>
                  {selectedProduct.image}
                </div>

                {/* Миниатюры (для демонстрации) */}
                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        border: i === 1 ? '3px solid #667eea' : '3px solid transparent',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        if (i !== 1) e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      {selectedProduct.image}
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая часть - информация */}
              <div>
                {/* Категория */}
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {selectedProduct.category}
                </div>

                {/* Название */}
                <h2 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#333'
                }}>
                  {selectedProduct.name}
                </h2>

                {/* Рейтинг */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < Math.floor(selectedProduct.rating) ? '#ffa502' : '#ddd', fontSize: '1.2rem' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: '600', color: '#333' }}>
                    {selectedProduct.rating}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#999' }}>
                    (128 отзывов)
                  </span>
                </div>

                {/* Цена */}
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#667eea',
                  marginBottom: '1.5rem'
                }}>
                  ${selectedProduct.price}
                </div>

                {/* Наличие */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '2rem',
                  padding: '0.75rem',
                  background: selectedProduct.inStock ? '#e8f5e9' : '#ffebee',
                  borderRadius: '8px'
                }}>
                  <span style={{
                    fontSize: '1.2rem'
                  }}>
                    {selectedProduct.inStock ? '✓' : '✗'}
                  </span>
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: selectedProduct.inStock ? '#2e7d32' : '#c62828'
                  }}>
                    {selectedProduct.inStock ? 'В наличии' : 'Нет в наличии'}
                  </span>
                </div>

                {/* Описание */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '0.75rem'
                  }}>
                    Описание
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: '#666',
                    margin: 0
                  }}>
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Характеристики */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '0.75rem'
                  }}>
                    Особенности
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {selectedProduct.features.map((feature, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          background: '#f5f5f5',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          color: '#333'
                        }}
                      >
                        <span style={{ color: '#667eea' }}>✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Выбор количества */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '0.75rem'
                  }}>
                    Количество
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        background: quantity <= 1 ? '#f5f5f5' : 'white',
                        cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: quantity <= 1 ? '#ccc' : '#333',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        if (quantity > 1) e.currentTarget.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    >
                      −
                    </button>
                    
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#333',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      {quantity}
                    </span>
                    
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: '#333',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    >
                      +
                    </button>

                    <span style={{
                      fontSize: '0.9rem',
                      color: '#999'
                    }}>
                      Итого: ${(selectedProduct.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <button
                    onClick={() => addToCart(selectedProduct, quantity)}
                    disabled={!selectedProduct.inStock}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: 'none',
                      borderRadius: '12px',
                      background: selectedProduct.inStock 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : '#e0e0e0',
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: selectedProduct.inStock ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s',
                      boxShadow: selectedProduct.inStock ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedProduct.inStock) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedProduct.inStock) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                      }
                    }}
                  >
                    {selectedProduct.inStock ? 'Добавить в корзину' : 'Товар недоступен'}
                  </button>

                  <button
                    style={{
                      width: '50px',
                      height: '50px',
                      border: '2px solid #667eea',
                      borderRadius: '12px',
                      background: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#667eea';
                      e.currentTarget.querySelector('svg').setAttribute('color', 'white');
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.querySelector('svg').setAttribute('color', '#ff4757');
                    }}
                  >
                    <Heart size={24} color="#ff4757" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}