<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px"
        />

        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Kalender Jadwal Penerimaan Gas</h3>
        </div>

        <div v-else-if="isMediumScreen" style="margin-bottom: 10.5%">
            <h3 style="float:left">Kalender Jadwal Penerimaan Gas</h3>
        </div>

        <div v-else style="margin-bottom: 8.5%">
            <h3 style="float:left">Kalender Jadwal Penerimaan Gas</h3>
        </div>

        <div>
            <v-app>
                <v-row>
                    <v-col>
                        <div>
                            <v-row>
                                <v-col
                                    sm="4"
                                    md="4"
                                    lg="4"
                                    cols="4"
                                >
                                    <v-btn
                                        icon
                                        @click="$refs.calendar.prev()"
                                    >
                                        <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>
                                </v-col>

                                <v-col
                                    sm="4"
                                    md="4"
                                    lg="4"
                                    cols="4"
                                >
                                    <v-toolbar-title v-if="$refs.calendar">
                                        {{ $refs.calendar.title }}
                                    </v-toolbar-title>
                                </v-col>

                                <v-col
                                    sm="4"
                                    md="4"
                                    lg="4"
                                    cols="4"
                                >
                                    <v-btn
                                        icon
                                        @click="$refs.calendar.next()"
                                    >
                                        <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </div>

                        <div class="mt-5">
                            <v-sheet height="600">
                                <v-calendar
                                    ref="calendar"
                                    v-model="start"
                                    :type="type"
                                    color="#E0E0E0"
                                >
                                    <template v-slot:day="{ date }">
                                        <template v-for="event in eventsMap[date]">
                                            <v-menu
                                                :key="event.total_alokasi_penerimaan_gas"
                                                v-model="event.open"
                                                offset-x
                                                min-width="300px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <div
                                                        style="width: 92.5%; text-align:left; padding-left:5px"
                                                        v-if="!event.time"
                                                        v-ripple
                                                        class="my-event"
                                                        v-on="on"
                                                        v-html="event.total_alokasi_penerimaan_gas + ' Tabung (' +event.jenis_alokasi + ')'"
                                                        @click="lihatDetail(event)"
                                                    />
                                                </template>
                                            </v-menu>
                                        </template>
                                    </template>
                                </v-calendar>
                            </v-sheet>
                        </div>
                    </v-col>
                </v-row>
            </v-app>
        </div>
        
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card height="30%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                    <h3 style="font-size:20px; color:#ffffff">Detail Penerimaan</h3>
                    <v-spacer />
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" @click="dialog = false" style="font-size: 28px" link color="error">mdi-close</v-icon>
                        </template>
                        <span>Tutup</span>
                    </v-tooltip>
                </v-card-title>
            </v-card>

            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 2.5%">
                <v-container fluid>
                    <v-data-iterator
                        :items="jadwalPerTanggal"
                        :items-per-page.sync="itemsPerPage"
                        :page.sync="page"
                        hide-default-footer
                    >
                        <template v-slot:default="props">
                            <v-row>
                                <v-col
                                    v-for="item in props.items"
                                    :key="item.no"
                                    cols="12"
                                    sm="6"
                                    md="6"
                                    lg="6"
                                >
                                    <v-card>
                                        <v-card-title style="width:150px" class="subheading font-weight-bold">
                                            {{ item.nama_driver }} 
                                        </v-card-title>

                                        <v-divider />

                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>Tanggal:</v-list-item-content>
                                                <v-list-item-content style="text-align: left; margin-left: -5px">
                                                    {{ item.tanggal_pengambilan_gas }}
                                                </v-list-item-content>
                                            </v-list-item>

                                            <v-list-item>
                                                <v-list-item-content>Jenis:</v-list-item-content>
                                                <v-list-item-content style="text-align: left">
                                                    {{ item.jenis_alokasi }}
                                                </v-list-item-content>
                                            </v-list-item>

                                            <v-list-item>
                                                <v-list-item-content>Alokasi:</v-list-item-content>
                                                <v-list-item-content style="text-align: left">
                                                    {{ item.total_alokasi_penerimaan_gas }} Tabung
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </template>

                        <template v-slot:footer>
                            <v-row
                                class="mt-3"
                                align="center"
                                justify="center"
                            >
                                <span style="font-size:15px; margin-left:15px" class="grey--text">Data per halaman</span>
                                <span style="color:#1565C0; margin-left:12.5px; font-size:15px">{{ itemsPerPage }}</span>
                                
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            dark
                                            icon
                                            color="blue darken-3"
                                            v-bind="attrs"
                                            v-on="on"
                                            small
                                        >
                                            <v-icon>mdi-chevron-down</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item
                                            v-for="(number, index) in itemsPerPageArray"
                                            :key="index"
                                            @click="updateItemsPerPage(number)"
                                        >
                                            <v-list-item-title>{{ number }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>

                                <v-spacer />

                                <span
                                    class="mr-1
                                    grey--text"
                                    style="font-size:15px"
                                >
                                    Halaman {{ page }} dari {{ numberOfPages }}
                                </span>
                                
                                <v-btn
                                    dark
                                    icon
                                    color="blue darken-3"
                                    @click="formerPage"
                                    style="margin-right:10px"
                                    small
                                >
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>

                                <v-btn
                                    dark
                                    icon
                                    color="blue darken-3"
                                    style="margin-right:10px"
                                    @click="nextPage"
                                    small
                                >
                                    <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-row>
                        </template>
                    </v-data-iterator>
                </v-container>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

        <v-overlay :value="overlay" class="align-center justify-center" style="zIndex: 100000">
            <v-progress-circular indeterminate size="64" />
        </v-overlay>
    </v-main>
</template>

<script>
    export default {
        name: "KalenderJadwalPenerimaanGasPage",

        watch: {
            $route: {
                immediate: true,

                handler() {
                    document.title = "Kalender Jadwal Penerimaan Gas";
                },
            },
        },

        data() {
            return {
                page: 1,
                color: "",
                events: [],
                type: 'month',
                dialog: false,
                fullEvents: [],
                overlay: false,
                snackbar: false,
                itemsPerPage: 2,
                error_message: "",
                jadwalPerTanggal: [],
                itemsPerPageArray: [2, 4, 8, 12],
                isWideScreen: window.innerWidth >= 1000,
                start: new Date().toISOString().slice(0, 10),
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                    { 
                        text: "Jadwal Penerimaan Gas",
                        disabled: true,
                        href: '/kalender-jadwal-penerimaan-gas-page',
                    },
                ],
            }
        },
        computed: {
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {}
                this.events.forEach(e => (map[e.tanggal_pengambilan_gas] = map[e.tanggal_pengambilan_gas] || []).push(e))
                return map
            },

            numberOfPages () {
                return Math.ceil(this.jadwalPerTanggal.length / this.itemsPerPage)
            },
        },

        methods: {
            open (event) {
                alert(event.title)
            },

            nextPage () {
                if (this.page + 1 <= this.numberOfPages) 
                {
                    this.page += 1;
                }
            },

            formerPage () {
                if (this.page - 1 >= 1) 
                {
                    this.page -= 1;
                }
            },

            updateItemsPerPage (number) {
                this.itemsPerPage = number
            },

            readEvent() {
                this.overlay = true;

                var url = this.$api + "/jadwalPengirimanGas/getByPangkalan/" + localStorage.getItem('id');
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            let temp = response.data.data;

                            for (let i = 0; i < temp.length; i++) 
                            {
                                if(i == 0 || this.searchDateJadwal(temp[i].tanggal_pengambilan_gas, temp[i].jenis_alokasi_pengambilan_gas) == null)
                                {
                                    this.events.push(
                                        {
                                            id_driver: temp[i].id_pegawai,
                                            nama_driver: temp[i].nama_pegawai,
                                            tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                            total_alokasi_penerimaan_gas: parseInt(temp[i].alokasi_penerimaan_gas),
                                            jenis_alokasi: temp[i].jenis_alokasi_pengambilan_gas,
                                        }
                                    );
                                }
                                else
                                {
                                    this.events[this.searchDateJadwal(temp[i].tanggal_pengambilan_gas, temp[i].jenis_alokasi_pengambilan_gas)].total_alokasi_penerimaan_gas = this.events[this.searchDateJadwal(temp[i].tanggal_pengambilan_gas, temp[i].jenis_alokasi_pengambilan_gas)].total_alokasi_penerimaan_gas + parseInt(temp[i].alokasi_penerimaan_gas);
                                }

                                this.fullEvents.push(
                                    {
                                        id_driver: temp[i].id_pegawai,
                                        nama_driver: temp[i].nama_pegawai,
                                        tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                        total_alokasi_penerimaan_gas: parseInt(temp[i].alokasi_penerimaan_gas),
                                        jenis_alokasi: temp[i].jenis_alokasi_pengambilan_gas,
                                    }
                                )
                            }

                            this.overlay = false;
                            this.color = "green";
                            this.snackbar = true;
                            this.error_message = response.data.message;
                        }
                        else
                        {
                            this.color = "red";
                            this.snackbar = true;
                            this.overlay = false;
                            this.error_message = response.data.message;
                        }
                    })
                    .catch((error) => {
                        this.color = "red";
                        this.snackbar = true;
                        this.overlay = false;
                        this.error_message = error.response.data.message;
                    });
            },

            searchDateJadwal(date, jenis) {
                for (let i = 0; i < this.events.length; i++)
                {
                    if(this.events[i].tanggal_pengambilan_gas === date && this.events[i].jenis_alokasi === jenis)
                    {
                        return i;
                    }
                }

                return null;
            },

            readJadwalRegulerPerTanggal(date) 
            {
                for (let i = 0; i < this.fullEvents.length; i++) 
                {
                    if(this.fullEvents[i].tanggal_pengambilan_gas === date && this.fullEvents[i].jenis_alokasi === 'Reguler')
                    {
                        this.jadwalPerTanggal.push(this.fullEvents[i]);
                    }
                }
            },

            readJadwalFakultatifPerTanggal(date) 
            {
                for (let i = 0; i < this.fullEvents.length; i++) 
                {
                    if(this.fullEvents[i].tanggal_pengambilan_gas === date && this.fullEvents[i].jenis_alokasi === 'Fakultatif')
                    {
                        this.jadwalPerTanggal.push(this.fullEvents[i]);
                    }
                }
            },

            lihatDetail(event)
            {
                this.jadwalPerTanggal = [];
                if(event.jenis_alokasi == 'Reguler')
                {
                    this.readJadwalRegulerPerTanggal(event.tanggal_pengambilan_gas);
                }
                else if(event.jenis_alokasi == 'Fakultatif')
                {
                    this.readJadwalFakultatifPerTanggal(event.tanggal_pengambilan_gas);
                }

                this.dialog = true;
            },
        },

        mounted() {
            this.readEvent();
            this.$refs.calendar.checkChange()
            localStorage.setItem("menu", "Kalender Alokasi Pengambilan Gas");
        },
    }
</script>

<style>
    .my-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 3px;
        background-color: #673AB7;
        color: #ffffff;
        border: 1px solid #673AB7;
        width: 100%;
        font-size: 11px;
        padding: 0px;
        cursor: pointer;
        margin-bottom: 2px;
        margin-top: 4px;
    }

    .v-application--is-ltr .v-toolbar__content>.v-btn.v-btn--icon:first-child+.v-toolbar__title{
        padding: 0px
    }

    .v-application .pa-2 {
        padding: 0px !important;
    }
</style>