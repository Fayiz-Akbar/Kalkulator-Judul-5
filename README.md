# Kalkulator-Judul-5


### **Deskripsi Singkat**

**Kalkulator Interaktif** ini adalah perangkat lunak berbasis web yang dirancang untuk membantu pengguna melakukan perhitungan matematika dengan cepat dan akurat. Dibangun menggunakan teknologi **HTML, CSS, dan JavaScript (Vanilla)**, aplikasi ini mengutamakan antarmuka yang bersih (*clean UI*), modern, dan **responsif**, sehingga tampilan tetap optimal baik saat diakses melalui *desktop* maupun perangkat *mobile* (smartphone).

Berbeda dengan kalkulator sederhana biasa, aplikasi ini menggunakan logika **Expression-Based**, yang memungkinkan pengguna melihat seluruh rumus yang diketik sebelum menghitung hasil akhir, serta menerapkan aturan matematika baku (BODMAS/Kabataku) untuk akurasi perhitungan.

---

### **Fitur Utama**

#### **1. Antarmuka & Pengalaman Pengguna (UI/UX)**
* **Desain Modern:** Menggunakan layout *Grid* yang rapi dengan skema warna *flat design* yang nyaman di mata.
* **Fully Responsive:** Tampilan otomatis menyesuaikan ukuran layar. Pada mode *mobile*, panel riwayat berpindah ke bawah agar mudah diakses.
* **Layar Informatif:** Menampilkan ekspresi/rumus yang sedang diketik secara lengkap, bukan hanya angka terakhir.

#### **2. Fungsionalitas Dasar & Logika Cerdas**
* **Operasi Aritmatika:** Penambahan, Pengurangan, Perkalian, dan Pembagian.
* **Logika Matematika (BODMAS):** Menghitung berdasarkan prioritas operator (misal: `5 + 3 × 2` hasilnya `11`, bukan `16`).
* **Validasi Input Pintar:**
    * Mencegah input nol ganda di awal (contoh: `00` tidak bisa diketik).
    * Mencegah desimal ganda (contoh: `5..5` tidak bisa diketik).
    * Koreksi operator otomatis (jika salah tekan `+` lalu menekan `×`, sistem otomatis menggantinya, bukan menumpuknya).
* **Clear Functions:**
    * **CE (Clear Entry):** Menghapus satu karakter terakhir (seperti *Backspace*).
    * **C (Clear All):** Mereset seluruh perhitungan.

#### **3. Fitur Lanjutan (Advanced)**
* **Fungsi Memori Lengkap (M+, M-, MR, MC):**
    * Menyimpan nilai sementara.
    * Logika **MR (Memory Recall)** yang cerdas: Mengganti angka yang sedang diketik dengan nilai memori (mencegah error angka bertumpuk seperti `70700`).
* **Riwayat Perhitungan (History):**
    * Menyimpan dan menampilkan 5 perhitungan terakhir secara *real-time*.
    * Fitur *scroll* otomatis pada panel riwayat.
    * Tombol "Hapus Riwayat" untuk membersihkan log.
* **Keyboard Support:** Mendukung input langsung dari keyboard fisik (Numpad, Enter untuk hasil, Backspace untuk hapus, Esc untuk reset).
* **Error Handling:** Mendeteksi dan mencegah pembagian dengan nol (menampilkan peringatan tanpa merusak aplikasi).

### **Tampilan UI Beserta Fitur**

**Tampilan Utama**
<img width="1909" height="925" alt="image" src="https://github.com/user-attachments/assets/424fd71c-0ceb-4152-875e-023e7b93e06b" />


**Tidak Bisaa Dibagi 0**
<img width="1899" height="919" alt="image" src="https://github.com/user-attachments/assets/d2d4344b-7462-4621-8b14-5b04ab4c13e0" />

**Memory Dikurang**
<img width="1897" height="919" alt="image" src="https://github.com/user-attachments/assets/f0fc6d77-2c9f-4ddd-8414-93a71eb10c87" />

**Memmory Ditambah**
<img width="1893" height="916" alt="image" src="https://github.com/user-attachments/assets/24533380-be18-4ff2-99d6-cdede7cdec4f" />

**Memory Direset**
<img width="1888" height="918" alt="image" src="https://github.com/user-attachments/assets/429cba68-927b-4d2e-8022-9859ec7e992f" />


<img width="1858" height="922" alt="image" src="https://github.com/user-attachments/assets/b3ec2fec-c648-43d8-9822-cb3714e66384" />

**Tampilan HP Responsive**
<img width="349" height="788" alt="image" src="https://github.com/user-attachments/assets/10fca823-66c9-4516-8c1d-2a582fe73644" />
