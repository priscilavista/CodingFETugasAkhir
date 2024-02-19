<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px"
        />

        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Jadwal Pengambilan Gas</h3>
        </div>

        <div v-else-if="isMediumScreen" style="margin-bottom: 10.5%">
            <h3 style="float:left">Jadwal Pengambilan Gas</h3>
        </div>

        <div v-else style="margin-bottom: 12.5%">
            <h3 style="float:left">Jadwal Pengambilan Gas</h3>
        </div>

        <div>
            <v-row>
                <v-col
                    sm="3"
                    md="3"
                    lg="3"
                    cols="3"
                >
                    <v-row align="center" justify="left" class="ml-1">
                        <v-icon small style="float:left;" color="#673AB7">mdi-square</v-icon>
                        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi Pengambilan Gas</span>
                    </v-row>
                    <v-row align="center" justify="left" class="ml-1 mt-5">
                        <v-icon small style="float:left;" color="#E91E63">mdi-square</v-icon>
                        <span style="float:left; margin-left:3.5px; font-size:15px;">Jadwal Pengambilan Gas</span>
                    </v-row>
                </v-col>
            </v-row>
        </div>

        <div class="mt-5">
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
                                                :key="event.jumlah_alokasi_pengambilan_gas"
                                                v-model="event.open"
                                                offset-x
                                                min-width="300px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <div
                                                        class="my-event"
                                                        v-if="event.title=='alokasi'"
                                                        v-html="event.jumlah_alokasi_pengambilan_gas + ' Tabung'"
                                                        style="width: 92.5%; text-align:left; padding-left:5px;background-color:#673AB7; color:#ffffff"
                                                    />

                                                    <div
                                                        v-on="on"
                                                        class="my-event"
                                                        @click="lihatDetail(event)"
                                                        v-if="event.title=='jadwal'"
                                                        v-html="event.alokasi_pengambilan_gas + ' Tabung'"
                                                        style="width: 92.5%; text-align:left; padding-left:5px;background-color:#E91E63; color:#ffffff"
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
        
        <v-dialog v-model="dialogData" persistent max-width="600px">
            <v-card height="30%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                    <h3 style="font-size:20px; color:#ffffff">Detail Jadwal</h3>
                    <v-spacer />
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" @click="close" style="font-size: 28px" link color="error">mdi-close</v-icon>
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
                                    :key="item.id_jadwal_pengambilan_gas"
                                    cols="12"
                                    sm="6"
                                    md="6"
                                    lg="6"
                                >
                                    <v-card>
                                        <v-card-title style="width:200px" class="subheading font-weight-bold">
                                            {{ item.nama_pegawai }}
                                        </v-card-title>

                                        <v-divider />

                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>Jenis:</v-list-item-content>

                                                <v-list-item-content style="text-align: left; margin-left: -5px">
                                                    {{ item.jenis_alokasi_pengambilan_gas }}
                                                </v-list-item-content>
                                            </v-list-item>

                                            <v-list-item>
                                                <v-list-item-content>Alokasi:</v-list-item-content>

                                                <v-list-item-content style="text-align: left">
                                                    {{ item.alokasi_pengambilan_gas }}
                                                </v-list-item-content>
                                            </v-list-item>

                                            <v-list-item>
                                                <v-list-item-content>SPPBE:</v-list-item-content>

                                                <v-list-item-content style="text-align: left">
                                                    {{ item.nama_sppbe }}
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

        <v-snackbar
            v-model="snackbarJadwal"
            :vertical="vertical"
        >
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="#03A9F4"
                    text
                    v-bind="attrs"
                    @click="snackbarJadwal = false"
                >
                    Tutup
                </v-btn>
            </template>
        </v-snackbar>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

        <v-overlay :value="overlay" class="align-center justify-center" style="zIndex: 100000">
            <v-progress-circular indeterminate size="64" />
        </v-overlay>
    </v-main>
</template>

