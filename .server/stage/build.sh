# Pull and deploy
DATABASE_URL="file:../db/alvasori.db"

git pull --rebase
yarn
npx prisma generate
yarn build
npx prisma migrate deploy
pm2 restart alvasori-stage
