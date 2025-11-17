# Arinda Housing - Development Worklog

This document tracks the development history of the Arinda Housing project, organized by Frontend and Backend work.

---

## Frontend Development

| Work Item | Description | Commits | Date Range |
|-----------|-------------|---------|------------|
| **Project Setup** | Initialize Vite + React + Tailwind setup and routing structure | `3b8ff53`, `d8f0a71` | Oct 8, 2025 |
| **Tenant Landing Page** | Create tenant landing page with layout, footer component, and steps sections | `590decc`, `fda1a1b`, `8ca780b`, `572239a`, `0152f00` | Oct 8, 2025 |
| **Landlord Landing Page** | Create landlord landing page with basic layout and steps sections | `2a74fbb`, `0f63b21` | Oct 8-9, 2025 |
| **Landing Page Navbar** | Implement navbar with glass effect, hover states, scroll events, and link centering | `669840b`, `cf422d8`, `1b90837` | Oct 9, 2025 |
| **Authentication UI** | Add tenant and landlord login/register pages with reusable card component | `d3304f8`, `db534db` | Oct 9, 2025 |
| **Layout Refinement** | Fix navbar overlap issues across landing, login, and register pages; refactor navbar as separate component | `d211c0a`, `e650a21`, `88a0578`, `8903573`, `271fdf8`, `c8eda41`, `cbcb549`, `5f34684` | Oct 15, 2025 |
| **Project Restructuring** | Move frontend files to `/front` directory for better organization | `5ecc077`, `cf808de` | Oct 16, 2025 |
| **Landlord Dashboard** | Initial dashboard layout, navbar alignment, and component setup | `f290cf5`, `7c634a8`, `db3d8b0` | Oct 16-17, 2025 |
| **Tenant Features** | Add tenant navbar, listings page with search/sort/filters, and listing cards with mock data | `44bee9b`, `738a63b`, `cdef32c` | Nov 11, 2025 |
| **Listing Details** | Implement listing detail page with photo gallery, booking card, reviews, and location sections | `25466ce`, `22bbe33`, `5ab171c`, `d0a51e5`, `fb51018`, `234b315`, `6c936a5`, `cabb9e6`, `7f2e7e7`, `6b25722`, `e5bf100` | Nov 11, 2025 |
| **Booking System** | Complete booking form with Philippine mobile validation, success modal, and what's included section | `ce62bf5`, `4bff3ee`, `0424b27`, `884b46c` | Nov 11, 2025 |
| **Landlord Bookings UI** | Add bookings table with mock data, approve/reject modals, application slide-in panel with detailed info | `7b24df7`, `efa56c0`, `0424b27`, `d4b6a5d`, `ed1877a` | Nov 11, 2025 |
| **Property Management** | Add property input form, popup modals (edit, delete, confirmation), and base property list UI with grid/table views | `defb5be`, `af9c1ce`, `4b2c1a4`, `0d0a6b4` | Nov 11, 2025 |
| **Unified Landing Page** | Unify tenant and landlord landing pages with toggle component | `0405259` | Nov 13, 2025 |
| **Auth Refinement** | Unify login and register pages; remove Google OAuth UI elements; add role-specific fields (phone for landlord, school/student ID for tenant) | `5004fee`, `9c124d6`, `fe60809`, `eb73df1`, `270df7a`, `44bee9b`, `c8b4adb`, `01647b7` | Nov 13, 2025 |
| **Property Type & Status** | Change property modal to sheet, add property type/status to slide-in panel, and add review section | `31aa207`, `bff9dbc`, `0574df7` | Nov 13, 2025 |
| **Bookings Enhancement** | Add approval and rejection sheets after application sheet | `933c540`, `82d53b8` | Nov 14, 2025 |
| **Data Structure Update** | Update mock listings with new property schema including roomType and property type | `eeebc61`, `ec0ddd6`, `9e754e9`, `0000a5f` | Nov 14, 2025 |
| **Filter System Revamp** | Revamp filters with property type, inclusions, neighborhood, and collapsible sections with show more/less | `7083849`, `1e7ecd4`, `ee5c18f`, `718cfca`, `63242d4` | Nov 15, 2025 |
| **Properties UI Fixes** | Fix buttons cursor-pointer, progress bar position, and required inputs for add properties | `60befd7`, `0d5d188` | Nov 15, 2025 |
| **Property Type Refinement** | Add room type below property type, remove studio unit, add kitchen amenity, fix amenities toggle | `74ebd7b`, `9d09b32`, `fb3c791`, `132deb8` | Nov 16, 2025 |
| **UI Improvements** | Anchor price and button to bottom of listing cards | `5e877cd` | Nov 16, 2025 |
| **Login Redirect Fix** | Correct login redirect based on user role from backend | `6b5efe9` | Nov 16, 2025 |
| **Bookings Validation** | Add validation to each sheet input and middle-step slide-in panel (offered status) | `51ae416`, `36895e3` | Nov 17, 2025 |
| **Code Quality** | Resolve ESLint no-unused-vars warnings, untrack .vite cache, remove accidentally committed npm files | `09a5f18`, `574a998`, `cbd9b1f` | Nov 11, 2025 |

