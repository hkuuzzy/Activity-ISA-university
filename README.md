# Activity-ISA-university

## Development

Install dependencies once from the repository root:

```sh
npm install
```

Create `backend/.env` by copying `backend/.env.example`. If Compass uses a different MongoDB connection, set `MONGODB_URI` in that file to the connection URI from Compass and use the database name `activity_isa_university`. Keep credentials private; do not put the URI in frontend code or commit `backend/.env`.

Seed the new database with the existing demo students, teachers, and announcements:

```sh
npm run seed --workspace=backend
```

The seed command skips any collection that already contains records.

Run the backend and frontend in separate terminals from the repository root:

```sh
npm run dev:backend
```

```sh
npm run dev
```

The frontend proxies `/api` requests to the backend on port `3000`. You can also run `npm run build` or `npm run lint` from the root.