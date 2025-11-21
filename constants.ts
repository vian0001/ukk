import { RouterConfig, Module } from './types';

export const ROUTER_CONFIGS: RouterConfig[] = [
  { name: 'R1 (Core)', ssid: '-', pass: '-', ip: '172.16.0.1/30', role: 'Core' },
  { name: 'R2', ssid: 'R2 DB1-Guru', pass: 'dbguru123', ip: '172.16.0.2/30', role: 'Zone' },
  { name: 'R3', ssid: 'R3 DB1-KelasX', pass: 'dbkelasx123', ip: 'Dynamic', role: 'Zone' },
  { name: 'R4', ssid: 'R4 DB1-KelasXI', pass: 'dbkelasxi123', ip: 'Dynamic', role: 'Zone' },
  { name: 'R5', ssid: 'R5 DB1-KelasXII', pass: 'dbkelasxii123', ip: 'Dynamic', role: 'Zone' },
  { name: 'R6', ssid: 'R6 DB1-Lab1', pass: 'dblab1123', ip: 'Dynamic', role: 'Zone' },
  { name: 'R7', ssid: 'R7 DB1-Lab 2', pass: 'dblab2123', ip: 'Dynamic', role: 'Zone' },
  { name: 'R8', ssid: 'R8 DB1-Perpus', pass: 'dbperpus123', ip: 'Dynamic', role: 'Zone' },
  { name: 'R9', ssid: 'R9 DB1-OSIS', pass: 'dbosis123', ip: 'Dynamic', role: 'Zone' },
  { name: 'R10', ssid: 'R10 DB1-Tamu', pass: 'dbtamu123', ip: 'Dynamic', role: 'Zone' },
];

