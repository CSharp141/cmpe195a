# USB Install Instructions

Find the usb device to use with

```shell
lsblk
```

Create the partition table

```shell
sudo sgdisk -o -n 1:0:+10M -t 1:EF02 -n 2:0:+500M -t 2:EF00 -n 3:0:0 -t 3:8300 /dev/sdX
```

Format the EFI partition with fat32

```shell
sudo mkfs.fat -F32 /dev/sdX2
```

Format the Linux partition with ext4

```shell
sudo mkfs.ext4 /dev/sdX3
```

Mount the root filesystem

```shell
sudo mount --mkdir /dev/sdX3 /mnt/usb
```

Mount the EFI partition

```shell
sudo mount --mkdir /dev/sdX2 /mnt/usb/boot
```

Install packages with pacstrap

```shell
sudo pacstrap /mnt/usb linux linux-firmware base vim
```

Generate the new fstab. This has to be this way because both operations need to be done by a super user

```shell
sudo bash -c 'genfstab -U /mnt/usb > /mnt/usb/etc/fstab'
```

chroot into the new system

```shell
sudo arch-chroot /mnt/usb
```

symlink the locale for los angeles

```shell
ln -sf /usr/share/zoneinfo/America/Los_Angeles /etc/localtime
```

edit `/etc/locale.gen` uncomment `en_US.UTF-8 UTF-8`

```shell
vim /etc/locale.gen
```

generate the locale info

```shell
locale-gen
```

Set the LANG variable in `/etc/locale.conf`

```shell
echo LANG=en_US.UTF-8 > /etc/locale.conf
```

Generate `/etc/adjtime`

```shell
hwclock --systohc
```

Set the hostname

```shell
echo UsbProctor > /etc/hostname
```

Add this content to the `/etc/hosts` file with `vim /etc/hosts`

```shell
127.0.0.1  localhost
::1        localhost
127.0.1.1  UsbProctor.localdomain  UsbProctor
```

Set the root password

```shell
passwd
```

Install `grub` and `efibootmgr`

```shell
pacman -S grub efibootmgr
```

Ensure grub is installed for both modes (BIOS and UEFI). This might take a while.

```shell
grub-install --target=i386-pc --recheck /dev/sdX
grub-install --target=x86_64-efi --efi-directory /boot --recheck --removable
```

Generate a GRUB configuration

```shell
grub-mkconfig -o /boot/grub/grub.cfg
```

Set up networkd for wired connections with `vim /etc/systemd/network/10-ethernet.network`

```shell
[Match]
Name=en*
Name=eth*

[Network]
DHCP=yes
IPv6PrivacyExtensions=yes

[DHCPv4]
RouteMetric=10

[IPv6AcceptRA]
RouteMetric=10
```

Enable networkd

```shell
systemctl enable systemd-networkd.service
```

Install and enable `iwd` for wireless networks

```shell
pacman -S iwd
systemctl enable iwd.service
```

Set up networkd for wireless connections with `vim /etc/systemd/network/20-wifi.network`

```shell
[Match]
Name=wl*

[Network]
DHCP=yes
IPv6PrivacyExtensions=yes

[DHCPv4]
RouteMetric=20

[IPv6AcceptRA]
RouteMetric=20
```

Enable `resolved`

```shell
systemctl enable systemd-resolved.service
```

Create link to `/run/systmed/resolve/stub-resolv.conf`

> Exit chroot for this command, and then re-enter after `exit` then after run `sudo arch-chroot /mnt/usb`

```shell
sudo ln -sf /run/systemd/resolve/stub-resolv.conf /mnt/usb/etc/resolv.conf
```

Enable `timesyncd`

```shell
systemctl enable systemd-timesyncd.service
```

Create the ExamUser with no password

```shell
useradd -m ExamUser
```

Decrease excess writes to the USB by using `noatime` instead of `relatime` or `atime`

`vim /etc/fstab`

```shell
# /dev/sdX3
UUID=uuid1  /      ext4  rw,noatime      0 1

# /dev/sdX2
UUID=uuid2  /boot  vfat  rw,noatime,...  0 2
```

Prevent the systemd journal service from writing to the USB

```shell
mkdir -p /etc/systemd/journald.conf.d
vim /etc/systemd/journald.conf.d/10-volatile.conf
```

```shell
[Journal]
Storage=volatile
SystemMaxUse=16M
RuntimeMaxUse=32M
```

Remove `autodetect` from mkinitpcio HOOKS

```shell
vim /etc/mkinitcpio.conf
```

Disable fallback image generation by removing `fallback` from PRESETS

```shell
vim /etc/mkinitcpio.d/linux.preset
```

Remove the existing fallback image:

```shell
rm /boot/initramfs-linux-fallback.img
```

Generate a new initcpio image:

```shell
mkinitcpio -P
```

Enable microcode updates

```shell
pacman -S amd-ucode intel-ucode
```

Add ucode image files to custom entries in `vim /etc/grub.d/40_custom`

```shell
...
menuentry 'Arch Linux ...' ...
...
initrd /intel-ucode.img /amd-ucode.img ...
...
```

Generate a new GRUB configuration

```shell
grub-mkconfig -o /boot/grub/grub.cfg
```

Ensure that main ethernet and wifi interfaces are always named eth0 and wlan0

```shell
ln -s /dev/null /etc/udev/rules.d/80-net-setup-link.rules
```

Set up autologin

```shell
mkdir /etc/systemd/system/getty@tty1.service.d
vim /etc/systemd/system/getty@tty1.service.d/autologin.conf
```

```shell
[Service]
ExecStart=
ExecStart=-/sbin/agetty -o '-p -f -- \\u' --noclear --autologin ExamUser %I $TERM
Type=simple
Environment=XDG_SESSION_TYPE=x11
```

Install necessary packages for autostarting with X

```shell
pacman -S xorg-server xorg-xinit xf86-video-vesa openbox ttf-dejavu ttf-liberation networkmanager conky stalonetray
```

Enable network manager

```shell
systemctl enable systemd-timesyncd.service
```

Set up `xorg-xinit` for autologin

```shell
cp /etc/X11/xinit/xinitrc /home/ExamUser/.xinitrc
vim /home/ExamUser/.xinitrc
```

Replace the end of the file where programs are started with

```shell
exec openbox-session
```

Set up openbox autostart config

```shell
mkdir -p /home/ExamUser/.config/openbox
cp -a /etc/xdg/openbox /home/ExamUser/.config/
vim /home/ExamUser/.config/openbox/autostart
```

Append this to the end of the file

```shell
xset -b
(sleep 3s && nm-applet) &
(sleep 3s && stalonetray) &
(sleep 3s && conky) &
```

Configure startx to launch X when ExamUser is logged in

```shell
vim /home/ExamUser/.bash_profile
```

Append this to the end of the `.bash_profile`

```shell
if [ -z "$DISPLAY" ] && [ "$XDG_VTNR" -eq 1 ]; then
  exec startx
fi
```