<script>
    export default {
        name: "KalenderJadwalPengambilanGasPage",

        watch: {
            $route: {
                immediate: true,
                handler() {
                    document.title = "Kalender Jadwal Pengambilan Gas";
                },
            },
        },

        data() {
            return{
                page: 1,
                sppbe: [],
                color: "",
                driver: [],
                jadwal: [],
                editId: "",
                events: [],
                type: 'month',
                tempEvents: [],
                vertical: true,
                overlay: false,
                itemsPerPage: 2,
                snackbar: false,
                dialogData: false,
                jadwalAlokasi: [],
                error_message: "",
                jadwalForEvent: [],
                inputType: "Tambah",
                jadwalPerTanggal: [],
                snackbarJadwal: false,
                itemsPerPageArray: [2, 4, 8, 12],
                text: 'Alokasi sudah terpenuhi semua!',
                isWideScreen: window.innerWidth >= 1000,
                start: new Date().toISOString().slice(0, 10),
                SPPBERules: [(v) => !!v || "SPPBE Tidak Boleh Kosong"],
                driverRules: [(v) => !!v || "Nama Driver Tidak Boleh Kosong"],
                alokasiRules: [(v) => !!v || "Jumlah Alokasi Tidak Boleh Kosong"],
                tanggalRules: [(v) => !!v || "Tanggal Alokasi Tidak Boleh Kosong"],
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                form: {
                    id_sppbe: null,
                    nama_sppbe: null,
                    id_pegawai: null,
                    nama_pegawai: null,
                    tanggal_pengambilan_gas: null,
                    id_jadwal_pengambilan_gas: null,
                    jumlah_alokasi_pengambilan_gas: null,
                    alokasi_fakultatif_pengambilan_gas: null,
                },
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                    { 
                        text: "Jadwal Pengambilan Gas",
                        disabled: false,
                        href: '/jadwal-pengambilan-gas-page',
                    },
                    { 
                        text: "Kalender Jadwal Pengambilan Gas",
                        disabled: true,
                        href: '/kalender-jadwal-pengambilan-gas-page',
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

            formTitle() {
                return this.inputType;
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

            readDataAlokasi() {
                this.overlay = true;

                var url = this.$api + "/alokasiPengambilanGas/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            let temp = response.data.data;

                            for (let i = 0; i < temp.length; i++) 
                            {
                                this.jadwalAlokasi.push(
                                    {
                                        nama_sppbe: temp[i].nama_sppbe,
                                        SPPBEid_sppbe: parseInt(temp[i].SPPBEid_sppbe),
                                        tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                        jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                                        jumlah_alokasi_pengambilan_gas: parseInt(temp[i].jumlah_alokasi_pengambilan_gas),
                                    }
                                );
                            }

                            this.readDataJadwal();
                            this.color = "green";
                            this.snackbar = true;
                            this.overlay = false;
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

            readDataJadwal() {
                this.overlay = true;
                var url = this.$api + "/jadwalPengambilanGas/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            let temp = response.data.data;

                            for (let i = 0; i < temp.length; i++) 
                            {
                                this.jadwalForEvent.push(
                                    {
                                        tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                        jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                                        id_jadwal_pengambilan_gas: parseInt(temp[i].id_jadwal_pengambilan_gas),
                                        alokasi_pengambilan_gas: parseInt(temp[i].alokasi_pengambilan_gas),
                                    }
                                );

                                this.jadwal.push(
                                    {
                                        nama_sppbe: temp[i].nama_sppbe,
                                        nama_pegawai: temp[i].nama_pegawai,
                                        id_sppbe: parseInt(temp[i].SPPBEid_sppbe),
                                        id_pegawai: parseInt(temp[i].Pegawaiid_pegawai),
                                        tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                        jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                                        id_jadwal_pengambilan_gas: parseInt(temp[i].id_jadwal_pengambilan_gas),
                                        alokasi_pengambilan_gas: parseInt(temp[i].alokasi_pengambilan_gas),
                                    }
                                );
                            }

                            this.color = "green";
                            this.snackbar = true;
                            this.error_message = response.data.message;

                            this.readEvent();
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

            readEvent() {
                this.events = [];
                this.tempEvents = [];
                
                //alokasi
                for (let i = 0; i < this.jadwalAlokasi.length; i++) 
                {
                    if(i==0 || this.searchDateAlokasi(this.jadwalAlokasi[i].tanggal_pengambilan_gas) == null)
                    {
                        this.events.push(
                            {
                                title: "alokasi",
                                tanggal_pengambilan_gas: this.jadwalAlokasi[i].tanggal_pengambilan_gas,
                                jenis_alokasi_pengambilan_gas: this.jadwalAlokasi[i].jenis_alokasi_pengambilan_gas,
                                jumlah_alokasi_pengambilan_gas: this.jadwalAlokasi[i].jumlah_alokasi_pengambilan_gas,
                            }
                        );
                    }
                    else
                    {
                        this.events[this.searchDateAlokasi(this.jadwalAlokasi[i].tanggal_pengambilan_gas)].jumlah_alokasi_pengambilan_gas = this.events[this.searchDateAlokasi(this.jadwalAlokasi[i].tanggal_pengambilan_gas)].jumlah_alokasi_pengambilan_gas + this.jadwalAlokasi[i].jumlah_alokasi_pengambilan_gas;
                    }
                }

                //jadwal
                for (let i = 0; i < this.jadwalForEvent.length; i++) 
                {
                    if(i==0 || this.searchDateJadwal(this.jadwalForEvent[i].tanggal_pengambilan_gas) == null)
                    {
                        this.tempEvents.push(this.jadwalForEvent[i]);
                    }
                    else
                    {
                        this.tempEvents[this.searchDateJadwal(this.jadwalForEvent[i].tanggal_pengambilan_gas)].alokasi_pengambilan_gas = this.tempEvents[this.searchDateJadwal(this.jadwalForEvent[i].tanggal_pengambilan_gas)].alokasi_pengambilan_gas + this.jadwalForEvent[i].alokasi_pengambilan_gas;
                    }
                }
                
                for (let i = 0; i < this.tempEvents.length; i++) 
                {
                    this.events.push(
                        {
                            title: "jadwal",
                            tanggal_pengambilan_gas: this.tempEvents[i].tanggal_pengambilan_gas,
                            jenis_alokasi_pengambilan_gas: this.tempEvents[i].jenis_alokasi_pengambilan_gas,
                            alokasi_pengambilan_gas: this.tempEvents[i].alokasi_pengambilan_gas,
                        }
                    );
                }
                
                this.overlay = false;
            },

            searchDateAlokasi(date) {
                for (let i = 0; i < this.events.length; i++)
                {
                    if(this.events[i].tanggal_pengambilan_gas === date)
                    {
                        return i;
                    }
                }

                return null;
            },

            searchDateJadwal(date) {
                for (let i = 0; i < this.tempEvents.length; i++)
                {
                    if(this.tempEvents[i].tanggal_pengambilan_gas === date)
                    {
                        return i;
                    }
                }

                return null;
            },

            listJadwal(date) {
                if(this.jadwalPerTanggal.length!=0)
                {
                    this.jadwalPerTanggal = [];
                }

                for (let i = 0; i < this.jadwal.length; i++) 
                {
                    if(date === this.jadwal[i].tanggal_pengambilan_gas)
                    {
                        this.jadwalPerTanggal.push(this.jadwal[i]);
                    }
                }
            },

            lihatDetail(event) {
                this.listJadwal(event.tanggal_pengambilan_gas);

                this.dialogData = true;
            },

            close() {
                this.resetForm();
                this.inputType = "Tambah";

                this.dialogConfirm = false;
                this.dialogData = false;
                this.dialog = false;
            },

            resetForm() {
                this.form = {
                    id_sppbe: null,
                    nama_sppbe: null,
                    id_pegawai: null,
                    nama_pegawai: null,
                    tanggal_pengambilan_gas: null,
                    id_jadwal_pengambilan_gas: null,
                    jumlah_alokasi_pengambilan_gas: null,
                    alokasi_fakultatif_pengambilan_gas: null,
                };
            },
        },

        mounted() {
            this.readDataAlokasi();
            this.$refs.calendar.checkChange();
            localStorage.setItem("menu", "Kalender Jadwal Pengambilan Gas");
        },
    }
</script>

<style>
    .my-event {
        width: 100%;
        padding: 0px;
        font-size: 12px;
        cursor: pointer;
        margin-top: 4px;
        overflow: hidden;
        margin-bottom: 2px;
        border-radius: 3px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .v-application--is-ltr .v-toolbar__content>.v-btn.v-btn--icon:first-child+.v-toolbar__title {
        padding: 0px
    }
</style>