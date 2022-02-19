while :
do
	nohup node server &
	sleep 10800
	sudo killall node

done