---

## Backend Development

| Work Item | Description | Commits | Date Range |
|-----------|-------------|---------|------------|
| **Project Setup** | Initialize Spring Boot project with Maven | `eef4d66`, `b44e6fe` | Oct 16, 2025 |
| **Project Restructuring** | Move backend files to `/back/arinda-backend` directory | `957baa3`, `3edcca0` | Oct 16, 2025 |
| **Database Configuration** | Configure application properties for database connection | `29e8fc2`, `b7c38ba` | Oct 27, 2025 |
| **User Entity** | Create user entity with role enums (TENANT, LANDLORD) | `6cc4356`, `dd804af`, `454fa19`, `6741820` | Oct 27, 2025 |
| **Student Entity** | Add student entity with relationship to user | `2889530`, `4d66106` | Oct 27, 2025 |
| **Landlord Entity** | Add landlord entity with relationship to user | `6f6f5fe`, `6b02964` | Oct 27, 2025 |
| **Listing System** | Add listing, photo, amenity, and location entities with relationships | `3065226`, `a4cd63b`, `5174331`, `ba13f33` | Oct 27, 2025 |
| **Application & Review System** | Add application, lease, and review entities with database connections | `66d09c9`, `f3ff092`, `417bd0f`, `ff5f302`, `8e746bd`, `66924e3` | Oct 27, 2025 |
| **JWT Authentication** | Implement JWT authentication and test with Postman | `bddacf3` | Nov 11, 2025 |
| **CORS Configuration** | Add frontend origin to CORS config for API access | `7ade96a` | Nov 11, 2025 |
| **Authentication Response** | Include user role in authentication response | `d5bfe41` | Nov 13, 2025 |
| **Registration API** | Implement backend API integration for tenant and landlord registration | `dab99b9` | Nov 13, 2025 |
| **Login API** | Implement login functionality with API integration; refine navigation logic based on user type | `ab13b02`, `48f4c8e`, `922ddc0` | Nov 13, 2025 |
| **Landlord Phone Field** | Set phone number for landlords during registration | `48f4c8e` | Nov 13, 2025 |
| **Repository Maintenance** | Add application.properties to gitignore, update paths, consolidate .gitignore files, untrack .idea and Maven folders | `0bc8c17`, `699bc46`, `bbf5a53`, `1d353f5`, `96bba59`, `22784f3`, `bb67de2`, `815642a`, `aeb29de`, `9fafe3d`, `8215689`, `a8e25a4`, `cfed530`, `3e00195`, `8c11404`, `42542d4`, `ad7f75f` | Oct 27 - Nov 11, 2025 |

---

## Documentation & Repository Setup

| Work Item | Description | Commits | Date Range |
|-----------|-------------|---------|------------|
| **README Updates** | Add project description and rename project in README | `335c6ad`, `812a651`, `5842e63`, `d863f9e` | Sep 4, 2025 |

---

**Notes:**
- All merge commits have been excluded from this worklog
- Small cleanup commits (e.g., gitignore updates, IDE file tracking) have been grouped under "Repository Maintenance" or "Code Quality"
- Commits are organized chronologically within each work item
- Frontend work primarily involves React, Vite, Tailwind CSS
- Backend work uses Spring Boot, JPA, MySQL, and JWT authentication
