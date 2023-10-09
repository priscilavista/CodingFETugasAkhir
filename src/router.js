import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
    //   Login
      {
        path: "/login-page",
        name: "LoginPage",
        meta: { title: "LoginPage" },
        component: importComponent("LoginPage"),
      },
      {
        path: "/dashboard-page",
        component: importComponent("DashboardLayout"),
        children: [
            //Dashboard
            {
                path: "/dashboard-page",
                name: "Dashboard",
                meta: { title: "DashboardPage" },
                component: importComponent("DashboardPage"),
                // beforeEnter(to, from, next) {
                //     if (localStorage.getItem("token")) next();
                //     else next({ name: "Login" });
                // },
            },
            //Pegawai
            {
              path: "/pegawai-page",
              name: "Pegawai",
              meta: { 
                title: "PegawaiPage" ,
                // breadcrumb: [
                //   { title: 'Dashboard', url: '/dashboard-page' },
                //   { title: 'Pegawai', active: true },
                // ],
              },
              component: importComponent("DataMaster/PegawaiPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //SPPBE
            {
              path: "/sppbe-page",
              name: "SPPBE",
              meta: { 
                title: "SPPBEPage" ,
              },
              component: importComponent("DataMaster/SPPBEPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Pangkalan
            {
              path: "/pangkalan-page",
              name: "Pangkalan",
              meta: { 
                title: "PangkalanPage" ,
              },
              component: importComponent("DataMaster/PangkalanPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Kendaraan
            {
              path: "/kendaraan-page",
              name: "Kendaraan",
              meta: { 
                title: "KendaraanPage" ,
              },
              component: importComponent("DataMaster/KendaraanPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Transaksi Pangkalan
            {
              path: "/transaksi-pangkalan-page",
              name: "Transaksi",
              meta: { 
                title: "TransaksiPage" ,
              },
              component: importComponent("Transaksi/TransaksiPangkalanPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Transaksi
            {
              path: "/transaksi-page",
              name: "Transaksi",
              meta: { 
                title: "TransaksiPage" ,
              },
              component: importComponent("Transaksi/TransaksiPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Gas Bocor
            {
              path: "/gas-bocor-page",
              name: "Gas Bocor",
              meta: { 
                title: "GasBocorPage" ,
              },
              component: importComponent("DataMaster/GasBocorPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
             //Tambah Gas Bocor
             {
              path: "/tambah-gas-bocor-page",
              name: "Gas Bocor",
              meta: { 
                title: "GasBocorPage" ,
              },
              component: importComponent("DataMaster/TambahGasBocorPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Tambah Kelangkaan Gas
            {
              path: "/tambah-kelangkaan-gas-page",
              name: "Kelangkaan Gas",
              meta: { 
                title: "KelangkaanGasPage" ,
              },
              component: importComponent("DataMaster/TambahKelangkaanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Alokasi Fakultatif
            {
              path: "/alokasi-fakultatif-page",
              name: "Alokasi Fakultatif",
              meta: { 
                title: "AlokasiFakultatifPage" ,
              },
              component: importComponent("DataMaster/AlokasiFakultatifPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Konfirmasi Alokasi Fakultatif
            {
              path: "/konfirmasi-alokasi-fakultatif-page",
              name: "Konfirmasi Alokasi Fakultatif",
              meta: { 
                title: "KonfirmasiAlokasiFakultatifPage" ,
              },
              component: importComponent("DataMaster/KonfirmasiAlokasiFakultatifPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Alokasi Pengambilan Gas
            {
              path: "/alokasi-pengambilan-gas-page",
              name: "Alokasi Pengambilan Gas",
              meta: { 
                title: "AlokasiPengambilanGasPage" ,
              },
              component: importComponent("JadwalDanAlokasi/AlokasiPengambilanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Kalender Alokasi Pengambilan Gas
            {
              path: "/kalender-alokasi-pengambilan-gas-page",
              name: "Kalender Alokasi Pengambilan Gas",
              meta: { 
                title: "KalenderAlokasiPengambilanGasPage" ,
              },
              component: importComponent("JadwalDanAlokasi/KalenderAlokasiPengambilanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Jadwal Pengambilan Gas Driver
            {
              path: "/jadwal-pengambilan-gas-page",
              name: "Jadwal Pengambilan Gas",
              meta: { 
                title: "JadwalPengambilanGasPage" ,
              },
              component: importComponent("JadwalDanAlokasi/JadwalPengambilanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Kalender Jadwal Pengambilan Gas
            {
              path: "/kalender-jadwal-pengambilan-gas-page",
              name: "Kalender Jadwal Pengambilan Gas",
              meta: { 
                title: "KalenderJadwalPengambilanGasPage" ,
              },
              component: importComponent("JadwalDanAlokasi/KalenderJadwalPengambilanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Kalender Jadwal Pengambilan Gas Driver
            {
              path: "/kalender-jadwal-pengambilan-gas-driver-page",
              name: "Kalender Jadwal Pengambilan Gas",
              meta: { 
                title: "KalenderJadwalPengambilanGasPage" ,
              },
              component: importComponent("JadwalDanAlokasi/KalenderJadwalPengambilanGasDriverPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Jadwal Pangkalan
            {
              path: "/jadwal-rutin-pangkalan-page",
              name: "Jadwal Rutin Pangkalan",
              meta: { 
                title: "JadwalRutinPangkalanPage" ,
              },
              component: importComponent("JadwalDanAlokasi/JadwalPangkalanPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Jadwal Pengiriman Gas Driver
            {
              path: "/jadwal-pengiriman-gas-page",
              name: "Jadwal Pengiriman Gas",
              meta: { 
                title: "JadwalPengirimanGasPage" ,
              },
              component: importComponent("JadwalDanAlokasi/JadwalPengirimanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Kalender Jadwal Pengiriman Gas
            {
              path: "/kalender-jadwal-pengiriman-gas-page",
              name: "Kalender Jadwal Pengiriman Gas",
              meta: { 
                title: "KalenderJadwalPengirimanGasPage" ,
              },
              component: importComponent("JadwalDanAlokasi/KalenderJadwalPengirimanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Kalender Jadwal Pengiriman Gas Driver
            {
              path: "/kalender-jadwal-pengiriman-gas-driver-page",
              name: "Kalender Jadwal Pengiriman Gas",
              meta: { 
                title: "KalenderJadwalPengirimanGasDriverPage" ,
              },
              component: importComponent("JadwalDanAlokasi/KalenderJadwalPengirimanGasDriverPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Kalender Jadwal Penerimaan Gas
            {
              path: "/kalender-jadwal-penerimaan-gas-page",
              name: "Kalender Jadwal Penerimaan Gas",
              meta: { 
                title: "KalenderJadwalPenerimaanGasPage" ,
              },
              component: importComponent("JadwalDanAlokasi/KalenderJadwalPenerimaanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Surat Kuasa Pengambilan Gas
            {
              path: "/surat-kuasa-pengambilan-gas-page",
              name: "Surat Kuasa Pengambilan Gas",
              meta: { 
                title: "SuratKuasaPengambilanGasPage" ,
              },
              component: importComponent("Dokumen/SuratKuasaPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Laporan Kelangkaan Gas
            {
              path: "/laporan-kelangkaan-gas-page",
              name: "Laporan Kelangkaan Gas",
              meta: { 
                title: "LaporanKelangkaanGasPage" ,
              },
              component: importComponent("Dokumen/LaporanKelangkaanGasPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Laporan Kelangkaan Gas
            {
              path: "/laporan-transaksi-pangkalan-page",
              name: "Laporan Transaksi Pangkalan",
              meta: { 
                title: "LaporanTransaksiPangkalanPage" ,
              },
              component: importComponent("Dokumen/LaporanTransaksiPangkalanPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
            //Laporan Bulanan
            {
              path: "/laporan-bulanan-page",
              name: "Laporan Bulanan",
              meta: { 
                title: "LaporanBulananPage" ,
              },
              component: importComponent("Dokumen/LaporanBulananPage"),
              // beforeEnter(to, from, next) {
              //     if (localStorage.getItem("token")) next();
              //     else next({ name: "Login" });
              // },
            },
        ],
      },
      {
        path: "*",
        redirect: "/login-page",
      },
    ],
  });
  
  export default router;
  