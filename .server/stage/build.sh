# Pull and deploy
export DATABASE_URL="file:../db/alvasori.db"

yarn
npx prisma generate
yarn build
npx prisma migrate deploy
pm2 restart alvasori-stage
