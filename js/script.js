
// ===================================
// 1. FUNGSI FORMAT RUPIAH
// ===================================

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}


// ===================================
// 2. MENGHITUNG HARGA LAYANAN
// ===================================

function hitungBiaya(harga, jumlah) {
    return harga * jumlah;
}

// Amankan teks dari input pengguna sebelum dimasukkan ke template HTML.
function escapeHTML(teks) {
    return String(teks).replace(/[&<>"']/g, function (karakter) {
        const karakterAman = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return karakterAman[karakter];
    });
}


// ===================================
// 3. MENGAMBIL ELEMEN HTML
// ===================================

const form = document.getElementById("formPemesanan");
const pilihanLayanan = document.getElementById("layanan");
const tampilanHarga = document.getElementById("hargaLayanan");
const hasilPesanan = document.getElementById("hasilPesanan");


// ===================================
// 4. EVENT SAAT LAYANAN DIPILIH
// ===================================

if (pilihanLayanan) {

    pilihanLayanan.addEventListener("change", function () {

        const harga = Number(pilihanLayanan.value);

        const biaya = hitungBiaya(harga, 1);

        tampilanHarga.textContent = formatRupiah(biaya);

    });

}


// ===================================
// 5. VALIDASI DAN PROSES PEMESANAN
// ===================================

if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        // Mengambil nilai input
        const nama = document.getElementById("nama").value.trim();
        const telepon = document.getElementById("telepon").value.trim();
        const alamat = document.getElementById("alamat").value.trim();
        const layanan = pilihanLayanan.value;
        const tanggal = document.getElementById("tanggal").value;
        const catatan = document.getElementById("catatan").value.trim();

        // Validasi nomor telepon
        const nomorValid = /^[0-9]{10,15}$/.test(telepon);

        if (!nama || !telepon || !alamat || !layanan || !tanggal) {

            alert("Mohon lengkapi semua data wajib!");

            return;

        }

        if (!nomorValid) {

            alert("Nomor telepon harus terdiri dari 10-15 angka!");

            return;

        }

        // Menghitung total biaya
        const totalBiaya = hitungBiaya(Number(layanan), 1);

        // Menentukan nama layanan
        const namaLayanan = pilihanLayanan.options[
            pilihanLayanan.selectedIndex
        ].text;

        // Menampilkan ringkasan pesanan
        hasilPesanan.classList.remove("hidden");

        hasilPesanan.innerHTML = `
            <h3 class="text-2xl font-bold text-green-800 mb-4">
                Pemesanan Berhasil Dibuat!
            </h3>

            <p><strong>Nama:</strong> ${escapeHTML(nama)}</p>
            <p><strong>Telepon:</strong> ${escapeHTML(telepon)}</p>
            <p><strong>Alamat:</strong> ${escapeHTML(alamat)}</p>
            <p><strong>Layanan:</strong> ${escapeHTML(namaLayanan)}</p>
            <p><strong>Tanggal:</strong> ${escapeHTML(tanggal)}</p>
            <p><strong>Catatan:</strong> ${escapeHTML(catatan || "-")}</p>

            <hr class="my-4">

            <p class="font-bold text-lg">
                Total Biaya: ${formatRupiah(totalBiaya)}
            </p>
        `;

        alert("Pemesanan berhasil dibuat!");

    });

}


// ===================================
// 6. EVENT TOMBOL RESET
// ===================================

const tombolReset = document.getElementById("btnReset");

if (tombolReset) {

    tombolReset.addEventListener("click", function(event) {

        const yakin = confirm("Apakah kamu yakin ingin menghapus semua data?");

        if (!yakin) {
            event.preventDefault();
        } else {
            if (hasilPesanan) hasilPesanan.classList.add("hidden");
            if (tampilanHarga) tampilanHarga.textContent = "Rp0";
        }

    });

}


// ===================================
// 7. FUNGSI SAPA PENGUNJUNG
// ===================================

function sapaPengunjung() {

    const namaPengunjung = prompt("Siapa nama Anda?");

    if (namaPengunjung && namaPengunjung.trim() !== "") {

        alert("Selamat datang, " + namaPengunjung + "!");

    } else {

        alert("Selamat datang di SedotWC Pro!");

    }

}

// Menampilkan tahun secara otomatis
const elemenTahun = document.getElementById("tahun");

if (elemenTahun) {
    elemenTahun.textContent = new Date().getFullYear();
}

// Navigasi responsif: menu dropdown di layar kecil dan navigasi horizontal di desktop.
const tombolMenu = document.getElementById("menuToggle");
const menuNavigasi = document.getElementById("mainMenu");

if (tombolMenu && menuNavigasi) {
    const ikonMenu = document.getElementById("menuIcon");
    const ikonHamburger = '<path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />';
    const ikonTutup = '<path stroke-linecap="round" d="m6 6 12 12M18 6 6 18" />';

    function aturMenu(terbuka) {
        menuNavigasi.classList.toggle("hidden", !terbuka);
        menuNavigasi.classList.toggle("flex", terbuka);
        tombolMenu.setAttribute("aria-expanded", String(terbuka));
        tombolMenu.setAttribute("aria-label", terbuka ? "Tutup menu navigasi" : "Buka menu navigasi");
        if (ikonMenu) ikonMenu.innerHTML = terbuka ? ikonTutup : ikonHamburger;
    }

    tombolMenu.addEventListener("click", function () {
        aturMenu(tombolMenu.getAttribute("aria-expanded") !== "true");
    });

    menuNavigasi.addEventListener("click", function (event) {
        if (event.target.closest("a")) aturMenu(false);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") aturMenu(false);
    });

    window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 768px)").matches) aturMenu(false);
    });
}
