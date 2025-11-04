"use client";

import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { NotificationProps } from "./types";

export function Notification({ message, type, onClose }: NotificationProps) {
  const Icon =
    type === "success" ? CheckCircle : type === "error" ? AlertCircle : Info;

  return (
    <div className="notification-container" data-type={type}>
      <Icon className="w-5 h-5 flex-shrink-0" aria-hidden />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="notification-close-btn"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export { useNotification } from "./useNotification";

export default Notification;

