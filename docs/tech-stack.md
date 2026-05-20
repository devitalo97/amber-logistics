# 3. Technology Stack

## Frontend

* **React & Vite:** Component runtime and optimized build tool pipeline.
* **Routing:** `Tanstack Router` for Client-side SPA routing.
* **State Management:** `Zustand` for client UI state; `Tanstack Query` for async server state cache/mutations.
* **Forms & Validation:** `React Hook Form` unified with `Zod` schema definition.
* **Design System:** `Tailwind CSS`, `Shadcn/ui` (accessible components), and `Lucide React` icons.

## Backend

* **Bun:** High-performance JavaScript runtime.
* **Hono:** Low-overhead framework.
* **Drizzle:** Type-safe ORM for relational queries and schema definition.

## Infrastructure & DevOps

* **Docker:** Container environment isolation.
* **GitHub Actions:** CI/CD pipeline automation (lint, test, build, deploy).
* **Google Cloud Run:** Serverless container execution scaling dynamically to zero.
* **Google Cloud Storage:** Static hosting for HTML
* **Google Application Load Balancer:** Load Balancer + Bucket backend for frontend static content
* **Google DNS:** Domain name routing
