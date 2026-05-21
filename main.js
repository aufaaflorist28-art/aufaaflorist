// Efek blur pada Navbar saat di-scroll
const nav = document.getElementById('mainNav');

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// Menambahkan efek fade-in yang halus untuk elemen saat di-scroll (berguna untuk halaman lain nanti)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
  observer.observe(el);
});
/* =========================================
   SISTEM PEMBELIAN VIA WHATSAPP
   ========================================= */

// Masukkan nomor WhatsApp admin Aufaa Florist (gunakan format 62 tanpa + atau 0)
const waNumber = "6285829136443"; 

// Tangkap semua tombol yang memiliki class 'wa-buy-btn'
const waButtons = document.querySelectorAll('.wa-buy-btn');

waButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    // Cegah aksi default jika tombol berada di dalam tag <a> atau <form>
    e.preventDefault(); 
    
    // Ambil data dari tombol yang diklik
    const productName = this.getAttribute('data-name');
    const productPrice = this.getAttribute('data-price');
    
    // Format harga menjadi Rupiah agar rapi di pesan WhatsApp
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(productPrice);

    // Buat template pesan otomatis
    const message = `Halo AUFAA FLORIST! 🌿%0A%0ASaya tertarik dengan produk berikut:%0A📌 *${productName}*%0A💰 *${formattedPrice}*%0A%0AApakah stoknya masih tersedia?`;
    
    // Buat link API WhatsApp
    const waUrl = `https://wa.me/${waNumber}?text=${message}`;
    
    // Buka tab baru menuju WhatsApp
    window.open(waUrl, '_blank');
  });
});
