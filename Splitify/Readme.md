# Splitify – Splitwise-like Expense Sharing Backend

A production-style backend API (no UI) similar to Splitwise.  
Users authenticate via **Firebase Authentication**, create groups, add shared expenses, split costs, track balances, record settlements, and get **debt simplification** suggestions.

> **Tech stack**
> - Node.js + Express
> - MongoDB (with Mongoose)
> - Firebase Authentication (Admin SDK)
> - Optional: Firebase Cloud Messaging (not implemented in this version)

---

## Features

- **Authentication**
  - Firebase Authentication (ID tokens only)
  - No custom password system
  - Each API request validates Firebase ID token
  - Users stored in MongoDB and linked to `firebaseUid`

- **Users**
  - Get current user profile (`/api/auth/me` or `/api/users/me`)
  - View global balances: who you owe and who owes you (`/api/users/me/balances` or `/api/balances/me`)

- **Groups**
  - Create groups
  - Add/remove members (only admins/creator)
  - List groups a user belongs to
  - List members of a group
  - Access control: only members can see or modify a group

- **Expenses**
  - Add expenses inside a group or standalone (no group)
  - Define participants per expense
  - Specify who paid
  - Supported split types:
    - `EQUAL` (even split)
    - `EXACT` (custom exact amounts)
    - `PERCENT` (percentage-based)
  - View group expenses
  - Update/delete expense (creator, payer, or group admin)

- **Balances**
  - Track who owes whom for all expenses and settlements
  - Per-group balances
  - Global balances per user
  - Derived from expenses + settlements (no separate balance table)

- **Debt Simplification (Mandatory)**
  - Compute minimal set of payments to settle all debts:
    - Group level: `/api/balances/group/:groupId/simplify`
    - Global level: `/api/balances/simplify`
  - Eliminates circular debts
  - **Read-only**: does not modify actual data unless settlements are recorded

- **Settlements**
  - Record manual payments between users
  - Group-level settlement history
  - Settlements affect future balance calculations

- **Security**
  - All protected routes require Firebase ID token
  - Users cannot access:
    - Groups they are not members of
    - Expenses they are not involved in (unless group admin)

---

## Architecture & Folder Structure

```bash
project-root/
  server.js
  .env                # local only, not committed
  serviceAccountKey.json  # local only, git-ignored
  src/
    config/
      db.js               # MongoDB connection
      firebase.js         # Firebase Admin init
    middlewares/
      authMiddleware.js   # Firebase token verification
      errorHandler.js
    models/
      User.js
      Group.js
      Expense.js
      Settlement.js
    services/
      authService.js      # (simple in this project; logic mostly in middleware)
      userService.js
      groupService.js
      expenseService.js
      balanceService.js
      settlementService.js
    controllers/
      authController.js
      userController.js
      groupController.js
      expenseController.js
      balanceController.js
      settlementController.js
    routes/
      authRoutes.js
      userRoutes.js
      groupRoutes.js
      expenseRoutes.js
      balanceRoutes.js
      settlementRoutes.js
      index.js            # mounts all routers
    utils/
      errorResponse.js
      debtSimplifier.js   # debt simplification algorithm
