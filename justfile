launch-kvm device:
    sudo qemu-system-x86_64 -enable-kvm -cpu host -m 2G -hda {{device}}
