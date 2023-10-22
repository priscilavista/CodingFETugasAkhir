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
        
        <div v-if="jabatan === 'Admin'">
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

                    <!-- <v-col
                        cols="3"
                        sm="3"
                        md="3"
                        lg="3"
                    >
                        <v-card color="#ee534f" dark>
                            <v-list-item three-line>
                                <v-list-item-avatar size="50">
                                    <v-icon>mdi-cash-multiple</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title class="text-h6 mb-1">
                                        Total Pengiriman Gas
                                    </v-list-item-title>
                                    
                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col> -->
                </v-row>

                <v-divider style="margin-top: 20px;" />

                <v-row style="margin-top: 10px;">
                    <v-col
                        cols="6"
                        sm="6"
                        md="6"
                        lg="6"
                    >
                        <v-card height="500px">
                            <v-card-title>Penjualan Gas Bulanan</v-card-title>

                            <v-card-subtitle>
                                <v-card>
                                    
                                </v-card>
                            </v-card-subtitle>

                            <v-card-text class="text--primary">
                                <div class="d-flex justify-center mb-6 bg-surface-variant">
                                    <line-chart />
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
                                        <div class="d-flex justify-center mb-6 bg-surface-variant">
                                            <doughnut-chart />
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                
                <v-overlay :value="overlay">
                    <v-progress-circular indeterminate size="64" />
                </v-overlay>
            </template>
        </div>
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

        components: {
            LineChart,
            DoughnutChart
        },

        data() {
            return {
                jabatan: localStorage.getItem("jabatan"),
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
            }
        }
    }
</script>