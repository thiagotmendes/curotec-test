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
- API Resource for standardized responses
- Controller with validation using `FormRequest`
- Endpoints:
    - `GET /resources`
    - `POST /resources`
    - `PUT /resources/{id}`
    - `DELETE /resources/{id}`

#### Frontend (React + Inertia.js)
- React Components:
    - Resource list
    - Create/Edit form
    - Deletion confirmation modal
- State management using `useState`, `useReducer`, or `Zustand`
- `useForm` from Inertia.js for form handling with error propagation

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
- Query optimization using `eager loading`, `whereHas`, `scoped queries`
- Pagination using `paginate()` while preserving filters
- Inertia-formatted responses for frontend integration

#### Frontend (React + Inertia.js)
- Reusable components for:
    - Dynamic filters (dropdowns, search bar)
    - Pagination controls (current page, total pages)
- URL state synchronization with `usePage().props`
- Reusable filtering logic using custom hooks or context

---

## 🚀 Next Steps

- [ ] Implement `ResourceController` with filtering and pagination
- [ ] Create React components for filters and pagination UI
- [ ] Test integration and UX with large data sets
