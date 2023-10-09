<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
        :items="items"
        divider="/"
        style="margin-left:-25px; margin-top:-25px"
        ></v-breadcrumbs>
        <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data kendaraan</h5> -->
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Kalender Jadwal Pengambilan Gas</h3>
        </div>
        <div v-else-if="isMediumScreen" style="margin-bottom: 10.5%">
            <h3 style="float:left">Kalender Jadwal Pengambilan Gas</h3>
        </div>
        <div v-else style="margin-bottom: 8.5%">
            <h3 style="float:left">Kalender Jadwal Pengambilan Gas</h3>
        </div>

        <div id="app">
            <v-app id="inspire">
                <v-layout wrap>
                    <v-flex
                        sm4
                        xs12
                        class="text-sm-left text-xs-center"
                    >
                        <v-btn
                            icon
                            @click="$refs.calendar.prev()"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex
                        sm4
                        xs12
                        class="text-xs-center"
                        style="margin-top:2px"
                    > 
                        <v-toolbar-title v-if="$refs.calendar">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>
                    </v-flex>
                    <v-flex
                        sm4
                        xs12
                        class="text-sm-right text-xs-center"
                    >
                        <v-btn
                            icon
                            @click="$refs.calendar.next()"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex
                        xs12
                        class="mb-3"
                    >
                        <v-sheet height="500">
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
                                            full-width
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
                                                    v-html="event.jumlah_alokasi_pengambilan_gas + ' tabung'"
                                                ></div>
                                            </template>
                                            <v-card
                                            color="grey lighten-4"
                                            flat
                                            min-height="140px"
                                            >
                                                <v-toolbar
                                                    color="#196b4d"
                                                    dark
                                                    style="height:55px;margin-top:-11.5px"
                                                >
                                                    <v-toolbar-title style="font-size: 17.5px; margin-top:2.5px" small><strong>Detail</strong></v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                    <v-tooltip right>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            style="height:30px"
                                                            >
                                                              <v-icon  @click="close()" small>mdi-close</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <span>Tutup</span>
                                                    </v-tooltip>
                                                    
                                                </v-toolbar>
                                                <v-container class="grey lighten-5">
                                                    <v-row no-gutters>
                                                        <v-col
                                                            cols="6"
                                                            md="4"
                                                        >
                                                            <v-card
                                                            class="pa-2"
                                                            outlined
                                                            tile
                                                            style="text-align:left;"
                                                            >
                                                            <strong style="margin-left:5px">Tanggal</strong>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col
                                                            cols="6"
                                                            sm="6"
                                                            md="8"
                                                        >
                                                            <v-card
                                                            class="pa-2"
                                                            outlined
                                                            tile
                                                            style="text-align:left;"
                                                            >
                                                            <span style="margin-left:5px">{{ event.tanggal_pengambilan_gas }}</span>
                                                            </v-card>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col
                                                            cols="6"
                                                            md="4"
                                                        >
                                                            <v-card
                                                            class="pa-2"
                                                            outlined
                                                            tile
                                                            style="text-align:left;"
                                                            >
                                                            <strong style="margin-left:5px">Alokasi</strong>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col
                                                            cols="6"
                                                            sm="6"
                                                            md="8"
                                                        >
                                                            <v-card
                                                            class="pa-2"
                                                            outlined
                                                            tile
                                                            style="text-align:left;"
                                                            >
                                                            <span style="margin-left:5px">{{ event.jumlah_alokasi_pengambilan_gas }}</span>
                                                            </v-card>
                                                        </v-col>
                                                    </v-row>
                                                     <v-row no-gutters>
                                                        <v-col
                                                            cols="6"
                                                            md="4"
                                                        >
                                                            <v-card
                                                            class="pa-2"
                                                            outlined
                                                            tile
                                                            style="text-align:left;"
                                                            >
                                                            <strong style="margin-left:5px">SPPBE</strong>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col
                                                            cols="6"
                                                            sm="6"
                                                            md="8"
                                                            style="text-align:left;"
                                                        >
                                                            <v-card
                                                            class="pa-2"
                                                            outlined
                                                            tile
                                                            >
                                                            <span style="margin-left:5px">{{ event.nama_sppbe }}</span>
                                                            </v-card>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                                <!-- <v-card-text style="text-align: left; margin-left: 15px; margin-top: 15px; padding:0">
                                                    <strong>Jumlah Alokasi:</strong> {{ event.jumlah_alokasi_pengambilan_gas }}
                                                </v-card-text>
                                                <v-card-text style="text-align: left; margin-left: 15px; padding:0">
                                                    <strong>SPPBE:</strong> {{ event.nama_sppbe }}
                                                </v-card-text> -->
                                                <iframe 
                                                    :src="form.url_maps_sppbe" 
                                                    width="90%" 
                                                    height="80%" 
                                                    style="border:0;margin-top:10px" 
                                                    allowfullscreen="" 
                                                    loading="lazy" 
                                                    referrerpolicy="no-referrer-when-downgrade"
                                                ></iframe>
                                          </v-card>
                                        </v-menu>
                                    </template>
                                </template>

                                <!-- <template v-slot:day="{ date }">
                                    <template v-for="event in eventsMap[date]">
                                        <v-menu
                                            :key="event.jumlah_alokasi_pengambilan_gas"
                                            v-model="event.open"
                                            full-width
                                            offset-x
                                        >
                                            <template v-slot:activator="{ on }">
                                                <div
                                                    style="width: 90%; display: flex; justify-content: center"
                                                    v-if="!event.time"
                                                    v-ripple
                                                    class="my-event"
                                                    v-on="on"
                                                    v-html="event.jumlah_alokasi_pengambilan_gas"
                                                ></div>
                                            </template>
                                            <v-card
                                            color="grey lighten-4"
                                            min-width="350px"
                                            flat
                                            >
                                                <v-toolbar
                                                    color="primary"
                                                    dark
                                                >
                                                    <v-btn icon>
                                                    <v-icon>edit</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                    <v-btn icon>
                                                    <v-icon>favorite</v-icon>
                                                    </v-btn>
                                                    <v-btn icon>
                                                    <v-icon>more_vert</v-icon>
                                                    </v-btn>
                                                </v-toolbar>
                                                <v-card-title primary-title>
                                                    <span v-html="event.details"></span>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn
                                                    flat
                                                    color="secondary"
                                                    >
                                                    Cancel
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-menu>
                                    </template>
                                </template> -->
                                
                            </v-calendar>
                        </v-sheet>
                    </v-flex>
            
                    
                </v-layout>
            </v-app>
        </div>
    </v-main>
