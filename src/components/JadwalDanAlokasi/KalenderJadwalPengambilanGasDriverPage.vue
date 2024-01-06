<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px"
        />

        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Kalender Jadwal Pengambilan Gas</h3>
        </div>

        <div v-else-if="isMediumScreen" style="margin-bottom: 10.5%">
            <h3 style="float:left">Kalender Jadwal Pengambilan Gas</h3>
        </div>

        <div v-else style="margin-bottom: 8.5%">
            <h3 style="float:left">Kalender Jadwal Pengambilan Gas</h3>
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
                                                :key="event.jumlah_alokasi_pengambilan_gas"
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
                                                        v-html="event.jumlah_alokasi_pengambilan_gas + ' tabung'"
                                                    />
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
                                                        <v-toolbar-title style="font-size: 17.5px; margin-top:2.5px" small>
                                                            <strong>Detail</strong>
                                                        </v-toolbar-title>
                                                        
                                                        <v-spacer />
<!-- 
                                                        <v-tooltip right>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    icon
                                                                    style="height:30px"
                                                                >
                                                                    <v-icon small color="error" style="font-size: 23px">mdi-close</v-icon>
                                                                </v-btn>
                                                            </template>

                                                            <span>Tutup</span>
                                                        </v-tooltip> -->

                                                        <v-tooltip left>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-icon v-bind="attrs" v-on="on" style="font-size: 24px" link color="error">mdi-close</v-icon>
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
                                                        :src="event.url_maps_sppbe" 
                                                        width="90%" 
                                                        height="80%" 
                                                        style="border:0;margin-top:10px" 
                                                        allowfullscreen="" 
                                                        loading="lazy" 
                                                        referrerpolicy="no-referrer-when-downgrade"
                                                    />
                                                </v-card>
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

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64" />
        </v-overlay>
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
                color: "",
                events: [],
                type: 'month',
                overlay: false,
                snackbar: false,
                error_message: "",
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
                        text: "Jadwal Pengambilan Gas",
                        disabled: true,
                        href: '/kalender-jadwal-pengambilan-gas-driver-page',
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
        },

        methods: {
            open (event) {
                alert(event.title)
            },

            readEvent() {
                this.overlay = true;

                var url = this.$api + "/jadwalPengambilanGas/getByDriver/" + localStorage.getItem('id');
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            let temp = response.data.data;

                            for (let i = 0; i < temp.length; i++) 
                            {
                                if(i == 0 || this.searchDateJadwal(temp[i].tanggal_pengambilan_gas) == null)
                                {
                                    this.events.push(
                                        {
                                            jumlah_alokasi_pengambilan_gas: parseInt(temp[i].alokasi_pengambilan_gas),
                                            nama_sppbe: temp[i].nama_sppbe,
                                            tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                            url_maps_sppbe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3179886116654!2d110.60751207469967!3d-7.9660523793959435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bb35c043e46a3%3A0xebf21f55d252602!2sSATRIA%20PERMANA%20JAYA.%20PT!5e0!3m2!1sen!2sid!4v1693234689734!5m2!1sen!2sid",
                                        }
                                    );
                                }
                                else
                                {
                                    this.events[this.searchDateJadwal(temp[i].tanggal_pengambilan_gas)].jumlah_alokasi_pengambilan_gas = this.events[this.searchDateJadwal(temp[i].tanggal_pengambilan_gas)].jumlah_alokasi_pengambilan_gas + parseInt(temp[i].alokasi_pengambilan_gas);
                                }
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

            searchDateJadwal(date) {
                for (let i = 0; i < this.events.length; i++)
                {
                    if(this.events[i].tanggal_pengambilan_gas === date)
                    {
                        return i;
                    }
                }

                return null;
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