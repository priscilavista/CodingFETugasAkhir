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
                    <v-card color="#02d79d" dark>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-list-item-title class="text-h6 mb-1">
                                    Total Pengambilan Gas Hari Ini
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Jumlah Pengambilan Gas Sebanyak {{ pengambilanGasSelesai }} Kali</v-list-item-subtitle>
                            </v-list-item-content>
                            
                            <v-list-item-avatar size="50">
                                <v-icon style="transform: rotateY(180deg);" large>mdi-truck-delivery</v-icon>
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
                    <v-card color="#1d88e6" dark>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-list-item-title class="text-h6 mb-1">
                                    Total Pengiriman Gas Hari Ini
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Jumlah Pengiriman Gas Sebanyak {{ pengirimanGasSelesai }} Kali</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar size="50">
                                <v-icon large>mdi-truck-delivery</v-icon>
                            </v-list-item-avatar>
                        </v-list-item>
                    </v-card>
                </v-col>
            </v-row>

            <!-- <v-row>
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
                                    Sisa Pengiriman Gas Bulanan
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Sisa Pengiriman Gas Sebanyak {{ pengirimanGasSisa }} Kali</v-list-item-subtitle>
                            </v-list-item-content>
                            
                            <v-list-item-avatar size="50">
                                <v-icon large>mdi-receipt-clock-outline</v-icon>
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
                                    Sisa Pengambilan Gas Bulanan
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Sisa Pengambilan Gas Sebanyak {{ pengambilanGasSisa }} Kali</v-list-item-subtitle>
                            </v-list-item-content>
                            
                            <v-list-item-avatar size="50">
                                <v-icon large>mdi-receipt-text-clock-outline</v-icon>
                            </v-list-item-avatar>
                        </v-list-item>
                    </v-card>
                </v-col>
            </v-row> -->

            <v-row>
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    lg="12"
                >
                    <v-card height="540px" style="display: flex !important; flex-direction: column;">
                        <v-card-title class="indigo white--text">
                            <v-icon medium left style="vertical-align: middle; color: #ffffff;">mdi-history</v-icon>
                            <span class="text-h6 font-weight-light">Daftar Kegiatan yang Akan Datang - {{ monthNow }}</span>
                        </v-card-title>
                        <v-card-text style="flex-grow: 1; overflow: auto;" class="mt-4">
                            <template>
                                <v-data-table
                                    id="customStyleTable"
                                    class="elevation-1"
                                    :items-per-page="5"
                                    :headers="headers" 
                                    :items="dataRiwayat"
                                    height="385px"
                                    fixed-header
                                />
                            </template>
                        </v-card-text>
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
                        <v-card-title class="indigo white--text">
                            <v-icon medium left style="vertical-align: middle; color: #ffffff;">mdi-checkbox-marked-circle-auto-outline</v-icon>
                            <span class="text-h6 font-weight-light">Daftar Kegiatan Hari Ini</span>
                        </v-card-title>

                        <v-card-text style="flex-grow: 1; overflow: auto;" class="text-center">
                            <div v-if="daftarKegiatanDriver.length > 0">
                                <v-timeline dense>
                                    <v-timeline-item
                                        v-for="data in daftarKegiatanDriver"
                                        :key="data.index"
                                        :color="data.color"
                                        small
                                    >
                                        <div>
                                            <div class="font-weight-normal">
                                                <strong>{{ data.jenis_kegiatan }}</strong> Ke <span v-if="data.jenis_kegiatan === 'Pengambilan'">SPPBE</span> <span v-else>Pangkalan</span> {{ data.lokasi_kegiatan }} Pada Tanggal {{ data.tanggal_kegiatan }}
                                            </div>
                                            <div>Alokasi {{ data.jenis_alokasi }} Sejumlah {{ data.jumlah_gas }} Tabung Gas</div>
                                        </div>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>

                            <v-row v-else align="center" justify="center" style="height: 570px;" class="mt-2">
                                <v-img 
                                    contain
                                    width="65%"
                                    height="65%"
                                    :src="image"
                                />
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "DashboardDriver",
        
        props: {
            headers: {
                type: Array,
                default: () => []
            },

            dataRiwayat: {
                type: Array,
                default: () => []
            },

            daftarKegiatanDriver: {
                type: Array,
                default: () => {}
            },

            monthNow: {
                type: String,
                default: null
            },

            pengambilanGasSelesai: {
                type: Number,
                default: 0
            },

            pengambilanGasSisa: {
                type: Number,
                default: 0
            },

            pengirimanGasSelesai: {
                type: Number,
                default: 0
            },

            pengirimanGasSisa: {
                type: Number,
                default: 0
            }
        },

        
        data(){
            return{
                image: require("@/assets/well-done.png"),
            }
        }
    }
</script>