</template>

<script>
export default {
    name: "KalenderJadwalPengambilanGasDriverPage",
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
            urlmaps:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3179886116654!2d110.60751207469967!3d-7.9660523793959435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bb35c043e46a3%3A0xebf21f55d252602!2sSATRIA%20PERMANA%20JAYA.%20PT!5e0!3m2!1sen!2sid!4v1693234689734!5m2!1sen!2sid",
            isWideScreen: window.innerWidth >= 1000,
            isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
            inputType: "Tambah",
            tempTitle: "",
            type: 'month',
            dialog: false,
            start: new Date().toISOString().slice(0, 10),
            items: [
                { 
                    text: "Dashboard",
                    disabled: false,
                    href: '/dashboard-page',
                },
                { 
                    text: "Jadwal Pengambilan Gas",
                    disabled: true,
                    href: '/kalender-jadwal-pengambilan-gas-driver-page',
                },
            ],
            form: {
                id_jadwal_pengambilan_gas: null,
                tanggal_pengambilan_gas: null,
                id_sppbe: null,
                nama_sppbe: null,
                url_maps_sppbe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3179886116654!2d110.60751207469967!3d-7.9660523793959435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bb35c043e46a3%3A0xebf21f55d252602!2sSATRIA%20PERMANA%20JAYA.%20PT!5e0!3m2!1sen!2sid!4v1693234689734!5m2!1sen!2sid",
                jumlah_alokasi_pengambilan_gas: null,
            },
            form_sppbe: {
                id_sppbe: null,
                nama_sppbe: null,
            },
            sppbe: [],
            deleteId: "",
            editId: "",
            form_event: {
                id_jadwal_pengambilan_gas: null,
                tanggal_pengambilan_gas: null,
                jumlah_alokasi_pengambilan_gas: null,
                nama_sppbe: null,
            },
            events: [
                {
                    jumlah_alokasi_pengambilan_gas: '2000',
                    nama_sppbe: 'Going to the beach!',
                    tanggal_pengambilan_gas: new Date().toISOString().slice(0, 10),
                },
            ],
            events2: [
                {
                title: 'Vacation',
                details: 'Going to the beach!',
                date: '2023-08-28',
                open: false
                },
                {
                title: 'Vacation',
                details: 'Going to the beach!',
                date: '2023-08-29',
                open: false
                },
                {
                title: 'Vacation',
                details: 'Going to the beach!',
                date: '2023-08-30',
                open: false
                },
                {
                title: 'Meeting',
                details: 'Spending time on how we do not have enough time',
                date: '2023-08-31',
                open: false
                },
                {
                title: '30th Birthday',
                details: 'Celebrate responsibly',
                date: '2023-08-30',
                open: false
                },
                {
                title: 'New Year',
                details: 'Eat chocolate until you pass out',
                date: '2023-08-25',
                open: false
                },
                {
                title: 'Conference',
                details: 'Mute myself the whole time and wonder why I am on this call',
                date: '2023-08-20',
                open: false
                },
                {
                title: 'Hackathon',
                details: 'Code like there is no tommorrow',
                date: '2023-08-30',
                open: false
                }
            ]
        }
    },
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap2 () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      },
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.tanggal_pengambilan_gas] = map[e.tanggal_pengambilan_gas] || []).push(e))
        return map
      },
      formTitle() {
        return this.inputType;
      },
    },
    methods: {
      cek() {
          console.log(this.form.url_maps_sppbe)
      },
      open (event) {
        alert(event.title)
      },
      readEvent() {
        var url = this.$api + "/jadwalPengambilanGasRead/";
        this.$http.get(url).then((response) => {
            // this.role = response.data.data;
            let temp = response.data.data;
            this.form_event.id_jadwal_pengambilan_gas = temp.map((v) => v.id_alokasi_pengambilan_gas);
            this.form_event.tanggal_pengambilan_gas = temp.map((v) => v.tanggal_pengambilan_gas);
            this.form_event.jumlah_alokasi_pengambilan_gas = temp.map((v) => v.jumlah_alokasi_pengambilan_gas);
            this.form_event.nama_sppbe = temp.map((v) => v.nama_sppbe);
            for (let i = 0; i < this.form_event.nama_event.length; i++) {
                this.events.id_jadwal_pengambilan_gas.push(this.form_event.id_jadwal_pengambilan_gas[i]);
                this.events.tanggal_pengambilan_gas.push(this.form_event.tanggal_pengambilan_gas[i]);
                this.events.jumlah_alokasi_pengambilan_gas.push(this.form_event.jumlah_alokasi_pengambilan_gas[i]);
                this.events.nama_sppbe.push(this.form_event.nama_sppbe[i]);
            }
        });
      },
      readSPPBE() {
        var url = this.$api + "/sppbeRead";
        this.$http.get(url).then((response) => {
            // this.role = response.data.data;
            let temp = response.data.data;
            this.form_sppbe.id_sppbe = temp.map((v) => v.id_sppbe);
            this.form_sppbe.nama_sppbe = temp.map((v) => v.nama_sppbe);
            for (let i = 0; i < this.form_sppbe.nama_sppbe.length; i++) {
            this.sppbe.id_sppbe.push(this.form_sppbe.id_sppbe[i]);
            this.sppbe.nama_sppbe.push(this.form_sppbe.nama_sppbe[i]);
            }
        });
      },
        updateTemp() {
        var url = this.$api + "/alokasiTemp";
        this.load = true;
        this.$http
            .put(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            })
            .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = true;
            this.readDataRemove();
            this.resetForm();
            })
            .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
            });
        },
      close() {
        this.inputType = "Tambah";
        this.dialog = false;
        this.dialogConfirm = false;
        this.readDataRemove();
      },
      resetForm() {
        this.form = {
            id_alokasi_pengambilan_gas: null,
            tanggal_alokasi_pengambilan_gas: null,
            id_sppbe: null,
            nama_sppbe: null,
            jumlah_alokasi_pengambilan_gas: null,
        };
      },
    },
    mounted() {
    this.$refs.calendar.checkChange()
    localStorage.setItem("menu", "Kalender Alokasi Pengambilan Gas");
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    
  },
}
</script>

<style>
    .my-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 3px;
        background-color: #E91E63;
        color: #ffffff;
        border: 1px solid #E91E63;
        width: 100%;
        font-size: 11px;
        padding: 0px;
        cursor: pointer;
        margin-bottom: 1px;
        margin-top: 3px;
    }
    .v-application--is-ltr .v-toolbar__content>.v-btn.v-btn--icon:first-child+.v-toolbar__title{
        padding: 0px
    }
    .v-application .pa-2 {
        padding: 0px !important;
    }
</style>