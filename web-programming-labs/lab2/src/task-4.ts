export { };

abstract class BaseNotifier {
  constructor(protected readonly name: string) {}

  // Абстрактний метод — нащадки зобов'язані реалізувати
  abstract send(to: string, subject: string, body: string): void;

  // Шаблонний метод — спільна логіка для всіх нащадків
  notify(to: string, subject: string, body: string): void {
    console.log(`[${this.name}] Надсилання сповіщення...`);
    this.send(to, subject, body);
    console.log(`[${this.name}] Сповіщення надіслано`);
  }
}

class EmailNotifier extends BaseNotifier {
    constructor(protected readonly smtpServer: string) {
        super("Email");
    }

    send(to: string, subject: string, body: string): void {
        const previoewEmail = body.slice(0, 50);
        
        console.log(
            `📧 Email → ${to}: "${subject}" | Тіло: "${previoewEmail}..." через ${this.smtpServer}`
        );
    }
}

class SmsNotifier extends BaseNotifier {
    constructor(private readonly phonePrefix: string = "+380") {
        super("SMS");
    }

    send(to: string, subject: string, body: string): void {
        const previoewSms = body.slice(0, 160);

        `📱 SMS → ${this.phonePrefix}${to}: "${previoewSms}"`;
    }
}

function sendBulkNotification(notifiers: BaseNotifier[], to: string, subject: string, body: string): void {
    for (const notifier of notifiers) {
        notifier.notify(to, subject, body);
    }
}

console.log("=== Завдання 4: Наслідування та поліморфізм ===");

const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(),
];

// Параметр to — рядок-адресат; його формат залежить від каналу
sendBulkNotification(
  notifiers,
  "user@example.com",
  "Нова задача призначена",
  "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025",
);