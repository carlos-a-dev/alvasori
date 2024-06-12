pnpm i

export DATABASE_URL="file:/var/www/stage.alvasori.net/db/alvasori.db"
npx prisma generate
npx prisma migrate deploy
unset DATABASE_URL

pnpm build
pm2 del alvasori-stage
pm2 start ecosystem.config.cjs --env stage
pm2 save