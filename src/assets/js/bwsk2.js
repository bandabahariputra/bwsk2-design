// get date
Date.prototype.toLongFormat = function () {
  const weekdays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const day = this.getDay();
  const date = this.getDate();
  const month = this.getMonth();
  const year = this.getFullYear();

  return `${weekdays[day]}, ${date}  ${monthNames[month]}  ${year}`;
}

const today = new Date();
const date = today.toLongFormat();

setInterval(function() {
  const time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();

  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (second < 10) {
    second = `0${second}`;
  }

  const topbarDateWrapper = document.querySelector(".topbar-date");
  if (topbarDateWrapper) {
    topbarDateWrapper.innerHTML = `${date} | <b style="font-size: 1em">${hour}:${minute}:${second}</b>`;
  }
});

// chocolat for infografis
Chocolat(document.querySelectorAll(".chocolat-infografis"));

// chocolat for gallery photo
Chocolat(document.querySelectorAll(".chocolat-photo"), { loop: true });

// swiper
const swiperGalleryPhoto = new Swiper(".gallery-photo .swiper-container", {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  }
});

// parallax effect
window.addEventListener("scroll", function() {
  const wScroll = this.scrollY;
  const headerTitle = document.querySelector(".jumbotron h1");

  if (headerTitle) {
    headerTitle.style.transform = `translateY(${wScroll}%)`;
  }
});
