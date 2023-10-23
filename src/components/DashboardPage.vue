<template>
    <v-main class="list" style="margin: auto">
        <v-breadcrumbs
            :items="items"
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
                <div v-if="jabatan !== 'Driver'">
                    <template>
                        <v-row>
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card color="#1d88e6" dark>
                                    <v-list-item three-line>
                                        <v-list-item-avatar size="50">
                                            <v-icon large>mdi-cash-multiple</v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-h6 mb-1">
                                                Penghasilan Tahunan
                                            </v-list-item-title>

                                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>

                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card color="#02d79d" dark>
                                    <v-list-item three-line>
                                        <v-list-item-avatar size="50">
                                            <v-icon style="transform: rotateY(180deg);" large>mdi-truck-delivery</v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-h6 mb-1">
                                                Total Pengambilan Gas
                                            </v-list-item-title>
                                            
                                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card color="#673bb7" dark>
                                    <v-list-item three-line>
                                        <v-list-item-avatar size="50">
                                            <v-icon large>mdi-truck-delivery</v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-h6 mb-1">
                                                Total Pengiriman Gas
                                            </v-list-item-title>
                                            
                                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-divider style="margin-top: 20px;" />

                        <v-row style="margin-top: 10px;">
                            <v-col
                                cols="6"
                                sm="6"
                                md="6"
                                lg="6"
                            >
                                <v-card height="502.5px">
                                    <v-card-title>Penjualan Gas Bulanan</v-card-title>

                                    <v-card-subtitle>
                                        <v-card color="#ee534f" dark class="mt-2">
                                            <v-list-item three-line>
                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-cash</v-icon>
                                                </v-list-item-avatar>

                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Total Pendapatan Bulan - {{ monthNow }}
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-card>
                                    </v-card-subtitle>

                                    <v-card-text class="mt-2">
                                        <div class="d-flex justify-center bg-surface-variant">
                                            <line-chart :chartData="lineChartData" />
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col
                                cols="6"
                                sm="6"
                                md="6"
                                lg="6"
                            >
                                <v-row>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card
                                            class="mx-auto" 
                                            height="500px"
                                        >
                                            <v-img
                                                height="210"
                                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                            />

                                            <v-card-title>Cafe Badilico</v-card-title>

                                            <v-card-text>
                                                <v-row
                                                    align="center"
                                                    class="mx-0"
                                                >
                                                    <v-rating
                                                        :value="4.5"
                                                        color="amber"
                                                        dense
                                                        half-increments
                                                        readonly
                                                        size="14"
                                                    />

                                                    <div class="grey--text ms-4">
                                                        4.5 (413)
                                                    </div>
                                                </v-row>

                                                <div class="my-4 text-subtitle-1">
                                                    $ • Italian, Cafe
                                                </div>

                                                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card height="500px">
                                            <v-card-title class="text-h6">
                                                Persentase Kondisi Gas
                                            </v-card-title>

                                            <v-card-text class="text--primary">
                                                <div class="d-flex justify-center bg-surface-variant">
                                                    <doughnut-chart :chartData="doughnutChartData" />
                                                </div>

                                                <div style="margin-top: 37.5px;">
                                                    <div>
                                                        <v-row>
                                                            <v-col
                                                                cols="6"
                                                                sm="6"
                                                                md="6"
                                                                lg="6"
                                                            >
                                                                <div style="color: #62d5fb; font-size: 15px;">
                                                                    Normal
                                                                </div>
                                                            </v-col>
                                                            
                                                            <v-col
                                                                cols="6"
                                                                sm="6"
                                                                md="6"
                                                                lg="6"
                                                            >
                                                                <div style="color: #62d5fb; font-size: 15px;">
                                                                    100
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>

                                                    <v-divider class="mt-2" />

                                                    <div class="mt-2">
                                                        <v-row>
                                                            <v-col
                                                                cols="6"
                                                                sm="6"
                                                                md="6"
                                                                lg="6"
                                                            >
                                                                <div style="color: #64b687; font-size: 15px;">
                                                                    Bocor
                                                                </div>
                                                            </v-col>
                                                            
                                                            <v-col
                                                                cols="6"
                                                                sm="6"
                                                                md="6"
                                                                lg="6"
                                                            >
                                                                <div style="color: #64b687; font-size: 15px;">
                                                                    40
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </template>
                </div>

                <div v-else>
                    <template>
                        <v-row>
                            <v-col
                                cols="8"
                                sm="8"
                                md="8"
                                lg="8"
                            >
                                <v-row>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card color="#1d88e6" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Total Pengiriman Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>

                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-truck-delivery</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>
                                    </v-col>

                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card color="#02d79d" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Total Pengambilan Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                                
                                                <v-list-item-avatar size="50">
                                                    <v-icon style="transform: rotateY(180deg);" large>mdi-truck-delivery</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card color="#673bb7" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Pengiriman Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                                
                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-truck-delivery</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>
                                    </v-col>

                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card color="#ee534f" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Pengambilan Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                                
                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-truck-delivery</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                        lg="12"
                                    >
                                        <v-card height="415px" style="display: flex !important; flex-direction: column;">
                                            <v-card-title class="mb-1">Riwayat Kegiatan Bulan {{ monthNow }}</v-card-title>
                                            <v-card-subtitle style="flex-grow: 1; overflow: auto;">
                                                <template>
                                                    <v-data-table 
                                                        id="customStyleTable" 
                                                        :items-per-page="5"
                                                        :headers="headers" 
                                                        :items="desserts" 
                                                        class="elevation-1"
                                                    >
                                                        <template v-slot:items="props">
                                                            <td>{{ props.item.name }}</td>
                                                            <td class="text-xs-right">{{ props.item.calories }}</td>
                                                            <td class="text-xs-right">{{ props.item.fat }}</td>
                                                            <td class="text-xs-right">{{ props.item.carbs }}</td>
                                                            <td class="text-xs-right">{{ props.item.protein }}</td>
                                                            <td class="text-xs-right">{{ props.item.iron }}</td>
                                                        </template>
                                                    </v-data-table>
                                                </template>
                                            </v-card-subtitle>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                        lg="12"
                                    >
                                        <v-card height="650px" style="display: flex !important; flex-direction: column;">
                                            <v-card-title>
                                                <v-icon medium left style="vertical-align: middle;">mdi-checkbox-marked-circle-auto-outline</v-icon>
                                                <span class="text-h6 font-weight-light">Daftar Kegiatan Bulan {{ monthNow }}</span>
                                            </v-card-title>

                                            <v-card-text style="flex-grow: 1; overflow: auto;">
                                                <v-timeline dense>
                                                    <v-timeline-item
                                                        v-for="message in messages"
                                                        :key="message.time"
                                                        :color="message.color"
                                                        small
                                                    >
                                                        <div>
                                                            <div class="font-weight-normal"><strong>{{ message.from }}</strong> @{{ message.time }}</div>
                                                            <div>{{ message.message }}</div>
                                                        </div>
                                                    </v-timeline-item>
                                                </v-timeline>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </template>
                </div>
            </div>

            <div v-else>

            </div>
                        
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64" />
            </v-overlay>
        </div>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
    import DoughnutChart from './Chart/DoughnutChart.vue';
    import LineChart from './Chart/LineChart.vue';

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

        components: { LineChart, DoughnutChart },

        data() {
            return {
                jabatan: localStorage.getItem("jabatan"),
                role: localStorage.getItem("role"),
                snackbar: false,
                error_message: "",
                color: "",
                overlay: false,
                isWideScreen: window.innerWidth >= 1000,
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                ],

                // Admin & Manager Variable
                monthNow: "",
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
                            label: 'Transaksi Per Bulan',
                            backgroundColor: '#ee534f',
                            data: [40, 39, 10, 40, 39, 80, 40, 100, 50, 70, 24, 88]
                        }
                    ]
                },
                doughnutChartData: {
                    labels: ['Bocor', 'Normal'],
                    datasets: [
                        {
                            backgroundColor: ['#41B883', '#00D8FF'],
                            data: [40, 100],
                        }
                    ]
                },

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
            }
        },

        methods: {
            getDateNow(){
                this.overlay = true;
                let month = new Date().toLocaleDateString("sv-se", { month: 'long' }).split('T')[0];
                this.monthNow = month[0].toUpperCase() + month.slice(1);
                setTimeout(() => this.overlay = false, 750);   
            }
        },
        
        mounted() {
            this.getDateNow();
        },
    }
</script>