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
                        :headers="headersManajer" :desserts="dessertsManajer"
                        :doughnutChartData="doughnutChartData" :lineChartData="lineChartData"
                        :monthNow="monthNow"
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
                <dashboard-pangkalan />
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
                lineChartData: {
                    labels: [
                        'Januari',
                        'Februari',
                        'Maret',
                        'April',
                        'Mei',
                        'Juni',
                        'Juli',
                        'Augustus',
                        'September',
                        'Oktober',
                        'November',
                        'Desember'
                    ],
                    datasets: [
                        {
                            label: 'Kelangkaan Gas Per Bulan',
                            backgroundColor: '#41B883',
                            data: [40, 39, 10, 40, 39, 80, 40, 100, 50, 70, 24, 88]
                        }
                    ]
                },
                doughnutChartData: {
                    labels: ['Bocor', 'Normal'],
                    datasets: [
                        {
                            backgroundColor: ['#ee534f', '#00D8FF'],
                            data: [40, 100],
                        }
                    ]
                },
                headersManajer: [
                    {
                        text: 'Tanggal',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Jumlah', value: 'calories' },
                ],
                dessertsManajer: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                    },
                ],

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
            }
        },

        methods: {
            getDateNow(){
                let month = new Date().toLocaleDateString("sv-se", { month: 'long' }).split('T')[0];
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
                                this.overlay = false;
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
        },
        
        mounted() {
            this.getDateNow();
            this.getDataUser();
        },
    }
</script>