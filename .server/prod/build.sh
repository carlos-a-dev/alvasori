# Pull and deploy

yarn

export DATABASE_URL="file:../db/alvasori.db"
npx prisma generate
npx prisma migrate deploy
unset DATABASE_URL

yarn build
pm2 --update-env restart alvasori
