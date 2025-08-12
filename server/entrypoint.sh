#!/bin/sh
set -e

echo "Starting server..."
npx prisma generate

count=10
try_count=0

until pg_isready -h "postgres" -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  try_count=$((try_count + 1))

  if [ "$try_count" -ge "$count" ]; then
    >&2 echo "Postgres is still unavailable after $count attempts — exiting"
    exit 1
  fi

  echo "Postgres is unavailable — waiting 5 seconds... (attempt $try_count/$count)"
  sleep 5
done

echo "Postgres is available. Running migrations..."
npx prisma migrate dev --name init

echo "Database migration completed."
echo "Starting application..."
exec npm run start:dev

exec "$@"
