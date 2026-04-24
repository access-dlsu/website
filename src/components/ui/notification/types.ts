export type NotificationType = 'info' | 'success' | 'error';

export interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

