"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailNotifier {
    send(message) {
        console.log(`Sending EMAIL: ${message}`);
    }
}
class SMSNotifier {
    send(message) {
        console.log(`Sending SMS: ${message}`);
    }
}
class PushNotifier {
    send(message) {
        console.log(`Sending PUSH: ${message}`);
    }
}
class NotificationFactory {
    static createNotification(type) {
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
//# sourceMappingURL=index.js.map