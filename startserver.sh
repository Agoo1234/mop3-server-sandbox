while :
do
	sudo killall node
	nohup node --max-old-space-size=3000 server &
	sleep 10800
	sudo killall node

done