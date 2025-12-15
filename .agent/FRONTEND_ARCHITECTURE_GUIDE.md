# Frontend Architecture Guide - Arinda Housing

This guide explains the frontend codebase structure, how to find components, understand the API layer, and the security measures in place.

---

## Table of Contents

1. [Project Structure Overview](#project-structure-overview)
2. [Folder Breakdown](#folder-breakdown)
3. [API Layer](#api-layer)
4. [Authentication System](#authentication-system)
5. [Routing & Protected Routes](#routing--protected-routes)
6. [Component Organization](#component-organization)
7. [Security Features](#security-features)
8. [Quick Reference Cheatsheet](#quick-reference-cheatsheet)

---

## Project Structure Overview

```
front/
├── public/                    # Static assets (favicon, etc.)
├── src/
│   ├── api/                   # 🔌 API calls to backend
│   ├── assets/                # 🖼️ Images, fonts
│   ├── components/            # 🧩 Reusable UI components
│   │   ├── auth/              # Authentication forms & route guards
│   │   ├── bookings/          # Booking-related components
│   │   ├── common/            # Shared components (Navbar, Footer, etc.)
│   │   ├── landlord/          # Landlord-specific components
│   │   ├── properties/        # Property listing components
│   │   ├── tenant/            # Tenant-specific components
│   │   └── ui/                # Base UI primitives (Radix)
│   ├── data/                  # Mock data for testing
│   ├── lib/                   # Utility libraries
│   ├── pages/                 # 📄 Page components (routes)
│   │   ├── landlord/          # Landlord pages
│   │   └── tenant/            # Tenant pages
│   ├── styles/                # Global styles
│   ├── utils/                 # 🛠️ Utility functions
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global CSS
├── .env.example               # Environment variables template
├── index.html                 # HTML entry point
├── vite.config.js             # Vite + obfuscation config
└── package.json               # Dependencies
```

---

## Folder Breakdown

### 📁 `src/api/` - Backend Communication

**Purpose:** All HTTP requests to the Spring Boot backend are centralized here.

| File | Purpose | Endpoints |
|------|---------|-----------|
| `axiosClient.js` | **Base HTTP client** - Configures auth headers | - |
| `authApi.js` | Login, register, logout | `/api/auth/*` |
| `listingApi.js` | Public listing view | `/api/listings` |
| `landlordListingApi.js` | Landlord CRUD for listings | `/api/landlord/listings` |
| `bookingsApi.js` | Booking management | `/api/landlord/bookings` |
| `reviewApi.js` | Reviews CRUD | `/api/listings/{id}/reviews` |
| `profileApi.js` | Tenant profile | `/api/tenant/profile` |
| `landlordProfileApi.js` | Landlord profile | `/api/landlord/profile` |
| `applicationApi.js` | Tenant applications | `/api/tenant/applications` |
| `tenantsApi.js` | Landlord's tenant view | `/api/landlord/tenants` |
| `dashboardApi.js` | Dashboard stats | `/api/landlord/dashboard` |
| `leaseApi.js` | Lease documents | `/api/landlord/leases` |

#### How `axiosClient.js` Works

```javascript
// 1. Creates axios instance with base URL
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

// 2. Request Interceptor: Adds JWT token to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Response Interceptor: Handles 401 (unauthorized)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
    }
    return Promise.reject(error);
  }
);
```

---

### 📁 `src/components/` - Reusable Components

Components are organized by **feature/domain**:

#### `components/auth/` - Authentication
| Component | Purpose |
|-----------|---------|
| `LoginForm.jsx` | Login form with email/password |
| `TenantRegisterForm.jsx` | Student registration form |
| `LandlordRegisterForm.jsx` | Landlord registration form |
| `ProtectedRoute.jsx` | **Guards routes** - redirects if not logged in |
| `PublicRoute.jsx` | Redirects logged-in users away from login/register |

#### `components/common/` - Shared UI
| Component | Purpose |
|-----------|---------|
| `Navbar.jsx` | Top navigation bar |
| `Footer.jsx` | Page footer |
| `ConfirmDialog.jsx` | Confirmation modal |
| `TabToggle.jsx` | Tenant/Landlord switch tabs |
| `ProfileMenuToggle.jsx` | User menu dropdown |
| `OrangeHatCard.jsx` | Styled card wrapper |

#### `components/properties/` - Property Management
| Component | Purpose |
|-----------|---------|
| `PropertyGrid.jsx` | Grid view of properties |
| `PropertyTable.jsx` | Table view of properties |
| `PropertySheet.jsx` | Property detail side panel |
| `PropertyFilters.jsx` | Filter options |
| `add/` folder | Multi-step property creation wizard |

#### `components/tenant/` - Tenant Features
| Component | Purpose |
|-----------|---------|
| `ListingCard.jsx` | Property card for listings |
| `FiltersSidebar.jsx` | Search filters |
| `ReviewsSection.jsx` | Display & submit reviews |
| `ReviewModal.jsx` | Write/edit review modal |
| `BookingFormCard.jsx` | Booking submission form |
| `ApplicationCard.jsx` | Application status display |
| `PhotoGallery.jsx` | Property photo viewer |

#### `components/bookings/` - Booking Management
| Component | Purpose |
|-----------|---------|
| `BookingsTable.jsx` | List of bookings |
| `BookingDetailsSheet.jsx` | Booking detail view |
| `ApproveModal.jsx` | Approve booking modal |
| `RejectModal.jsx` | Reject booking modal |

#### `components/ui/` - Base UI Primitives
These are low-level components from **Radix UI** (accessible UI library):
- `dialog.jsx` - Modal dialogs
- `dropdown-menu.jsx` - Dropdown menus
- `checkbox.jsx` - Checkboxes
- `switch.jsx` - Toggle switches
- `sheet.jsx` - Side panels
- `label.jsx` - Form labels

---

### 📁 `src/pages/` - Route Pages

Pages are the **top-level components** rendered by routes in `App.jsx`.

#### Root Pages
| Page | Route | Purpose |
|------|-------|---------|
| `Landing.jsx` | `/landing` | Home/landing page |
| `Login.jsx` | `/login` | Login page |
| `Register.jsx` | `/register` | Registration page |

#### `pages/tenant/` - Tenant Pages
| Page | Route | Purpose |
|------|-------|---------|
| `Listings.jsx` | `/tenant/listings` | Browse available properties |
| `ListingDetail.jsx` | `/tenant/listings/:id` | View property details |
| `BookingForm.jsx` | `/tenant/listings/:id/book` | Submit booking application |
| `MyApplication.jsx` | `/tenant/applications` | View submitted applications |
| `AccountSettings.jsx` | `/tenant/settings` | Profile settings |

#### `pages/landlord/dashboard/` - Landlord Dashboard
| Page | Route | Purpose |
|------|-------|---------|
| `LandlordDashboardLayout.jsx` | `/landlord/dashboard` | Dashboard wrapper |
| `Overview.jsx` | `/landlord/dashboard/overview` | Stats & summary |
| `Properties.jsx` | `/landlord/dashboard/properties` | Manage listings |
| `AddProperty.jsx` | `/landlord/dashboard/properties/add` | Create listing |
| `EditProperty.jsx` | `/landlord/dashboard/properties/edit/:id` | Edit listing |
| `Bookings.jsx` | `/landlord/dashboard/bookings` | Manage applications |
| `Tenants.jsx` | `/landlord/dashboard/tenants` | View tenants |
| `AccountSettings.jsx` | `/landlord/settings` | Profile settings |

---

## Authentication System

### How Login Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   LoginForm  │────▶│   authApi    │────▶│   Backend    │
│   (submit)   │     │   login()    │     │ /api/auth/   │
└──────────────┘     └──────────────┘     └───────┬──────┘
                                                   │
       ┌───────────────────────────────────────────┘
       │ JWT Token + Role
       ▼
┌──────────────┐     ┌──────────────┐
│ localStorage │     │  Navigate to │
│ authToken    │────▶│  Dashboard   │
│ userRole     │     │              │
└──────────────┘     └──────────────┘
```

### Key Functions in `authApi.js`

```javascript
// Login - stores token in localStorage
export const login = async (credentials) => {
  const response = await axiosClient.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  if (response.data.role) {
    localStorage.setItem('userRole', response.data.role);
  }
  return response;
};

// Check if logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// Get user role (STUDENT or LANDLORD)
export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

// Logout - clear storage
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
};
```

---

## Routing & Protected Routes

### Route Protection Pattern

Routes are wrapped with **guard components** to control access:

```jsx
// In App.jsx

// Public routes - redirect if already logged in
<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

// Protected routes - redirect to login if not authenticated
<Route path="/tenant/listings" element={
  <ProtectedRoute allowedRole="STUDENT">
    <TenantListings />
  </ProtectedRoute>
} />

<Route path="/landlord/dashboard" element={
  <ProtectedRoute allowedRole="LANDLORD">
    <LandlordDashboard />
  </ProtectedRoute>
} />
```

### How ProtectedRoute Works

```jsx
// components/auth/ProtectedRoute.jsx
export default function ProtectedRoute({ children, allowedRole }) {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  // Not logged in → go to login
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  // Wrong role → go to your dashboard
  if (allowedRole && userRole !== allowedRole) {
    if (userRole === 'LANDLORD') {
      return <Navigate to="/landlord/dashboard" />;
    } else {
      return <Navigate to="/tenant/listings" />;
    }
  }

  // Authorized → render the page
  return children;
}
```

---

## Component Organization

### Finding Components Quickly

| Looking for... | Check this folder |
|----------------|-------------------|
| Login/Register forms | `components/auth/` |
| Navbar, Footer | `components/common/` |
| Property cards, grids | `components/properties/` |
| Tenant features (reviews, booking) | `components/tenant/` |
| Landlord features (steps, sidebar) | `components/landlord/` |
| Booking management | `components/bookings/` |
| Basic UI (dialogs, dropdowns) | `components/ui/` |

### Component Naming Conventions

| Pattern | Example | Meaning |
|---------|---------|---------|
| `*Form.jsx` | `LoginForm.jsx` | Form component |
| `*Card.jsx` | `ListingCard.jsx` | Card display component |
| `*Modal.jsx` | `ReviewModal.jsx` | Modal/dialog component |
| `*Sheet.jsx` | `PropertySheet.jsx` | Side panel component |
| `*Table.jsx` | `BookingsTable.jsx` | Table component |
| `*Grid.jsx` | `PropertyGrid.jsx` | Grid layout component |
| `*Step.jsx` | `BasicInfoStep.jsx` | Wizard step component |

---

## Security Features

### Code Obfuscation (Production Only)

The build process applies several security measures:

| Feature | Purpose | Configured In |
|---------|---------|---------------|
| **Variable Renaming** | `login` → `_0x3f2a1b` | `vite.config.js` |
| **String Encryption** | API routes encoded | `vite.config.js` |
| **Control Flow Flattening** | Logic scrambled | `vite.config.js` |
| **Dead Code Injection** | Fake code confuses attackers | `vite.config.js` |
| **Console Removal** | No `console.log` in prod | `vite.config.js` |
| **Source Map Disabled** | No original code visible | `vite.config.js` |

### Environment Variables

Sensitive config should use environment variables:

```bash
# .env (create from .env.example)
VITE_API_BASE_URL=http://localhost:8080/api
```

Access in code:
```javascript
import.meta.env.VITE_API_BASE_URL
```

### Token Handling Security

| Practice | Implemented |
|----------|-------------|
| Token stored in localStorage | ✅ (accessible but simple) |
| Auto-attach to requests | ✅ via interceptor |
| Clear on 401 response | ✅ via interceptor |
| No console logging of tokens | ✅ removed |

---

## Quick Reference Cheatsheet

### Where to Find Things

```
Need to change login?     → src/components/auth/LoginForm.jsx
Need to change API URL?   → src/api/axiosClient.js (or .env)
Need to add a new page?   → src/pages/ + update App.jsx
Need to add a new API?    → src/api/[feature]Api.js
Need UI primitives?       → src/components/ui/
Need shared components?   → src/components/common/
```

### Common Patterns

**Making an API call:**
```javascript
import { getMyListings } from '@/api/landlordListingApi';

const fetchData = async () => {
  try {
    const response = await getMyListings();
    setData(response.data);
  } catch (error) {
    setError('Failed to load');
  }
};
```

**Using the path alias:**
```javascript
// Instead of: import Navbar from '../../../components/common/Navbar'
import Navbar from '@/components/common/Navbar';
```

**Checking authentication:**
```javascript
import { isAuthenticated, getUserRole } from '@/api/authApi';

if (isAuthenticated()) {
  const role = getUserRole(); // 'STUDENT' or 'LANDLORD'
}
```

### Build Commands

```bash
# Development (hot reload, no obfuscation)
npm run dev

# Production build (with obfuscation)
npm run build

# Preview production build
npm run preview
```

---

## Development Tips

1. **Use `@/` alias** - Configured in `vite.config.js` to point to `src/`
2. **Check `App.jsx` for routes** - All page routes are defined there
3. **API files match features** - `landlordListingApi.js` → landlord listing endpoints
4. **Components are domain-grouped** - Find by feature, not by type
5. **UI components from Radix** - Check `components/ui/` for primitives
6. **Protected routes use guards** - Check `ProtectedRoute.jsx` for auth logic

---

## Summary Table

| Folder | Contains | When to Look Here |
|--------|----------|-------------------|
| `api/` | HTTP requests | Changing backend calls |
| `components/auth/` | Auth forms, guards | Login/register changes |
| `components/common/` | Shared UI | Navbar, footer, dialogs |
| `components/tenant/` | Tenant features | Student-facing features |
| `components/landlord/` | Landlord features | Landlord-facing features |
| `components/properties/` | Property components | Listing display/creation |
| `components/bookings/` | Booking components | Booking management |
| `components/ui/` | Base primitives | Need a dropdown, modal, etc. |
| `pages/` | Route pages | Adding new pages |
| `utils/` | Helpers | Password validation, etc. |
