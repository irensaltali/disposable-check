# 🛡️ DisposableCheck

**Free Disposable Email Detector & API**

[![Website](https://img.shields.io/badge/Website-disposablecheck.irensaltali.com-blue)](https://disposablecheck.irensaltali.com)
[![API Docs](https://img.shields.io/badge/API-Documentation-green)](https://disposablecheck.irensaltali.com/api)

DisposableCheck is a free online service that helps detect whether an email address is disposable (temporary/throwaway) and offers a free API for developers to integrate this functionality into their applications.

🔗 **Live Demo**: [disposablecheck.irensaltali.com](https://disposablecheck.irensaltali.com)

---

## ✨ Key Features

### ✅ Disposable Email Detection
Instantly check if an email address comes from a known disposable email provider — e.g., Mailinator, Temp-Mail, 10MinuteMail, and thousands more.

### ✅ Free API Access
Developers can call our API endpoint to programmatically check emails before accepting them in registration forms, lead forms, or newsletter sign-ups.

### ✅ Prevent Spam & Fake Signups
Identify throwaway emails to reduce spam registrations, fake accounts, and poor-quality contacts in your data.

### ✅ Real-Time Detection
Get instant responses — our API tells you immediately whether a given address should be allowed or blocked.

### ✅ Bulk Email Checking
Check multiple email addresses at once with our bulk checking feature.

---

## 🎯 Use Cases

| Use Case | Description |
|----------|-------------|
| **Web Forms & Sign-Ups** | Avoid fake users signing up with disposable emails |
| **Email Lists** | Clean your mailing lists to improve engagement and deliverability |
| **APIs & Integrations** | Integrate email checking into apps, SaaS products, and platforms |
| **Fraud Prevention** | Reduce account abuse and strengthen data quality |
| **Newsletter Sign-ups** | Ensure subscribers use real email addresses |

---

## 🚀 Quick Start

### Check an Email Online
1. Visit [disposablecheck.irensaltali.com](https://disposablecheck.irensaltali.com)
2. Enter any email address
3. Get instant results

### Use the API
```bash
curl -X GET \
  'https://disposablecheck.irensaltali.com/api/v1/check?email=test@tempmail.com' \
  -H 'X-API-Key: your_api_key_here'
```

**Response:**
```json
{
  "email": "test@tempmail.com",
  "domain": "tempmail.com",
  "is_disposable": true,
  "is_valid_format": true,
  "checked_at": "2026-01-27T10:30:00Z"
}
```

### Get Your Free API Key
Visit [disposablecheck.irensaltali.com/get-api-key](https://disposablecheck.irensaltali.com/get-api-key) to get your free API key instantly!

---

## 📖 API Documentation

Full API documentation available at:
- **Interactive Docs**: [disposablecheck.irensaltali.com/api](https://disposablecheck.irensaltali.com/api)
- **API Reference**: [API.md](../disposable-check-api/API.md)

---

## 🧠 Why It Matters

Disposable email detectors are essential for platforms that depend on authentic user contact information:

- **E-commerce sites** — Prevent fake accounts and order fraud
- **SaaS platforms** — Ensure quality user signups
- **Newsletters** — Improve email deliverability rates
- **Community forums** — Reduce spam and fake registrations
- **Lead generation** — Collect genuine contact information

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **API**: Cloudflare Workers, Hono, OpenAPI 3.1
- **Database**: Cloudflare Durable Objects, R2 Storage

---

## 💻 Development

```bash
# Clone the repository
git clone https://github.com/irensaltali/disposable-check-all.git

# Navigate to frontend
cd disposable-check

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📝 License

MIT License - free to use for personal and commercial projects.

---

## 🔗 Links

- 🌐 **Website**: [disposablecheck.irensaltali.com](https://disposablecheck.irensaltali.com)
- 📚 **API Docs**: [disposablecheck.irensaltali.com/api](https://disposablecheck.irensaltali.com/api)
- 🔑 **Get API Key**: [disposablecheck.irensaltali.com/get-api-key](https://disposablecheck.irensaltali.com/get-api-key)

---

Made with ❤️ by [İren Saltalı](https://irensaltali.com)