export const EXAM_MODULES: Module[] = [
  {
    id: 'MODULE_1',
    title: 'Modul 1: Persiapan & Analisis',
    description: 'Perhitungan VLSM dan Desain Topologi',
    steps: [
      {
        id: 'm1-1',
        title: 'Analisis IP Address',
        content: 'IP Utama adalah 172.16.0.0/20. Total host tersedia: 4096. Topologi bersifat Hierarchical Daisy Chain (Berantai).',
        warning: 'Pastikan Anda memahami konsep VLSM sebelum membagi subnet.'
      },
      {
        id: 'm1-2',
        title: 'Rencana Subnetting (Contoh)',
        content: 'Gunakan /30 untuk antar router (P2P) dan /24 atau /25 untuk WLAN lokal di setiap zona.',
        command: `
Link R1-R2: 172.16.0.0/30
Link R2-R3: 172.16.0.4/30
...
WLAN R2: 172.16.1.0/24
WLAN R3: 172.16.2.0/24
`
      }
    ]
  },
  {
    id: 'MODULE_2',
    title: 'Modul 2: Konfigurasi Core Router (R1)',
    description: 'Gateway Internet, NAT, dan Routing Dasar',
    steps: [
      {
        id: 'm2-1',
        title: 'Koneksi Internet (Ether1)',
        content: 'Hubungkan Ether1 ke sumber internet dan minta IP secara otomatis.',
        command: '/ip dhcp-client add interface=ether1 disabled=no'
      },
      {
        id: 'm2-2',
        title: 'Konfigurasi Ether2 (Ke R2)',
        content: 'Pasang IP address untuk gateway ke jaringan lokal.',
        command: '/ip address add address=172.16.0.1/30 interface=ether2'
      },
      {
        id: 'm2-3',
        title: 'Konfigurasi NAT & DNS',
        content: 'Aktifkan NAT agar client bisa internetan, dan setting DNS.',
        command: `
/ip firewall nat add chain=srcnat src-address=172.16.0.0/20 action=masquerade
/ip dns set servers=8.8.8.8,1.1.1.1 allow-remote-requests=yes
`
      },
      {
        id: 'm2-4',
        title: 'Routing',
        content: 'Pastikan default route (0.0.0.0/0) sudah ada (biasanya otomatis dari DHCP Client). Jika R1 perlu menjangkau network di belakang R2 (jika routing statik), tambahkan rute spesifik, tapi dalam kasus daisy chain OSPF sering digunakan atau statik route berantai.',
        warning: 'Pastikan router R1 bisa ping ke 8.8.8.8 sebelum lanjut.'
      }
    ]
  },
  {
    id: 'MODULE_3',
    title: 'Modul 3: Router Zona (R2-R10)',
    description: 'Wireless, DHCP Server, dan Chaining',
    steps: [
      {
        id: 'm3-1',
        title: 'IP Address Antar Router',
        content: 'Set IP pada Ether1 (Input dari router sebelumnya) dan Ether2 (Output ke router berikutnya).',
        command: `
# Contoh di R2
# Input dari R1
/ip address add address=172.16.0.2/30 interface=ether1 
# Output ke R3
/ip address add address=172.16.0.5/30 interface=ether2
`
      },
      {
        id: 'm3-2',
        title: 'Konfigurasi Wireless (AP Bridge)',
        content: 'Setting mode AP Bridge, SSID sesuai tabel, dan Security Profile.',
        command: `
/interface wireless security-profiles add name=sekolah mode=dynamic-keys authentication-types=wpa2-psk wpa2-pre-shared-key=dbguru123
/interface wireless set [ find default-name=wlan1 ] mode=ap-bridge ssid="R2 DB1-Guru" security-profile=sekolah disabled=no
`
      },
      {
        id: 'm3-3',
        title: 'DHCP Server untuk Client',
        content: 'Berikan IP otomatis ke client yang connect ke WiFi.',
        command: `
/ip address add address=172.16.1.1/24 interface=wlan1
/ip pool add name=pool_wifi ranges=172.16.1.10-172.16.1.100
/ip dhcp-server add name=server1 interface=wlan1 address-pool=pool_wifi disabled=no
/ip dhcp-server network add address=172.16.1.0/24 gateway=172.16.1.1 dns-server=8.8.8.8
`
      },
      {
        id: 'm3-4',
        title: 'Default Route',
        content: 'Arahkan traffic internet ke router sebelumnya (Gateway).',
        command: '/ip route add dst-address=0.0.0.0/0 gateway=172.16.0.1'
      }
    ]
  },
  {
    id: 'MODULE_4',
    title: 'Modul 4: Firewall & Keamanan',
    description: 'Filter Rules, Layer-7, dan Address Lists',
    steps: [
      {
        id: 'm4-1',
        title: 'Address List Admin',
        content: 'Buat daftar IP yang diizinkan (Admin).',
        command: '/ip firewall address-list add list=Admin address=172.16.0.10'
      },
      {
        id: 'm4-2',
        title: 'Blokir Situs (Layer 7)',
        content: 'Blokir Facebook, Youtube, Tiktok menggunakan RegEx.',
        command: `
/ip firewall layer7-protocol add name=sosmed regexp="^.+(facebook.com|youtube.com|tiktok.com).*\$"
/ip firewall filter add chain=forward layer7-protocol=sosmed action=drop
`
      },
      {
        id: 'm4-3',
        title: 'Filter Rules Utama',
        content: 'Terapkan aturan keamanan sesuai soal.',
        command: `
# Drop Input dari WAN (kecuali ICMP)
/ip firewall filter add chain=input in-interface=ether1 protocol=icmp action=accept
/ip firewall filter add chain=input in-interface=ether1 action=drop

# Allow DNS, NTP, ICMP Keluar
/ip firewall filter add chain=output protocol=udp port=53 action=accept
/ip firewall filter add chain=output protocol=udp port=123 action=accept
/ip firewall filter add chain=output protocol=icmp action=accept

# Drop Brute Force Winbox (Port 8291)
/ip firewall filter add chain=input protocol=tcp dst-port=8291 action=drop
`
      },
      {
        id: 'm4-4',
        title: 'Mangle & Connection Tracking',
        content: 'Batasi koneksi simultan.',
        command: '/ip firewall filter add chain=input protocol=tcp connection-limit=10,32 action=drop'
      }
    ]
  }
];