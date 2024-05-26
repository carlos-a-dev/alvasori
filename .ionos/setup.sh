# create nginx user
adduser -m nginx

cd /home/nginx

mkdir .ssh
# paste the id_rsa.pub contents here
touch .ssh/authorized_keys
chown -R nginx:nginx .ssh

apt update
apt install -y nginx

cd /var/www

mkdir alvasori.net
chown -R nginx:nginx alvasori.net 
mkdir stage.alvasori.net
chown -R nginx:nginx stage.alvasori.net

# Adding alvasori.net to nginx server
echo "
server {
       listen 80;
       listen [::]:80;

       server_name alvasori.net;

       root /var/www/alvasori.net;
       index index.html;

       location / {
               try_files $uri $uri/ =404;
       }
}
" >> /etc/nginx/sites-available/default

# Adding stage.alvasori.net to nginx server
echo "
server {
       listen 80;
       listen [::]:80;

       server_name stage.alvasori.net;

       root /var/www/stage.alvasori.net;
       index index.html;

       location / {
               try_files $uri $uri/ =404;
       }
}
" >> /etc/nginx/sites-available/default

service nginx restart

# Install ssl certificates
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
certbot --nginx # Requires interaction

# Install Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 20
npm install --global yarn pm2
