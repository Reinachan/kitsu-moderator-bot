#! /bin/bash

# set execution permission for start.sh
sudo chmod +x ./start.sh
sudo chmod +x ./pre-start.sh

# set permissions so only owner has read/write
sudo chmod 640 ./kitsu-moderator-bot.service

# copy service file to systemd service directory
sudo cp ./kitsu-moderator-bot.service /etc/systemd/system

# reload the daemon
sudo systemctl daemon-reload

# enable starting when the computer boots
sudo systemctl enable kitsu-moderator-bot

# start the service immediately
sudo systemctl start kitsu-moderator-bot