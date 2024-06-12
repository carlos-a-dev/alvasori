pnpm i

export DATABASE_URL="file:/var/www/alvasori.net/db/alvasori.db"
npx prisma generate
npx prisma migrate deploy
unset DATABASE_URL

pnpm build
pm2 del alvasori
pm2 start ecosystem.config.cjs --env production
pm2 save
