#!/bin/bash
time=`date +%Y%m%d%H`
backmongodbFile=mongodb$time.tar.gz
cd /Users/hanjinbo/Documents/xiaoke/练习项目/Node-Server/public/MongoDB_backup 
mongodump -h 127.0.0.1 --port 27017 -d FuLingOnlineLearningDB  -o MongoDB_FuLingOnlineLearningDB_backup/
tar czf $backmongodbFile MongoDB_FuLingOnlineLearningDB_backup/
rm MongoDB_FuLingOnlineLearningDB_backup/ -rf 