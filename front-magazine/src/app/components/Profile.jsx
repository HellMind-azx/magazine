'use client'
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import styles from './Profile.module.scss';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'Москва, ул. Примерная, д. 1, кв. 10'
  });

  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Профиль</h1>
      
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <User size={48} color="#667eea" />
          </div>
          <div className={styles.headerActions}>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className={styles.editButton}
              >
                <Edit2 size={18} />
                Редактировать
              </button>
            ) : (
              <div className={styles.editActions}>
                <button 
                  onClick={handleSave}
                  className={styles.saveButton}
                >
                  <Save size={18} />
                  Сохранить
                </button>
                <button 
                  onClick={handleCancel}
                  className={styles.cancelButton}
                >
                  <X size={18} />
                  Отмена
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <User size={20} color="#666" />
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={styles.input}
              />
            ) : (
              <span>{userData.name}</span>
            )}
          </div>

          <div className={styles.infoItem}>
            <Mail size={20} color="#666" />
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={styles.input}
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>

          <div className={styles.infoItem}>
            <Phone size={20} color="#666" />
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={styles.input}
              />
            ) : (
              <span>{userData.phone}</span>
            )}
          </div>

          <div className={styles.infoItem}>
            <MapPin size={20} color="#666" />
            {isEditing ? (
              <input
                type="text"
                value={editData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={styles.input}
              />
            ) : (
              <span>{userData.address}</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <h3>Заказов</h3>
          <p>12</p>
        </div>
        <div className={styles.statItem}>
          <h3>Избранное</h3>
          <p>5</p>
        </div>
        <div className={styles.statItem}>
          <h3>В корзине</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
}
