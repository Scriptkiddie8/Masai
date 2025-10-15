interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending EMAIL: ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}

class PushNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending PUSH: ${message}`);
  }
}

type NotificationType = "Email" | "SMS" | "Push";

class NotificationFactory {
  static createNotification(type: "Email"): EmailNotifier;
  static createNotification(type: "SMS"): SMSNotifier;
  static createNotification(type: "Push"): PushNotifier;
  static createNotification(type: NotificationType): Notifier {
    switch (type) {
      case "Email":
        return new EmailNotifier();
      case "SMS":
        return new SMSNotifier();
      case "Push":
        return new PushNotifier();
    }
  }
}

const notifier = NotificationFactory.createNotification("Email");
notifier.send("Welcome!");
const smsNotifier = NotificationFactory.createNotification("SMS");
smsNotifier.send("Your OTP is 123456");
const pushNotifier = NotificationFactory.createNotification("Push");
pushNotifier.send("You have a new message");
