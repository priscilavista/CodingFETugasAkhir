<template>
    <v-simple-table fixed-header height="175px" class="mt-3">
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

            <tbody>
                <tr
                    v-for="item in items"
                    :key="item.nama_pegawai"
                >
                    <td class="text-left">{{ item.nama_pegawai }}</td>
                    <td class="text-right">{{ item.alokasi_penerimaan_gas }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
    export default {
        name: "JadwalTable",
        
        props: {
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