<template>
    <div>
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
                            <v-icon large>mdi-cart-variant</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="text-h6 mb-1">
                                Total Pembelian Tahunan
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
                <v-card height="500px">
                    <v-card-title>
                        <v-icon medium left style="vertical-align: middle;">mdi-chart-line</v-icon>
                        <span class="text-h6 font-weight-light">Kelangkaan Gas Bulanan</span>
                    </v-card-title>

                    <v-card-subtitle>
                        <v-card color="#41B883" dark class="mt-2">
                            <v-list-item three-line>
                                <v-list-item-avatar size="50">
                                    <v-icon large>mdi-gas-station-off-outline</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title class="text-h6 mb-1">
                                        Total Kelangkaan Gas Bulan - {{ monthNow }}
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
                            style="display: flex !important; flex-direction: column;"
                        >
                            <v-img
                                height="100"
                                src="https://cdn.ajnn.net/files/images/20220722-20220406-28052019-gas-elpiji-net.jpg"
                            />

                            <v-card-title>Riwayat Transaksi - {{ monthNow }}</v-card-title>

                            <v-card-text style="flex-grow: 1; overflow: auto;">
                                <template>
                                    <v-data-table 
                                        id="customStyleTable"
                                        :items-per-page="100"
                                        :headers="headers" 
                                        :items="desserts" 
                                        class="elevation-1"
                                        hide-default-footer
                                    />
                                </template>
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
                                <v-icon medium left style="vertical-align: middle;">mdi-chart-donut</v-icon>
                                <span class="text-h6 font-weight-light">Persentase Kondisi Gas</span>
                            </v-card-title>

                            <v-card-text class="text--primary">
                                <div class="d-flex justify-center bg-surface-variant">
                                    <doughnut-chart :chartData="doughnutChartData" />
                                </div>

                                <div style="margin-top: 40px;">
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
                                                <div style="color: #ee534f; font-size: 15px;">
                                                    Bocor
                                                </div>
                                            </v-col>
                                            
                                            <v-col
                                                cols="6"
                                                sm="6"
                                                md="6"
                                                lg="6"
                                            >
                                                <div style="color: #ee534f; font-size: 15px;">
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
    </div>
</template>

<script>
    import LineChart from '../Chart/LineChart.vue';
    import DoughnutChart from '../Chart/DoughnutChart.vue';

    export default {
        name: "DashboardManajer",
        
        components: { 
            LineChart, DoughnutChart, 
        },
        
        props: {
            headers: {
                type: Array,
                default: () => []
            },

            desserts: {
                type: Array,
                default: () => []
            },

            monthNow: {
                type: String,
                default: null
            },

            lineChartData: {
                type: Object,
                default: () => {}
            },

            doughnutChartData: {
                type: Object,
                default: () => {}
            }
        },
    }
</script>