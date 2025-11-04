"use client";

import { useState, useCallback } from "react";
import { NotificationType } from "./types";

export interface NotificationState {
  message: string;
  type: NotificationType;
}

export function useNotification(autoHideDuration: number = 5000) {
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );

  const showNotification = useCallback(
    (message: string, type: NotificationType) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), autoHideDuration);
    },
    [autoHideDuration]
  );

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
}

