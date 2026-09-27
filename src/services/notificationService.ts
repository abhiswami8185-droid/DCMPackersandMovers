/**
 * DCM Notification Service (Phase 11: Modular Notification Architecture)
 * Supports Email, WhatsApp, SMS, and Push Notifications through provider abstraction.
 */

export type NotificationChannel = 'email' | 'whatsapp' | 'sms' | 'push';

export type NotificationEvent =
  | 'quote_generated'
  | 'quote_approved'
  | 'booking_confirmed'
  | 'survey_scheduled'
  | 'survey_completed'
  | 'packing_scheduled'
  | 'packing_completed'
  | 'pickup_completed'
  | 'facility_received'
  | 'dispatched'
  | 'destination_reached'
  | 'delivery_scheduled'
  | 'out_for_delivery'
  | 'delivery_completed'
  | 'pod_generated'
  | 'payment_received'
  | 'payment_due'
  | 'claim_updated'
  | 'support_ticket_updated';

export interface AppNotification {
  id: string;
  recipientId: string;
  recipientRole: 'customer' | 'staff' | 'admin';
  title: string;
  message: string;
  event: NotificationEvent;
  channels: NotificationChannel[];
  bookingId?: string;
  quoteId?: string;
  timestamp: string;
  read: boolean;
}

class NotificationService {
  private notifications: AppNotification[] = [];

  constructor() {
    this.init();
  }

  private init() {
    const saved = localStorage.getItem('dcm_notifications_store_v1');
    if (saved) {
      try {
        this.notifications = JSON.parse(saved);
        return;
      } catch (e) {
        console.warn('Failed to parse notifications storage', e);
      }
    }

    // Default seeded notifications
    this.notifications = [
      {
        id: 'notif-1',
        recipientId: 'usr-cust-1',
        recipientRole: 'customer',
        title: 'Container Dispatched on Highway',
        message: 'Your dedicated container truck DL-01-AX-9912 has departed Chandigarh Hub via NH-44 towards New Delhi.',
        event: 'dispatched',
        channels: ['whatsapp', 'sms'],
        bookingId: 'DCM-2026-000123',
        timestamp: '2026-09-24T22:05:00Z',
        read: false,
      },
      {
        id: 'notif-2',
        recipientId: 'usr-cust-1',
        recipientRole: 'customer',
        title: 'Payment Advance Verified',
        message: 'Payment of ₹12,000 recorded via Razorpay. Receipt #RCPT-2026-904 is available in your documents portal.',
        event: 'payment_received',
        channels: ['email', 'sms'],
        bookingId: 'DCM-2026-000123',
        timestamp: '2026-09-24T17:02:00Z',
        read: true,
      },
    ];
  }

  private save() {
    try {
      localStorage.setItem('dcm_notifications_store_v1', JSON.stringify(this.notifications));
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  }

  getNotifications(recipientRole?: 'customer' | 'staff' | 'admin'): AppNotification[] {
    if (recipientRole) {
      return this.notifications.filter((n) => n.recipientRole === recipientRole);
    }
    return [...this.notifications];
  }

  send(
    event: NotificationEvent,
    title: string,
    message: string,
    options: {
      recipientId: string;
      recipientRole: 'customer' | 'staff' | 'admin';
      channels?: NotificationChannel[];
      bookingId?: string;
      quoteId?: string;
    }
  ): AppNotification {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
      recipientId: options.recipientId,
      recipientRole: options.recipientRole,
      title,
      message,
      event,
      channels: options.channels || ['whatsapp', 'sms', 'push'],
      bookingId: options.bookingId,
      quoteId: options.quoteId,
      timestamp: new Date().toISOString(),
      read: false,
    };

    this.notifications.unshift(newNotif);
    this.save();

    console.info(`[DCM Notification Engine] Dispatched [${event}] via [${newNotif.channels.join(', ')}]: ${title} -> ${options.recipientId}`);
    return newNotif;
  }

  markAsRead(id: string) {
    const n = this.notifications.find((item) => item.id === id);
    if (n) {
      n.read = true;
      this.save();
    }
  }

  markAllAsRead() {
    this.notifications.forEach((n) => {
      n.read = true;
    });
    this.save();
  }
}

export const notificationService = new NotificationService();
