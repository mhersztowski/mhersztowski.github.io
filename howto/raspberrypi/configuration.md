## Static adress configuration for wifi

sudo nano /etc/dhcpcd.conf

In end of file add

interface wlan0

static ip_address=192.168.1.103/24

static routers=192.168.1.1

static domain_name_servers 192.168.1.1 8.8.8.8

noipv6

## Problems with ssh and frozen

sudo nano /etc/ssh/sshd_config

In the end of file

IPQoS 0x00
