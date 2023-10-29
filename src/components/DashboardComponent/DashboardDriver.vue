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
                                    Sisa Pengiriman Gas
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                            </v-list-item-content>
                            
                            <v-list-item-avatar size="50">
                                <v-icon large>mdi-receipt-clock</v-icon>
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
                                    Sisa Pengambilan Gas
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                            </v-list-item-content>
                            
                            <v-list-item-avatar size="50">
                                <v-icon large>mdi-receipt-text-clock</v-icon>
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
                    <v-card height="426px" style="display: flex !important; flex-direction: column;">
                        <v-card-title class="indigo white--text">
                            <v-icon medium left style="vertical-align: middle; color: #ffffff;">mdi-history</v-icon>
                            <span class="text-h6 font-weight-light">Riwayat Kegiatan Bulan {{ monthNow }}</span>
                        </v-card-title>
                        <v-card-text style="flex-grow: 1; overflow: auto;" class="mt-3">
                            <template>
                                <v-data-table
                                    id="customStyleTable"
                                    class="elevation-1"
                                    :items-per-page="5"
                                    :headers="headers" 
                                    :items="desserts"
                                    height="275px"
                                    fixed-header
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

<script>
    export default {
        name: "DashboardDriver",
        
        props: {
            headers: {
                type: Array,
                default: () => []
            },

            desserts: {
                type: Array,
                default: () => []
            },

            messages: {
                type: Array,
                default: () => {}
            },

            monthNow: {
                type: String,
                default: null
            }
        },
    }
</script>