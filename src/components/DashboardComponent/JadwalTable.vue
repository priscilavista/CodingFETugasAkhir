<template>
    <v-col
        cols="4"
        sm="4"
        md="4"
        lg="4"
    >
        <v-card height="260px">
            <v-card-subtitle :style="backgroundColor" class="white--text">
                <strong class="text-h6"><b>{{ dateName }}</b></strong>
            </v-card-subtitle>
            
            <v-card-text>
                <template>
                    <v-simple-table fixed-header :height="heights" class="mt-1">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th
                                        v-for="item in headers"
                                        :key="item.text"
                                        :class="item.align"
                                    >
                                        {{ item.text }}
                                    </th>
                                </tr>
                            </thead>

                            <tbody v-if="items.length > 0">
                                <tr
                                    v-for="item in items"
                                    :key="item.nama_pegawai"
                                >
                                    <td class="text-left">{{ item.nama_pegawai }}</td>
                                    <td class="text-right">{{ item.alokasi_penerimaan_gas }}</td>
                                </tr>
                            </tbody>

                            <tbody v-else>
                                <tr>
                                    <td colspan="2">
                                        <b>Tidak Ada Jadwal</b>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        name: "JadwalTable",
        
        props: {
            dateName: {
                type: String,
                default: ''
            },

            backgroundColor: {
                type: Object,
                default: () => {}
            },

            heights: {
                type: String,
                default: '0px'
            },

            headers: {
                type: Array,
                default: () => []
            },

            items: {
                type: Array,
                default: () => []
            },
        }
    }
</script>