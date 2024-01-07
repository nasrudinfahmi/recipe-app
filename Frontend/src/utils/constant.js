const ABOUT_CONTENT = [
  {
    title: "Sejarah",
    paragraph:
      "Dimulai dari cinta kami pada seni memasak, situs ini lahir dari semangat untuk berbagi kelezatan melalui resep-resep terbaik.",
  },
  {
    title: "Visi dan Misi",
    paragraph:
      "Visi kami adalah membawa kegembiraan dan kemudahan melalui berbagai resep kuliner. Misi kami adalah memberikan inspirasi dan panduan praktis untuk pengalaman memasak yang menyenangkan dan memuaskan.",
  },
  {
    title: "Pengalaman dan Keahlian",
    paragraph:
      "Dengan pengalaman panjang dalam dunia kuliner, kami hadir untuk menyuguhkan resep-resep yang teruji dan keahlian yang teruji dalam memasak.",
  },
  {
    title: "Komitmen pada Kualitas",
    paragraph:
      "Kami selalu mengedepankan kualitas dalam setiap resep yang kami bagikan, dengan uji coba yang teliti dan pemilihan bahan terbaik.",
  },
];

const NAVIGATION = [
  {
    title: "Dashboard",
    href: "/dashboard",
    label: "Pergi ke halaman dashboard",
  },
  {
    title: "Resep",
    href: "#recipe",
    label: "Pergi ke Recipe Section.",
  },
  {
    title: "Tentang",
    href: "#about",
    label: "Pergi ke About Section.",
  },
  {
    title: "Kontak",
    href: "#contact",
    label: "Pergi ke Contact Section.",
  },
];

const LINK_DASHBOARD = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Tambah Resep", path: "/dashboard/add" },
  { title: "Ubah Resep", path: "/dashboard/edit" },
  { title: "Keluar", path: "/login" },
  { title: "Hapus Akun", path: "/register" },
];

export { ABOUT_CONTENT, NAVIGATION, LINK_DASHBOARD };
