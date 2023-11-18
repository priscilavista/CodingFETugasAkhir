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
                        :avatar="avatar" :users="users" 
                        :headers="headersAdmin" :dataRiwayat="dataRiwayatAdmin" 
                        :items="items" :monthNow="monthNow"
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
                jabatan: "",
                role: localStorage.getItem("role"),
                snackbar: false,
                error_message: "",
                color: "",
                overlay: false,
                isWideScreen: window.innerWidth >= 1000,
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                breadCrumbItems: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                ],
                monthNow: "",

                // Manager Variable
                totalPembelian: 0,
                totalPengambilanGas: 0,
                totalPengirimanGas: 0,
                kelangkaanGasBulanan: 0,
                gasNormal: 0,
                gasBocor: 0,
                headersManajer: [
                    { text: 'Tanggal', align: 'start', value: 'tanggal_transaksi' },
                    { text: 'Jumlah', value: 'jumlah_pembelian' },
                ],
                dataRiwayatManager: [],

                //Driver Variable
                pengambilanGasSelesaiDriver: 0,
                pengambilanGasSisaDriver: 0,
                pengirimanGasSelesaiDriver: 0,
                pengirimanGasSisaDriver: 0,
                headersDriver: [
                    { text: 'Jenis Kegiatan', align: 'start', value: 'jenis_kegiatan' },
                    { text: 'Tanggal Pelaksanaan Kegiatan', align: 'center', value: 'tanggal_kegiatan' },
                    { text: 'Jenis Alokasi', align: 'start', value: 'jenis_alokasi' },
                    { text: 'Jumlah Tabung Gas', align: 'end', value: 'jumlah_gas' },
                ],
                dataRiwayatDriver: [],
                daftarKegiatanDriver: [],

                // Admin Variable
                pengambilanGasSisaAdmin: 0,
                pengirimanGasSisaAdmin: 0,
                users: [],
                headersAdmin: [
                    { text: 'Jenis Kegiatan', align: 'start', value: 'jenis_kegiatan' },
                    { text: 'Tanggal Kegiatan', align: 'center', value: 'tanggal_kegiatan' },
                    { text: 'Jenis Alokasi', align: 'start', value: 'jenis_alokasi' },
                    { text: 'Jumlah Tabung Gas', align: 'end', value: 'jumlah_gas' },
                ],
                dataRiwayatAdmin: [],

                //Pangkalan Variable
                stokAwalPangkalan: 0,
                stokAkhirPangkalan: 0,
                pangkalanItems: [],
                headersPangkalan: [
                    { text: 'Nama Driver', align: 'text-left' }, 
                    { text: 'Jumlah Alokasi', align: 'text-right' }
                ],
                jadwalSenin: [],
                jadwalSelasa: [],
                jadwalRabu: [],
                jadwalKamis: [],
                jadwalJumat: [],
                jadwalSabtu: [],
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
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };

                url = url + "/kelangkaanGas/postBySearchDataManajer";
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            var res = response.data.data;
                            this.kelangkaanGasBulanan = parseInt(res.jumlah_permintaan);
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            getDataPengambilanTahunan() {
                var url = this.$api;
                var thn = new Date().getFullYear();
                var body = { 'tahun': thn };

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
                var thn = new Date().getFullYear();
                var body = { 'tahun': thn };

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
                            var normal = parseInt(res.total_alokasi_pengambilan_gas) - parseInt(res.jumlah_gas_bocor);
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
                var url = this.$api;

                url = url + "/transaksi/getAll";
                this.$http.get(url)
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
                                        'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                        'jumlah_gas': element.alokasi_pengambilan_gas,
                                        'jenis_alokasi': element.jenis_alokasi_pengambilan_gas
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
                                
                                if(element.id_jadwal_pengiriman_gas)
                                {
                                    tempList = [
                                        ...tempList,
                                        {
                                            'jenis_kegiatan': 'Pengiriman',
                                            'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                            'jumlah_gas': element.alokasi_pengambilan_gas,
                                            'jenis_alokasi': 'Reguler'
                                        }
                                    ]
                                }
                                else
                                {
                                    tempList = [
                                        ...tempList,
                                        {
                                            'jenis_kegiatan': 'Pengiriman',
                                            'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                            'jumlah_gas': element.alokasi_tambahan,
                                            'jenis_alokasi': 'Fakultatif'
                                        }
                                    ]
                                }
                            });

                            this.divideDataDriver(tempList);
                        }
                    })
                    .catch((error) => {
                        this.overlay = false;
                        console.log(error)
                    });
            },

            divideDataDriver(tempList)
            {
                var date = new Date();
                var temp = tempList;
                var index = 1;
                var color = '';
                var riwayat = [];
                var berjalan = [];

                temp.forEach(element => {
                    var tempDate = new Date(element.tanggal_kegiatan);
                    if(tempDate <= date)
                    {
                        riwayat = [...riwayat, element];
                    }
                    else
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
                            jenis_alokasi: element.jenis_alokasi_pengambilan_gas,
                            jumlah_gas: element.jumlah_gas,
                            tanggal_kegiatan: element.tanggal_kegiatan,
                            jenis_kegiatan: element.jenis_kegiatan,
                            color: color
                        };

                        berjalan = [...berjalan, object];
                    }
                });

                this.dataRiwayatDriver = riwayat.sort(this.sortDataByDate);
                this.daftarKegiatanDriver = berjalan.sort(this.sortDataByDate);

                this.overlay = false;
            },

            //Method Admin
            getDataPengambilanAdmin()
            {
                var url = this.$api + "/jadwalPengambilanGas/postBySearchDataAdmin";
                var date = new Date();
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var tempList = [];
                            var res = response.data.data;
                            
                            res.forEach(element => {
                                var tempDate = new Date(element.tanggal_pengambilan_gas);
                                if(tempDate > date)
                                {
                                    this.pengambilanGasSisaAdmin = 1 + this.pengambilanGasSisaAdmin;
                                }

                                if(tempDate < date)
                                {
                                    tempList = [
                                        ...tempList,
                                        {
                                            'jenis_kegiatan': 'Pengambilan',
                                            'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                            'jumlah_gas': element.alokasi_pengambilan_gas,
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
                var date = new Date();
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };
                
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            var res = response.data.data;
                            
                            res.forEach(element => {
                                var tempDate = new Date(element.tanggal_pengambilan_gas);
                                if(tempDate > date)
                                {
                                    this.pengirimanGasSisaAdmin = 1 + this.pengirimanGasSisaAdmin;
                                }

                                if(tempDate < date)
                                {
                                    if(element.id_jadwal_pengiriman_gas)
                                    {
                                        tempList = [
                                            ...tempList,
                                            {
                                                'jenis_kegiatan': 'Pengiriman',
                                                'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                                'jumlah_gas': element.alokasi_pengambilan_gas,
                                                'jenis_alokasi': 'Reguler'
                                            }
                                        ]
                                    }
                                    else
                                    {
                                        tempList = [
                                            ...tempList,
                                            {
                                                'jenis_kegiatan': 'Pengiriman',
                                                'tanggal_kegiatan': element.tanggal_pengambilan_gas,
                                                'jumlah_gas': element.alokasi_tambahan,
                                                'jenis_alokasi': 'Fakultatif'
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

                                if(tempDate >= date.getDate() + 1)
                                {
                                    color = 'red';
                                    icon = 'mdi-bell-alert-outline';
                                }
                                else if(tempDate >= date.getDate() + 3)
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
                                        title: 'Konfirmasi Alokasi Pada ' + element.tanggal_pengajuan,
                                        subtitle: 'Terdapat Permintaan Penambahan Alokasi Fakultatif Sejumlah ' + element.alokasi_tambahan + ' Tabung Gas',
                                    }
                                ];

                                tempList = [
                                    ...tempList,
                                    { divider: true, inset: true },
                                ]
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