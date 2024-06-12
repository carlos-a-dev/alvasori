# Pull and deploy

pnpm i

export DATABASE_URL="file:../db/alvasori.db"
npx prisma generate
npx prisma migrate deploy
unset DATABASE_URL

pnpm build
pm2 --update-env restart alvasori
