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
                        :headers="headers" :desserts="desserts" 
                        :messages="messages" :monthNow="monthNow"
                    />
                </div>

                <div v-if="jabatan === 'Admin' && jabatan !== ''">
                    <dashboard-admin 
                        :avatar="avatar" :users="users" 
                        :headers="headers" :desserts="desserts" 
                        :items="items" :monthNow="monthNow"
                    />
                </div>
            </div>

            <div v-else>
                <dashboard-pangkalan 
                    :monthNow="monthNow" :items="pangkalanItems"
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
                headers: [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' },
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: 1,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: 1,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: 7,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: 8,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: 16,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: 0,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: 2,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: 45,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: 22,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: 6,
                    },
                ],
                messages: [
                    {
                        from: 'You',
                        message: `Sure, I'll see you later.`,
                        time: '10:42am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'John Doe',
                        message: 'Yeah, sure. Does 1:00pm work?',
                        time: '10:37am',
                        color: 'green',
                    },
                    {
                        from: 'You',
                        message: 'Did you still want to grab lunch today?',
                        time: '9:47am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'You',
                        message: `Sure, I'll see you later.`,
                        time: '10:42am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'John Doe',
                        message: 'Yeah, sure. Does 1:00pm work?',
                        time: '10:37am',
                        color: 'green',
                    },
                    {
                        from: 'You',
                        message: 'Did you still want to grab lunch today?',
                        time: '9:47am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'You',
                        message: `Sure, I'll see you later.`,
                        time: '10:42am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'John Doe',
                        message: 'Yeah, sure. Does 1:00pm work?',
                        time: '10:37am',
                        color: 'green',
                    },
                    {
                        from: 'You',
                        message: 'Did you still want to grab lunch today?',
                        time: '9:47am',
                        color: 'deep-purple lighten-1',
                    },
                ],

                // Admin Variable
                users: [],

                //Pangkalan Variable
                pangkalanItems: [
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        title: 'Brunch this weekend?',
                        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        title: 'Oui oui',
                        subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                        title: 'Birthday gift',
                        subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                        title: 'Recipe to try',
                        subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        title: 'Brunch this weekend?',
                        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        title: 'Oui oui',
                        subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                        title: 'Birthday gift',
                        subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                        title: 'Recipe to try',
                        subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                    },
                    { divider: true, inset: true },
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

                                if(res.role_pegawai === 'Manajer')
                                {
                                    this.getDataKelangkaanBulanan();
                                    this.getDataPengambilanTahunan();
                                    this.getDataPengirimanTahunan();
                                    this.getDataDetailGasBocor();
                                    this.getDataTotalTransaksiManajer();
                                    this.getDataRiwayatTransaksi();
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
                    this.overlay = false;
                }
            },

            //Method Manajer
            getDataKelangkaanBulanan() {
                var url = this.$api;
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };

                url = url + "/kelangkaanGas/postBySearchData";
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            var res = response.data.data;
                            this.kelangkaanGasBulanan = parseInt(res.jumlah_permintaan);
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            },

            getDataPengambilanTahunan() {
                var url = this.$api;
                var thn = new Date().getFullYear();
                var body = { 'tahun': thn };

                url = url + "/jadwalPengambilanGas/postBySearchData";
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            var res = response.data.data;
                            this.totalPengambilanGas = parseInt(res.jumlah_pengambilan);
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            },

            getDataPengirimanTahunan() {
                var url = this.$api;
                var thn = new Date().getFullYear();
                var body = { 'tahun': thn };

                url = url + "/jadwalPengirimanGas/postBySearchData";
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            var res = response.data.data;
                            this.totalPengirimanGas = parseInt(res.jumlah_pengiriman);
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            },

            getDataDetailGasBocor()
            {
                var url = this.$api + "/gasBocor/postBySearchData";
                var bulan = new Date().getMonth() + 1;
                var thn = new Date().getFullYear();
                var body = { 'bulan': bulan, 'tahun': thn };
                
                this.$http.post(url, body)
                .then((response) => {
                    if(response.data.code === 200)
                    {
                        var res = response.data.data;
                        var normal = parseInt(res.alokasi_reguler_pengambilan_gas) + parseInt(res.alokasi_fakultatif_pengambilan_gas) - parseInt(res.jumlah_gas_bocor);
                        var bocor = parseInt(res.jumlah_gas_bocor);

                        this.gasNormal = normal;
                        this.gasBocor = bocor;
                    }
                })
                .catch((error) => {
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
                        console.log(error)
                    });
            },

            getDataRiwayatTransaksi()
            {
                var url = this.$api + "/transaksi/postBySearchData";
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