"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

import styles from "@/app/layout.module.css";

type NotificationType = 'success' | 'error' | 'info';
type Notification = { message: string; type: NotificationType; key: number } | null;

const NotificationContext = createContext<{
  showNotification: (message: string, type: NotificationType) => void;
} | undefined>(undefined);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}

function NotificationDisplay({ notification }: { notification: Notification }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (notification) {
      setShow(false);
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [notification]);
  if (!notification) return null;
  return (
    <div key={notification.key} className={`${styles.notification} ${styles[notification.type]} ${show ? styles.show : ''}`}>
      <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : 'info-circle'}`}></i>
      <span>{notification.message}</span>
    </div>
  );
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification>(null);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    setNotification({ message, type, key: Date.now() });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <NotificationDisplay notification={notification} />
      {children}
    </NotificationContext.Provider>
  );
}
