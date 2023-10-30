<template>
    <v-row>
        <v-col
            cols="8"
            sm="8"
            md="8"
            lg="8"
        >
            <v-card style="display: flex !important; flex-direction: column;" height="650px">
                <v-card-title class="indigo white--text text-h5">
                    <v-icon medium left style="vertical-align: middle; color: #ffffff;">mdi-calendar-search</v-icon>
                    <span class="text-h6 font-weight-light">Jadwal Mingguan Pangkalan</span>
                </v-card-title>

                <v-card-text>
                    <template>
                        <v-row class="mt-3">
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card height="260px">
                                    <v-card-subtitle style="background-color: red;" class="white--text">Senin</v-card-subtitle>
                                    
                                    <v-card-text>
                                        <template>
                                            <jadwal-table :heights="'175px'" :headers="headers" :items="jadwalSenin" />
                                        </template>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card height="260px">
                                    <v-card-subtitle style="background-color: orange;" class="white--text">Selasa</v-card-subtitle>
                                    
                                    <v-card-text>
                                        <template>
                                            <jadwal-table :heights="'175px'" :headers="headers" :items="jadwalSelasa" />
                                        </template>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card height="260px">
                                    <v-card-subtitle style="background-color: green;" class="white--text">Rabu</v-card-subtitle>
                                    
                                    <v-card-text>
                                        <template>
                                            <jadwal-table :heights="'175px'" :headers="headers" :items="jadwalRabu" />
                                        </template>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        
                        <v-row class="mt-2">
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card height="260px">
                                    <v-card-subtitle style="background-color: #00AFFF;" class="white--text">Kamis</v-card-subtitle>
                                    
                                    <v-card-text>
                                        <template>
                                            <jadwal-table :heights="'175px'" :headers="headers" :items="jadwalKamis" />
                                        </template>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card height="260px">
                                    <v-card-subtitle style="background-color: #6f00ff;" class="white--text">Jumat</v-card-subtitle>
                                    
                                    <v-card-text>
                                        <template>
                                            <jadwal-table :heights="'175px'" :headers="headers" :items="jadwalJumat" />
                                        </template>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card height="260px">
                                    <v-card-subtitle style="background-color: purple;" class="white--text">Sabtu</v-card-subtitle>
                                    
                                    <v-card-text>
                                        <template>
                                            <jadwal-table :heights="'175px'" :headers="headers" :items="jadwalSabtu" />
                                        </template>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col
            cols="4"
            sm="4"
            md="4"
            lg="4"
        >
            <v-row>
                <v-col>
                    <v-card color="#673bb7" dark>
                        <v-list-item three-line>
                            <v-list-item-avatar size="50">
                                <v-icon large>mdi-store-plus-outline</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title class="text-h6 mb-1">
                                    Stok Awal Bulan {{ monthNow }}
                                </v-list-item-title>
                                
                                <v-list-item-subtitle style="font-size: 15px;">Stok Awal Pangkalan Sebanyak {{ stokAwal }} Tabung</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                    
                    <v-card color="#ee534f" dark class="mt-5">
                        <v-list-item three-line>
                            <v-list-item-avatar size="50">
                                <v-icon large>mdi-store-minus-outline</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title class="text-h6 mb-1">
                                    Stok Akhir Bulan {{ monthNow }}
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Sisa Stok Pangkalan Saat Ini Sebanyak {{ stokAkhir }} Tabung</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>

                    <v-card style="display: flex !important; flex-direction: column;" height="435px" class="mt-5">
                        <v-card-title class="indigo white--text text-h5">
                            <v-icon medium left style="vertical-align: middle; color: #ffffff;">mdi-check-decagram</v-icon>
                            <span class="text-h6 font-weight-light">Persetujuan Alokasi Fakultatif</span>
                        </v-card-title>

                        <v-card-text style="flex-grow: 1; overflow: auto;">
                            <v-list three-line>
                                <template v-for="(item, index) in items">
                                    <v-subheader
                                        v-if="item.header"
                                        :key="item.header"
                                    />

                                    <v-divider
                                        v-else-if="item.divider"
                                        :inset="item.inset"
                                        :key="index"
                                    />

                                    <v-list-item
                                        v-else
                                        :key="item.title"
                                    >
                                        <v-list-item-icon class="mt-5">
                                            <v-icon class="mt-2" large :color="item.color">
                                                {{ item.icon }}
                                            </v-icon>
                                        </v-list-item-icon>

                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <span v-html="item.title" />
                                            </v-list-item-title>
                                            
                                            <v-list-item-subtitle>
                                                <span v-html="item.subtitle" />
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                                </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import JadwalTable from './JadwalTable.vue'
    
    export default {
        name: "DashboardPangkalan",
        
        components: { JadwalTable },
        
        props: {
            monthNow: {
                type: String,
                default: null
            },

            stokAwal: {
                type: Number,
                default: 0
            },

            stokAkhir: {
                type: Number,
                default: 0
            },

            items: {
                type: Array,
                default: () => []
            },

            headers: {
                type: Array,
                default: () => []
            },

            jadwalSenin: {
                type: Array,
                default: () => []
            },

            jadwalSelasa: {
                type: Array,
                default: () => []
            },

            jadwalRabu: {
                type: Array,
                default: () => []
            },

            jadwalKamis: {
                type: Array,
                default: () => []
            },

            jadwalJumat: {
                type: Array,
                default: () => []
            },

            jadwalSabtu: {
                type: Array,
                default: () => []
            }
        }
    }
</script>
