do
	chmod 777 memory.txt
	node --max-old-space-size=3000 server &
	sleep 15
	sudo killall node

done
