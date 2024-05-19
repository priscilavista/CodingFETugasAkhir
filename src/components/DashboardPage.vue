<template>
    <v-main class="list" style="margin: auto">
        <v-breadcrumbs
            :items="breadCrumbItems"
            divider="/"
            style="margin-left:-25px; margin-top:-25px; width:30%"
        />

        <v-spacer />
        
        <div v-if="isWideScreen" style="margin-bottom: 50px">
            <h3 style="float:left;">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div v-else-if="isMediumScreen" style="margin-bottom: 125px">
            <h3 style="float:left">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div v-else style="margin-bottom: 175px">
            <h3 style="float:left">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div>
            <div v-if="role === 'pegawai'">
                <div v-if="jabatan === 'Manajer' && jabatan !== ''">
                    <dashboard-manajer 
                        :headers="headersManajer" :dataRiwayat="dataRiwayatManager"
                        :monthNow="monthNow" :kelangkaanGasBulanan="kelangkaanGasBulanan"
                        :gasNormal="gasNormal" :gasBocor="gasBocor" :totalPembelian="totalPembelian"
                        :totalPengambilanGas="totalPengambilanGas" :totalPengirimanGas="totalPengirimanGas"
                    />
                </div>

                <div v-else-if="jabatan === 'Driver' && jabatan !== ''">
                    <dashboard-driver 
                        :headers="headersDriver" :dataRiwayat="dataRiwayatDriver" 
                        :daftarKegiatanDriver="daftarKegiatanDriver" :monthNow="monthNow"
                        :pengambilanGasSelesai="pengambilanGasSelesaiDriver" :pengambilanGasSisa="pengambilanGasSisaDriver"
                        :pengirimanGasSelesai="pengirimanGasSelesaiDriver" :pengirimanGasSisa="pengirimanGasSisaDriver"
                    />
                </div>

                <div v-if="jabatan === 'Admin' && jabatan !== ''">
                    <dashboard-admin 
                        :users="users" :headers="headersAdmin"
                        :dataRiwayat="dataRiwayatAdmin" :monthNow="monthNow"
                        :pengambilanGasSisa="pengambilanGasSisaAdmin" :pengirimanGasSisa="pengirimanGasSisaAdmin"
                    />
                </div>
            </div>

            <div v-else>
                <dashboard-pangkalan 
                    :monthNow="monthNow" :items="pangkalanItems" :headers="headersPangkalan"
                    :stokAwal="stokAwalPangkalan" :stokAkhir="stokAkhirPangkalan"
                    :jadwalSenin = "jadwalSenin" :jadwalSelasa = "jadwalSelasa"
                    :jadwalRabu = "jadwalRabu" :jadwalKamis = "jadwalKamis"
                    :jadwalJumat = "jadwalJumat" :jadwalSabtu = "jadwalSabtu"
                />
            </div>
                        
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64" />
            </v-overlay>
        </div>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
    import DashboardAdmin from './DashboardComponent/DashboardAdmin.vue';
    import DashboardDriver from './DashboardComponent/DashboardDriver.vue';
    import DashboardManajer from './DashboardComponent/DashboardManajer.vue';
    import DashboardPangkalan from './DashboardComponent/DashboardPangkalan.vue';

    export default {
        name: "DashboardPage",

        watch: {
            $route: {
                immediate: true,
                handler() {
                    document.title = "Dashboard";
                },
            },
        },

        components: { 
            DashboardPangkalan, DashboardManajer, 
            DashboardDriver, DashboardAdmin
        },

        data() {
            return {
                color: "",
                jabatan: "",
                monthNow: "",
                overlay: false,
                snackbar: false,
                error_message: "",
                role: localStorage.getItem("role"),
                isWideScreen: window.innerWidth >= 1000,
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                breadCrumbItems: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                ],

                // Manager Variable
                gasBocor: 0,
                gasNormal: 0,
                totalPembelian: 0,
                totalPengirimanGas: 0,
                totalPengambilanGas: 0,
                dataRiwayatManager: [],
                kelangkaanGasBulanan: 0,
                headersManajer: [
                    { text: 'Pangkalan', align: 'start', value: 'nama_pangkalan' },
                    { text: 'Total Tabung', align: 'end', value: 'jumlah_pembelian' },
                ],

                //Driver Variable
                dataRiwayatDriver: [],
                daftarKegiatanDriver: [],
                pengirimanGasSisaDriver: 0,
                pengambilanGasSisaDriver: 0,
                pengirimanGasSelesaiDriver: 0,
                pengambilanGasSelesaiDriver: 0,
                headersDriver: [
                    { text: 'Jenis Kegiatan', align: 'start', value: 'jenis_kegiatan' },
                    { text: 'Tanggal Pelaksanaan', align: 'center', value: 'tanggal_kegiatan' },
                    { text: 'Lokasi Pengambilan / Pengiriman', align: 'center', value: 'lokasi_kegiatan' },
                    { text: 'Jenis Alokasi', align: 'start', value: 'jenis_alokasi' },
                    { text: 'Jumlah Tabung Gas', align: 'end', value: 'jumlah_gas' },
                ],

                // Admin Variable
                users: [],
                dataRiwayatAdmin: [],
                pengirimanGasSisaAdmin: 0,
                pengambilanGasSisaAdmin: 0,
                headersAdmin: [
                    { text: 'Jenis Kegiatan', align: 'start', value: 'jenis_kegiatan' },
                    // { text: 'Tanggal Pelaksanaan', align: 'center', value: 'tanggal_kegiatan' },
                    { text: 'Lokasi Pengambilan / Pengiriman', align: 'center', value: 'lokasi_kegiatan' },
                    { text: 'Jenis Alokasi', align: 'start', value: 'jenis_alokasi' },
                    { text: 'Jumlah Tabung Gas', align: 'end', value: 'jumlah_gas' },
                ],

                //Pangkalan Variable
                jadwalRabu: [],
                jadwalSenin: [],
                jadwalKamis: [],
                jadwalJumat: [],
                jadwalSabtu: [],
                jadwalSelasa: [],
                pangkalanItems: [],
                stokAwalPangkalan: 0,
                stokAkhirPangkalan: 0,
                headersPangkalan: [
                    { text: 'Nama Driver', align: 'text-left' }, 
                    { text: 'Jumlah Alokasi', align: 'text-right' }
                ],
            }
        },

        methods: {
            getDateNow() {
                let month = new Date().toLocaleDateString("ID-id", { month: 'long' }).split('T')[0];
                this.monthNow = month[0].toUpperCase() + month.slice(1);
            },

            getDataUser() {
                this.overlay = true;
                var url = this.$api;

                if(this.role === 'pegawai')
                {
                    url = url + "/pegawai/getById";
                    this.$http.get(url + "/" + localStorage.getItem("id"))
                        .then((response) => {
                            if(response.data.code == 200)
                            {
                                var res = response.data.data;
                                this.jabatan = res.role_pegawai;
                                localStorage.setItem("jabatan", res.role_pegawai);

                                if(res.role_pegawai === 'Manajer')
                                {
                                    this.getDataKelangkaanBulanan();
                                    this.getDataPengambilanTahunan();
                                    this.getDataPengirimanTahunan();
                                    this.getDataDetailGasBocor();
                                    this.getDataTotalTransaksiManajer();
                                    this.getDataRiwayatTransaksi();
                                }
                                else if(res.role_pegawai === 'Driver')
                                {
                                    this.getDataPengambilanDriver();
                                }
                                else if(res.role_pegawai === 'Admin')
                                {
                                    this.getDataPengambilanAdmin();
                                }
                            }
                            else
                            {
                                this.color = "red";
                                this.snackbar = true;
                                this.error_message = response.data.message;
                                this.overlay = false;
                            }
                        })
                        .catch((error) => {
                            this.color = "red";
                            this.snackbar = true;
                            this.overlay = false;
                            this.error_message = error.response.data.message;
                        });
                }
                else
                {
                    this.getDataStokPangkalan();
                    this.getDataJadwalPangkalan();
                    this.getDataAlokasiPangkalan();
                }
            },

            sortDataByDate(object1, object2)
            {
                var date1 = new Date(object1.tanggal_kegiatan);
                var date2 = new Date(object2.tanggal_kegiatan);
                
                if(date1 < date2)
                {
                    return -1;
                }
                if(date1 > date2)
                {
                    return 1;
                }

                return 0;
            },

            //Method Manajer
            getDataKelangkaanBulanan() {
                var url = this.$api;
                var thn = new Date().getFullYear();
                var body = { 'tahun': thn };

                url = url + "/kelangkaanGas/postBySearchDataManajer";
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            var res = response.data.data;
                            if(res.jumlah_permintaan !== null)
                            {
                                this.kelangkaanGasBulanan = parseInt(res.jumlah_permintaan);
                            }
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            getDataPengambilanTahunan() {
                var url = this.$api;
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };

                url = url + "/jadwalPengambilanGas/postBySearchDataManajer";
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            var res = response.data.data;
                            this.totalPengambilanGas = parseInt(res.jumlah_pengambilan);
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            getDataPengirimanTahunan() {
                var url = this.$api;
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };

                url = url + "/jadwalPengirimanGas/postBySearchDataManajer";
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            var res = response.data.data;
                            this.totalPengirimanGas = parseInt(res.jumlah_pengiriman);
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            getDataDetailGasBocor()
            {
                var url = this.$api + "/gasBocor/postBySearchDataManajer";
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var res = response.data.data;
                            var normal = 0;
                            if(res.total_alokasi_pengambilan_gas !== null)
                            {
                                normal = parseInt(res.total_alokasi_pengambilan_gas) - parseInt(res.jumlah_gas_bocor);
                            }
                            var bocor = parseInt(res.jumlah_gas_bocor);

                            this.gasNormal = normal;
                            this.gasBocor = bocor;
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            getDataTotalTransaksiManajer() {
                let today = new Date;
                let year = today.getFullYear();
                var body = { 
                    'tahun': year
                };
                var url = this.$api;

                url = url + "/transaksi/postDashboardManajer";
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            var total = 0;
                            var res = response.data.data;
                            res.forEach(element => {
                                total = parseInt(element.jumlah_pembelian) + parseInt(total);
                            });

                            this.totalPembelian = total;
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            getDataRiwayatTransaksi()
            {
                var url = this.$api + "/transaksi/postBySearchDataManajer";
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var res = response.data.data;
                            this.dataRiwayatManager = res;

                            this.overlay = false;
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            //Metode Driver
            getDataPengambilanDriver()
            {
                var url = this.$api + "/jadwalPengambilanGas/postBySearchDataDriver";
                var date = new Date();
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn, 'id_pegawai': localStorage.getItem('id') };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var tempList = [];
                            var res = response.data.data;
                            
                            res.forEach(element => {
                                var tempDate = new Date(element.tanggal_pengambilan_gas);
                                if(tempDate <= date)
                                {
                                    this.pengambilanGasSelesaiDriver = 1 + this.pengambilanGasSelesaiDriver;
                                }
                                else
                                {
                                    this.pengambilanGasSisaDriver = 1 + this.pengambilanGasSisaDriver;
                                }

                                tempList = [
                                    ...tempList,
                                    {
                                        'jenis_kegiatan': 'Pengambilan',
                                        'lokasi_kegiatan': element.nama_sppbe,
                                        'jumlah_gas': element.alokasi_pengambilan_gas,
                                        'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                        'jenis_alokasi': element.jenis_alokasi_pengambilan_gas,
                                    }
                                ];
                            });

                            this.getDataPengirimanDriver(tempList);
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },
            
            getDataPengirimanDriver(tempList)
            {
                var url = this.$api + "/jadwalPengirimanGas/postBySearchDataDriver";
                var date = new Date();
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn, 'id_pegawai': localStorage.getItem('id') };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var res = response.data.data;
                            
                            res.forEach(element => {
                                var tempDate = new Date(element.tanggal_pengambilan_gas);
                                
                                if(tempDate <= date)
                                {
                                    this.pengirimanGasSelesaiDriver = 1 + this.pengirimanGasSelesaiDriver;
                                }
                                else
                                {
                                    this.pengirimanGasSisaDriver = 1 + this.pengirimanGasSisaDriver;
                                }

                                tempList = [
                                    ...tempList,
                                    {
                                        'jenis_kegiatan': 'Pengiriman',
                                        'lokasi_kegiatan': element.nama_pangkalan,
                                        'jumlah_gas': element.alokasi_penerimaan_gas,
                                        'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                        'jenis_alokasi': element.jenis_alokasi_pengambilan_gas,
                                    }
                                ]
                            });

                            this.divideDataDriver(tempList);
                        }
                    })
                    .catch((error) => {
                        this.divideDataDriver(tempList);
                        this.overlay = false;
                        console.log(error)
                    });
            },

            divideDataDriver(tempList)
            {
                var date = new Date().setHours(0,0,0,0);
                var temp = tempList;
                var index = 1;
                var color = '';
                var riwayat = [];
                var berjalan = [];

                temp.forEach(element => {
                    var tempDate = new Date(element.tanggal_kegiatan).setHours(0,0,0,0);
                    if(tempDate > date)
                    {
                        riwayat = [...riwayat, element];
                    }
                    else if(tempDate === date)
                    {
                        if(element.jenis_kegiatan === 'Pengambilan')
                        {
                            color = 'deep-purple lighten-1';
                        }
                        else
                        {
                            color = 'green';
                        }

                        var object = {
                            index: index,
                            color: color,
                            jumlah_gas: element.jumlah_gas,
                            jenis_alokasi: element.jenis_alokasi,
                            jenis_kegiatan: element.jenis_kegiatan,
                            lokasi_kegiatan: element.lokasi_kegiatan,
                            tanggal_kegiatan: element.tanggal_kegiatan,
                        };

                        berjalan = [...berjalan, object];
                    }
                });

                this.dataRiwayatDriver = riwayat.sort(this.sortDataByDate);
                this.daftarKegiatanDriver = berjalan.sort(this.sortDataByDate);

                this.dataRiwayatDriver.forEach(element => {
                    element.tanggal_kegiatan = new Date(element.tanggal_kegiatan).toLocaleString('id-ID', { day: "2-digit", month: 'long', year: "numeric" });
                });

                this.daftarKegiatanDriver.forEach(element => {
                    element.tanggal_kegiatan = new Date(element.tanggal_kegiatan).toLocaleString('id-ID', { day: "2-digit", month: 'long', year: "numeric" });
                });

                this.overlay = false;
            },

            //Method Admin
            getDataPengambilanAdmin()
            {
                var url = this.$api + "/jadwalPengambilanGas/postBySearchDataAdmin";
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };
                var date = new Date().setHours(0,0,0,0);
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var tempList = [];
                            var res = response.data.data;
                            res.forEach(element => {
                                this.pengambilanGasSisaAdmin = 1 + this.pengambilanGasSisaAdmin;

                                var tempDate = new Date(element.tanggal_pengambilan_gas).setHours(0,0,0,0);
                                if(tempDate === date)
                                {
                                    tempList = [
                                        ...tempList,
                                        {
                                            'jenis_kegiatan': 'Pengambilan',
                                            'lokasi_kegiatan': element.nama_sppbe,
                                            'jumlah_gas': element.alokasi_pengambilan_gas,
                                            'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                            'jenis_alokasi': element.jenis_alokasi_pengambilan_gas
                                        }
                                    ];
                                }
                            });

                            this.getDataPengirimanAdmin(tempList)
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },
            
            getDataPengirimanAdmin(tempList)
            {
                var url = this.$api + "/jadwalPengirimanGas/postBySearchDataAdmin";
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };
                var date = new Date().setHours(0,0,0,0);
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var res = response.data.data;
                            
                            res.forEach(element => {
                                this.pengirimanGasSisaAdmin = 1 + this.pengirimanGasSisaAdmin;

                                var tempDate = new Date(element.tanggal_pengambilan_gas).setHours(0,0,0,0);
                                if(tempDate === date)
                                {   
                                    if(element.jenis_alokasi_pengambilan_gas == 'Reguler')
                                    {
                                        tempList = [
                                            ...tempList,
                                            {
                                                'jenis_kegiatan': 'Pengiriman',
                                                'lokasi_kegiatan': element.nama_pangkalan,
                                                'jumlah_gas': element.alokasi_penerimaan_gas,
                                                'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                                'jenis_alokasi': element.jenis_alokasi_pengambilan_gas,
                                            }
                                        ]
                                    }
                                    else
                                    {
                                        tempList = [
                                            ...tempList,
                                            {
                                                'jenis_kegiatan': 'Pengiriman',
                                                'lokasi_kegiatan': element.nama_pangkalan,
                                                'jumlah_gas': element.alokasi_tambahan,
                                                'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                                'jenis_alokasi': element.jenis_alokasi_pengambilan_gas,
                                            }
                                        ]
                                    }
                                }
                            });

                            var temp = tempList.sort(this.sortDataByDate);
                            this.dataRiwayatAdmin = temp;

                            this.overlay = false;
                        }
                    })
                    .catch((error) => {
                        this.dataRiwayatAdmin = tempList;
                        this.overlay = false;
                        console.log(error)
                    });
            },

            //Method Pangkalan
            getDataStokPangkalan()
            {
                var url = this.$api + "/stokBulananPangkalan/postBySearchDataPangkalan";
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn, 'id_pangkalan': localStorage.getItem('id') };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var res = response.data.data;

                            this.stokAwalPangkalan = res.stok_awal_bulan_pangkalan;
                            this.stokAkhirPangkalan = res.stok_akhir_bulan_pangkalan;
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            getDataJadwalPangkalan()
            {
                var url = this.$api + "/jadwalRutinPangkalan/postBySearchDataPangkalan";
                var body = { 'id_pangkalan': localStorage.getItem('id') };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var tempList = [];
                            var res = response.data.data;

                            res.forEach(element => {
                                tempList = [...tempList, element];
                            });

                            this.jadwalSenin = tempList.filter((el) => el.hari_penerimaan_gas === 'Senin');
                            this.jadwalSelasa = tempList.filter((el) => el.hari_penerimaan_gas === 'Selasa');
                            this.jadwalRabu = tempList.filter((el) => el.hari_penerimaan_gas === 'Rabu');
                            this.jadwalKamis = tempList.filter((el) => el.hari_penerimaan_gas === 'Kamis');
                            this.jadwalJumat = tempList.filter((el) => el.hari_penerimaan_gas === 'Jumat');
                            this.jadwalSabtu = tempList.filter((el) => el.hari_penerimaan_gas === 'Sabtu');
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            getDataAlokasiPangkalan()
            {
                var url = this.$api + "/alokasiFakultatif/postBySearchDataPangkalan";
                var date = new Date();
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn, 'id_pangkalan': localStorage.getItem('id') };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var tempList = [];
                            var color = 'green';
                            var icon = 'mdi-bell-outline';
                            var res = response.data.data;

                            res.forEach(element => {
                                var tempDate = new Date(element.tanggal_pengajuan);
                                
                                if((tempDate.getDate() - date.getDate()) >= 0)
                                {
                                    if((tempDate.getDate() - date.getDate()) === 0)
                                    {
                                        color = 'red';
                                        icon = 'mdi-bell-alert-outline';
                                    }
                                    else if((tempDate.getDate() - date.getDate()) <= 5)
                                    {
                                        color = 'yellow';
                                        icon = 'mdi-bell-badge-outline';
                                    }
                                    else
                                    {
                                        color = 'green';
                                        icon = 'mdi-bell-outline';
                                    }

                                    tempList = [
                                        ...tempList,
                                        {
                                            icon: icon,
                                            color: color,
                                            subtitle: 'Terdapat Permintaan Penambahan Alokasi Fakultatif Sejumlah ' + element.alokasi_tambahan + ' Tabung Gas',
                                            title: 'Konfirmasi Alokasi Pada ' + new Date(element.tanggal_pengajuan).toLocaleString('id-ID', { day: "2-digit", month: 'long', year: "numeric" }),
                                        }
                                    ];

                                    tempList = [
                                        ...tempList,
                                        { divider: true, inset: true },
                                    ]
                                }
                            });

                            this.pangkalanItems = tempList;
                            
                            this.overlay = false;
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },
        },
        
        mounted() {
            this.getDateNow();
            this.getDataUser();
        },
    }
</script>