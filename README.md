# Laravel + React Indian Standard Time (IST) Display

A modern **Laravel 12 + React 18** application that displays **real-time Indian Standard Time (IST)** with Indian festivals, Hindi day names, auto-refresh, and a responsive tricolor-themed UI. This project is suitable for **learning, interviews, MCA/BCA projects, and real-world usage**.

---

## Features

### Core Features

* Real-time Indian Standard Time (IST)
* Automatic server-based time synchronization
* 12-hour & 24-hour time format toggle
* Auto-refresh with configurable intervals
* Indian festival calendar
* Hindi & English day names
* Weekend / weekday detection
* Fully responsive design

### UI / UX Features

* Indian tricolor theme (Saffron, White, Green)
* Smooth animations & transitions
* Interactive cards & hover effects
* Loading & error handling states
* Dark / Light mode ready
* WCAG-accessible design

### Technical Features

* Laravel 12 REST API backend
* React 18 frontend with Hooks
* Axios for API communication
* CORS configuration
* CSRF protection
* API rate limiting ready
* Centralized service architecture

---

## 🛠 Tech Stack

* **Backend:** Laravel 12 (PHP 8.2+)
* **Frontend:** React 18 + Vite
* **Database:** MySQL / SQLite
* **HTTP Client:** Axios
* **Styling:** Custom CSS
* **Timezone:** Asia/Kolkata (IST)

---

## Quick Start

### Prerequisites

* PHP >= 8.2
* Composer >= 2.5
* Node.js >= 18.x
* npm >= 9.x
* MySQL >= 8.0 or SQLite

---

## Installation Guide

### Clone Repository

```bash
git clone https://github.com/yourusername/laravel-react-indian-time.git
cd laravel-react-indian-time
```

### Backend Setup (Laravel)

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Configure `.env`:

```env
APP_NAME="Indian Time Display"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_TIMEZONE=Asia/Kolkata

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=indian_time
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations & seeders:

```bash
php artisan migrate
php artisan db:seed
```

### Frontend Setup (React)

```bash
npm install
npm run dev
```

### Start Application

```bash
php artisan serve
```

Visit:

```
http://localhost:8000
```

---

## Project Structure

```text
laravel-react-indian-time/
├── app/
│   ├── Http/Controllers/Api/DateTimeController.php
│   ├── Services/TimeService.php
├── config/
│   ├── cors.php
│   └── app.php
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── js/components/
│   ├── js/utils/
│   └── views/
├── routes/api.php
├── routes/web.php
├── tests/
├── vite.config.js
└── README.md
```

---

## API Endpoints

### Get Current Indian Date & Time

**GET** `/api/current-datetime`

Response:

```json
{
  "success": true,
  "data": {
    "date": "25-12-2024",
    "time": "14:30:45",
    "datetime": "25-12-2024 14:30:45",
    "timezone": "Asia/Kolkata",
    "timestamp": 1735128045,
    "timezone_offset": "+5:30",
    "is_daylight_saving": false,
    "day_info": {
      "english": "Wednesday",
      "hindi": "बुधवार",
      "is_weekend": false
    },
    "festivals": []
  }
}
```

### Get Indian Festivals

**GET** `/api/indian-festivals`

---

## Database Schema

### festivals table

| Column              | Type    | Description      |
| ------------------- | ------- | ---------------- |
| id                  | bigint  | Primary key      |
| name                | string  | Festival name    |
| hindi_name          | string  | Hindi name       |
| month               | int     | Festival month   |
| day                 | int     | Festival day     |
| emoji               | string  | Emoji icon       |
| is_national_holiday | boolean | National holiday |
| is_variable_date    | boolean | Variable date    |

---

## Testing

### PHP Unit Tests

```bash
php artisan test
```

### Frontend Tests

```bash
npm test
```

---

## Security Notes

* Server-side time calculation (no client manipulation)
* CORS restricted to trusted origins
* CSRF protection enabled
* API error handling with fallback

---

## Future Enhancements

* User authentication
* Regional festival filtering
* Multilingual UI (Gujarati, Marathi)
* Dark mode toggle
* PWA support
* Deployment guide

---

## Screenshot
<img width="1838" height="965" alt="image" src="https://github.com/user-attachments/assets/ddb3c458-96c9-438a-915c-8addd4def7ec" />
