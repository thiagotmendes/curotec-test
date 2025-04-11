# 📦 Resource Management Module

## 🧩 Feature 1: Resource Management with Real-time Updates

### 🎯 Objective
Develop a full-featured CRUD module for resource management with real-time UI updates.

### 👤 User Story
> As a user, I want to create, view, edit, and delete resources, and see changes reflected immediately in the interface so I can efficiently manage resources without page reloads.

### ✅ Acceptance Criteria
- [x] Full CRUD with fields: `name`, `description`, `status`, `priority`.
- [x] Immediate interface updates after any operation (no page reload).
- [x] Client-side and server-side validation with appropriate error feedback.

### 🧱 Database Schema

Table: `resources`

| Field         | Type        | Description                                  |
|---------------|-------------|----------------------------------------------|
| `id`          | bigint      | Primary key, auto-increment                  |
| `name`        | string(255) | Resource name (required)                     |
| `description` | text        | Description (optional)                       |
| `status`      | enum        | Values: `active`, `inactive`, `pending`      |
| `priority`    | integer     | Priority level (default: 0)                  |
| `created_at`  | timestamp   | Creation timestamp                           |
| `updated_at`  | timestamp   | Update timestamp                             |

### 🛠️ Technical Stack

#### Backend (Laravel)
- [x] API Resource for standardized responses
- [x] Controller with validation using `FormRequest`
- [x] Endpoints:
    - [x] `GET /resources`
    - [x] `POST /resources`
    - [x] `PUT /resources/{id}`
    - [x] `DELETE /resources/{id}`

#### Frontend (React + Inertia.js)
- [x] React Components:
    - [x] Resource list
    - [x] Create/Edit form
    - [x] Deletion confirmation modal
- [x] State management using `useState` and `useForm`
- [x] `useForm` from Inertia.js for form handling with error propagation

---

## 🧩 Feature 2: Advanced Data Filtering and Pagination System

### 🎯 Objective
Add advanced filters and pagination with server-side processing, keeping filters in the URL and ensuring optimized performance.

### 👤 User Story
> As a user, I want to filter resources by status, priority, and search terms, with the filters persisting in the URL and pagination remaining in sync, so I can efficiently browse large data sets.

### ✅ Acceptance Criteria
- [x] Filtering by `status`, `priority`, and search term
- [x] Server-side pagination that maintains active filters
- [x] Filters persist in the URL (e.g., `?status=pending&priority=1`)
- [x] Optimized queries using Eloquent best practices

### 🛠️ Technical Focus

#### Backend (Laravel)
- [x] Query optimization using `when()` clauses and scoped queries
- [x] Pagination using `paginate()` while preserving filters
- [x] Inertia-formatted responses for frontend integration

#### Frontend (React + Inertia.js)
- [x] Reusable components for:
    - [x] Dynamic filters (dropdowns, search bar)
    - [x] Pagination controls (current page, total pages)
- [x] URL state synchronization with `usePage().props`
- [x] Reusable filtering logic using `useForm` hook

---

## 🚀 Next Steps

- [x] Add unit tests for ResourceController
- [x] Add frontend tests for components
- [ ] Implement error boundary for better error handling
- [ ] Add loading states for better UX
- [ ] Consider implementing caching for better performance

## 🛠️ Development Setup

### Prerequisites
- PHP 8.2+
- Node.js 18+
- Composer
- MySQL/PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install JavaScript dependencies:
```bash
npm install
```

4. Install testing dependencies:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @types/jest jest @babel/preset-react @babel/preset-typescript
```

5. Create environment file:
```bash
cp .env.example .env
```

6. Generate application key:
```bash
php artisan key:generate
```

7. Configure your database in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

8. Run migrations and seeders:
```bash
php artisan migrate
php artisan db:seed
```

9. Start the development servers:
```bash
# Terminal 1 - Laravel server
php artisan serve

# Terminal 2 - Vite server
npm run dev
```

### Running Tests

1. Run PHP tests:
```bash
php artisan test
```

2. Run specific PHP test file:
```bash
php artisan test tests/Unit/Http/Controllers/ResourceControllerTest.php
```

3. Run PHP tests with coverage:
```bash
php artisan test --coverage
```

4. Run JavaScript tests:
```bash
npm test
```

5. Run specific JavaScript test file:
```bash
npm test resources/js/tests/components/resources/resource-filters.test.tsx
```

6. Run JavaScript tests with coverage:
```bash
npm test -- --coverage
```

### Development Workflow

1. Start the development servers
2. Make your changes
3. Run tests
4. Commit your changes

### Common Issues

- If you encounter permission issues, run:
```bash
chmod -R 775 storage bootstrap/cache
```

- If you need to clear caches:
```bash
php artisan optimize:clear
```

- If you need to rebuild assets:
```bash
npm run build
```

- If tests are not running, check your Jest configuration in `package.json`:
```json
{
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/resources/js/$1"
    },
    "setupFilesAfterEnv": [
      "@testing-library/jest-dom"
    ]
  }
}
```
