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

                            <v-list-item-subtitle style="font-size: 15px;">Terdapat Total {{ totalPembelian }} Pembelian Tabung Gas</v-list-item-subtitle>
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
                            
                            <v-list-item-subtitle style="font-size: 15px;">Terdapat Total {{ totalPengambilanGas }} Kali Pengambilan Gas</v-list-item-subtitle>
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
                            
                            <v-list-item-subtitle style="font-size: 15px;">Terdapat Total {{ totalPengirimanGas }} Kali Pengiriman Gas</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>

        <v-divider style="margin-top: 25px;" />

        <v-row style="margin-top: 10px;">
            <v-col
                cols="6"
                sm="6"
                md="6"
                lg="6"
            >
                <v-card height="510px">
                    <v-card-title class="indigo white--text">
                        <v-icon medium left style="vertical-align: middle; color: #fff;">mdi-chart-line</v-icon>
                        <span class="text-h6 font-weight-light">Kelangkaan Gas Bulanan</span>
                    </v-card-title>

                    <v-card-text class="mt-2">
                        <v-card color="#41B883" dark class="mt-3">
                            <v-list-item three-line>
                                <v-list-item-avatar size="50">
                                    <v-icon large>mdi-gas-station-off-outline</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title class="text-h6 mb-1">
                                        Total Kelangkaan Gas Bulan {{ monthNow }}
                                    </v-list-item-title>
                                    
                                    <v-list-item-subtitle style="font-size: 17px;">
                                        Terdapat Kelangkaan Gas Sebanyak {{ kelangkaanGasBulanan }} Tabung
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>

                        <div class="d-flex justify-center bg-surface-variant mt-3">
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
                            height="510px"
                            style="display: flex !important; flex-direction: column;"
                        >

                            <v-card-title class="indigo white--text">Riwayat Transaksi {{ monthNow }}</v-card-title>

                            <v-card-text style="flex-grow: 1; overflow: auto;" class="mt-3">
                                <template>
                                    <v-data-table 
                                        id="customStyleTable"
                                        :items-per-page="5"
                                        class="elevation-1"
                                        :headers="headers"
                                        :items="dataRiwayat"
                                        height="320px"
                                        fixed-header
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
                        <v-card height="510px">
                            <v-card-title class="text-h6 indigo white--text">
                                <v-icon medium left style="vertical-align: middle; color: #fff;">mdi-chart-donut</v-icon>
                                <span class="text-h6 font-weight-light">Persentase Kondisi Gas</span>
                            </v-card-title>

                            <v-card-text class="text--primary mt-1">
                                <div class="d-flex justify-center bg-surface-variant">
                                    <doughnut-chart />
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
                                                    {{ gasNormal }}
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
                                                    {{ gasBocor }}
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

            dataRiwayat: {
                type: Array,
                default: () => []
            },

            monthNow: {
                type: String,
                default: null
            },

            totalPembelian: {
                type: Number,
                default: 0
            },

            totalPengambilanGas: {
                type: Number,
                default: 0
            },

            totalPengirimanGas: {
                type: Number,
                default: 0
            },

            kelangkaanGasBulanan: {
                type: Number,
                default: 0
            },

            gasNormal: {
                type: Number,
                default: 0
            },

            gasBocor: {
                type: Number,
                default: 0
            }
        },
    }
</script>