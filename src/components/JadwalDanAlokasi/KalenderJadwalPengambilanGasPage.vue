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
                    sm="2"
                    md="2"
                    lg="2"
                    cols="2"
                >
                    <v-row align="center" justify="center">
                        <v-icon small style="float:left;" color="#673AB7">mdi-square</v-icon>
                        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi pengambilan gas</span>
                    </v-row>
                </v-col>

                <v-col
                    sm="2"
                    md="2"
                    lg="2"
                    cols="2"
                >
                    <v-row align="center" justify="center">
                        <v-icon small style="float:left;" color="#E91E63">mdi-square</v-icon>
                        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi yang terpenuhi</span>
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
                            <v-sheet height="500">
                                <v-calendar
                                    ref="calendar"
                                    v-model="start"
                                    :type="type"
                                    color="#E0E0E0"
                                    @click:more="viewDay"
                                    @click:date="viewDay"
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
                                                        v-html="event.jumlah_alokasi_pengambilan_gas + ' Tabung'"
                                                        style="width: 92.5%; text-align:left; padding-left:5px;background-color:#E91E63; color:#ffffff"
                                                    />
                                                </template>

                                                <v-dialog v-model="dialogData" persistent max-width="600px">
                                                    <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                                                        <v-card-title>
                                                            <h3 style="font-size:20px; color:#ffffff">Detail Jadwal</h3>
                                                            <v-spacer />
                                                            <v-icon @click="close()" link>mdi-close</v-icon>
                                                        </v-card-title>
                                                    </v-card>

                                                    <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
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
                                                                                    
                                                                                    <v-tooltip right>
                                                                                        <template v-slot:activator="{ on, attrs }">
                                                                                            <v-btn
                                                                                                v-bind="attrs"
                                                                                                v-on="on"
                                                                                                icon
                                                                                                @click="editHandler(item)"
                                                                                                style="float: right"
                                                                                                color="blue darken-3"
                                                                                            >
                                                                                                <v-icon small>mdi-pencil</v-icon>
                                                                                            </v-btn>
                                                                                        </template>

                                                                                        <span>Ubah</span>
                                                                                    </v-tooltip>
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
                                                                                        <v-list-item-content>Alokasi:</v-list-item-content>

                                                                                        <v-list-item-content style="text-align: left">
                                                                                            {{ item.jumlah_alokasi_pengambilan_gas }}
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
                                                                        class="mt-2"
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
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                    <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
                    <v-spacer />
                    <v-icon @click="dialog=false" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>

            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
                <v-card-text>
                    <v-container style="padding-left: 5px; padding-right: 5px">
                        <v-text-field
                            :rules="tanggalRules"
                            type="date"
                            v-model="form.tanggal_pengambilan_gas"
                            label="Tanggal Pengambilan Gas"
                            disabled
                        />

                        <v-select
                            style="padding-top:0"
                            :rules="SPPBERules"
                            v-model="form.id_sppbe"
                            :items="sppbe"
                            item-text="nama_sppbe"
                            item-value="id_sppbe"
                            label="SPPBE"
                            required
                        />

                        <v-select
                            style="padding-top:0;"
                            v-if="form.tanggal_pengambilan_gas!=null&&form.id_sppbe!=null"
                            :rules="alokasiRules"
                            v-model="form.jumlah_alokasi_pengambilan_gas"
                            :items="alokasi"
                            item-text="jumlah"
                            item-value="jumlah"
                            label="Jumlah Alokasi"
                            required
                        />

                        <v-select
                            style="padding-top:0"
                            v-else
                            :rules="alokasiRules"
                            v-model="form.jumlah_alokasi_pengambilan_gas"
                            :items="alokasi"
                            item-text="jumlah"
                            item-value="jumlah"
                            label="Jumlah Alokasi"
                            disabled
                        />

                        <span v-if="form.tanggal_pengambilan_gas!=null&&form.id_sppbe!=null" style="float:left; margin-top:-20px;">sisa alokasi: {{ searchAlokasi(form.tanggal_pengambilan_gas,form.id_sppbe) - sumAlokasiWithout(form.tanggal_pengambilan_gas,form.id_jadwal_pengambilan_gas) - form.jumlah_alokasi_pengambilan_gas }} tabung</span>

                        <v-select
                            v-if="form.tanggal_pengambilan_gas!=null&&form.id_sppbe!=null"
                            style="padding-top:17px"
                            :rules="driverRules"
                            v-model="form.driver"
                            :items="driver"
                            item-text="nama_pegawai"
                            item-value="id_pegawai"
                            label="Driver yang Bertugas"
                            required
                        />

                        <v-select
                            v-else
                            style="padding-top:0"
                            :rules="driverRules"
                            v-model="form.driver"
                            :items="driver"
                            item-text="nama_pegawai"
                            item-value="id_pegawai"
                            label="Driver yang Bertugas"
                            required
                        />

                        <v-spacer />
                        <v-btn small color="primary" dark style="float:right; margin-top: 2%;margin-left:2%" @click="save">Simpan</v-btn>
                        <v-btn v-if="this.inputType!='Tambah'" small color="error" dark style="float:right; ; margin-top: 2%;" @click="deleteHandler(editId)">Hapus</v-btn>
                        <v-spacer />
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline"></span>
                </v-card-title>

                <v-card-text> Anda Yakin Ingin Menghapus Data Tersebut? </v-card-text>

                <v-spacer />
                <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
                <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogClose" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline"></span>
                </v-card-title>

                <v-card-text> Buang perubahan? </v-card-text>

                <v-spacer />
                <v-btn small style="font-size:12px" color="#E53935" text @click="closeKalender">Buang</v-btn>
                <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogClose=false">Batal</v-btn>
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

        <v-overlay :value="overlay">
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
                type: 'month',
                dialog: false,
                vertical: true,
                overlay: false,
                itemsPerPage: 2,
                snackbar: false,
                dialogData: false,
                error_message: "",
                dialogClose: false,
                inputType: "Tambah",
                dialogConfirm: false,
                snackbarJadwal: false,
                itemsPerPageArray: [2,4, 8, 12],
                text: 'Alokasi sudah terpenuhi semua!',
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
                        disabled: false,
                        href: '/jadwal-pengambilan-gas-page',
                    },
                    { 
                        text: "Jadwal Pengambilan Gas",
                        disabled: true,
                        href: '/kalender-jadwal-pengambilan-gas-page',
                    },
                ],
                form: {
                    id_jadwal_pengambilan_gas: null,
                    tanggal_pengambilan_gas: null,
                    id_sppbe: null,
                    nama_sppbe: null,
                    id_pegawai: null,
                    nama_pegawai: null,
                    jumlah_alokasi_pengambilan_gas: null,
                    alokasi_fakultatif_pengambilan_gas: null,
                },
                sppbe: [],
                driver: [],
                deleteId: "",
                editId: "",
                alokasi: [
                    {
                        jumlah: 360
                    },
                    {
                        jumlah: 560
                    },
                ],
                events: [],
                tempEvents: [],
                jadwalAlokasi: [],
                form_jadwal: {
                    id_jadwal_pengambilan_gas: null,
                    tanggal_pengambilan_gas: null,
                    jumlah_alokasi_pengambilan_gas: null,
                    id_sppbe: null,
                    nama_sppbe: null,
                    id_pegawai: null,
                    nama_pegawai: null,
                    alokasi_fakultatif_pengambilan_gas: null,
                },
                jadwal: [],
                form_jadwalForEvent: {
                    id_jadwal_pengambilan_gas: null,
                    tanggal_pengambilan_gas: null,
                    jumlah_alokasi_pengambilan_gas: null,
                },
                jadwalForEvent: [],
                jadwalPerTanggal: [],
                SPPBERules: [(v) => !!v || "SPPBE is Required"],
                alokasiRules: [(v) => !!v || "Jumlah Alokasi is Required"],
                driverRules: [(v) => !!v || "Nama Driver is Required"],
                tanggalRules: [(v) => !!v || "Tanggal Alokasi is Required"],
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

            viewDay ({ date }) {
                let sppbe = null;
                var sum = this.sumAlokasi(date);
                var alokasi = this.searchAlokasi(date,sppbe);
                this.resetForm();
                if(sum < alokasi)
                {
                    this.form.tanggal_pengambilan_gas = date;
                    this.searchSPPBEAlokasi(date);
                    this.dialog=true;
                }
                else if(sum!=0)
                {
                    this.snackbarJadwal = true;
                }
            },

            searchAlokasi(date,sppbe) {
                if(sppbe == null)
                {
                    for (let i = 0; i < this.jadwalAlokasi.length; i++) {
                        if(date === this.jadwalAlokasi[i].tanggal_pengambilan_gas) {
                            return this.jadwalAlokasi[i].jumlah_alokasi_pengambilan_gas;
                        }
                    }
                    return 0;
                }
                else
                {
                    for (let i = 0; i < this.jadwalAlokasi.length; i++) {
                        if(date === this.jadwalAlokasi[i].tanggal_pengambilan_gas && sppbe === this.jadwalAlokasi[i].id_sppbe) {
                            return this.jadwalAlokasi[i].jumlah_alokasi_pengambilan_gas;
                        }
                    }
                    return 0;
                }
            },

            sumAlokasi(date) {
                let sum = 0;

                for (let i = 0; i < this.jadwal.length; i++) {
                    if(date === this.jadwal[i].tanggal_pengambilan_gas)
                    {
                        sum = sum + this.jadwal[i].jumlah_alokasi_pengambilan_gas;
                    }
                }
                return sum;
            },

            sumAlokasiWithout(date,id) {
                let sum = 0;
                for (let i = 0; i < this.jadwal.length; i++) {
                    if(date === this.jadwal[i].tanggal_pengambilan_gas && 
                    this.jadwal[i].id_jadwal_pengambilan_gas !== id)
                    {
                        sum = sum + this.jadwal[i].jumlah_alokasi_pengambilan_gas;
                    }
                }
                return sum;
            },

            nextPage () {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },

            formerPage () {
                if (this.page - 1 >= 1) this.page -= 1
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
                                this.jadwalAlokasi.push({
                                    nama_sppbe: temp[i].nama_sppbe,
                                    SPPBEid_sppbe: parseInt(temp[i].SPPBEid_sppbe),
                                    tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                    jumlah_alokasi_pengambilan_gas: temp[i].jumlah_alokasi_pengambilan_gas,
                                })
                            }

                            this.readDataJadwal();
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
                var url = this.$api + "/jadwalPengambilanGas/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            let temp = response.data.data;

                            for (let i = 0; i < temp.length; i++) 
                            {
                                this.jadwalForEvent.push({
                                    id_jadwal_pengambilan_gas: parseInt(temp[i].id_jadwal_pengambilan_gas),
                                    jumlah_alokasi_pengambilan_gas: temp[i].jumlah_alokasi_pengambilan_gas,
                                    tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                });

                                this.jadwal.push({
                                    id_jadwal_pengambilan_gas: parseInt(temp[i].id_jadwal_pengambilan_gas),
                                    id_sppbe: parseInt(temp[i].SPPBEid_sppbe),
                                    id_pegawai: parseInt(temp[i].Pegawaiid_pegawai),
                                    jumlah_alokasi_pengambilan_gas: parseInt(temp[i].jumlah_alokasi_pengambilan_gas),
                                    nama_sppbe: temp[i].nama_sppbe,
                                    tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                    nama_pegawai: temp[i].nama_pegawai,
                                });
                            }

                            this.color = "green";
                            this.snackbar = true;
                            this.overlay = false;
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
                for (let i = 0; i < this.jadwalAlokasi.length; i++) {
                    if(i==0 || this.searchDateAlokasi(this.jadwalAlokasi[i].tanggal_pengambilan_gas) == null)
                    {
                        this.events.push({
                            title: "alokasi",
                            tanggal_pengambilan_gas: this.jadwalAlokasi[i].tanggal_pengambilan_gas,
                            jumlah_alokasi_pengambilan_gas: this.jadwalAlokasi[i].jumlah_alokasi_pengambilan_gas,
                        });
                    }
                    else
                    {
                        this.events[this.searchDateAlokasi(this.jadwalAlokasi[i].tanggal_pengambilan_gas)].jumlah_alokasi_pengambilan_gas = this.events[this.searchDateAlokasi(this.jadwalAlokasi[i].tanggal_pengambilan_gas)].jumlah_alokasi_pengambilan_gas + this.jadwalAlokasi[i].jumlah_alokasi_pengambilan_gas;
                    }
                }

                //jadwal
                for (let i = 0; i < this.jadwalForEvent.length; i++) {
                    if(i==0 || this.searchDateJadwal(this.jadwalForEvent[i].tanggal_pengambilan_gas) == null)
                    {
                        this.tempEvents.push(this.jadwalForEvent[i]);
                    }
                    else
                    {
                        this.tempEvents[this.searchDateJadwal(this.jadwalForEvent[i].tanggal_pengambilan_gas)].jumlah_alokasi_pengambilan_gas = this.tempEvents[this.searchDateJadwal(this.jadwalForEvent[i].tanggal_pengambilan_gas)].jumlah_alokasi_pengambilan_gas + this.jadwalForEvent[i].jumlah_alokasi_pengambilan_gas;
                    }
                }
                
                for (let i = 0; i < this.tempEvents.length; i++) {
                    this.events.push({
                        title: "jadwal",
                        tanggal_pengambilan_gas: this.tempEvents[i].tanggal_pengambilan_gas,
                        jumlah_alokasi_pengambilan_gas: this.tempEvents[i].jumlah_alokasi_pengambilan_gas,
                    });
                }
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

            searchSPPBEAlokasi(date) {
                for (let i = 0; i < this.jadwalAlokasi.length; i++)
                {
                    if(this.jadwalAlokasi[i].tanggal_pengambilan_gas === date)
                    {
                        this.sppbe.push({
                            id_sppbe: this.jadwalAlokasi[i].id_sppbe,
                            nama_sppbe: this.jadwalAlokasi[i].nama_sppbe,
                        })
                    }
                }
                // var url = this.$api + "/alokasiPengambilanGas/" + date;
                // this.$http.get(url).then((response) => {
                //     // this.role = response.data.data;
                //     let temp = response.data.data;
                //     this.form_alokasi.id_sppbe = temp.map((v) => v.id_sppbe);
                //     this.form_alokasi.nama_sppbe = temp.map((v) => v.nama_sppbe);
                //     for (let i = 0; i < this.form_alokasi.length; i++) {
                //         this.sppbe.push(this.form_alokasi[i]);
                //     }
                // });
            },

            readSPPBE() {
                var url = this.$api + "/sppbe/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.sppbe = response.data.data;
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

            lihatDetail(event) {
                this.listJadwal(event.tanggal_pengambilan_gas);
                this.dialogData = true;
            },

            save() {
                this.jadwal.append("tanggal_pengambilan_gas", this.form.tanggal_pengambilan_gas);
                this.jadwal.append("id_sppbe", this.id_sppbe);
                this.jadwal.append("id_pegawai", this.id_pegawai);
                this.jadwal.append("jumlah_alokasi_pengambilan_gas", this.form.jumlah_alokasi_pengambilan_gas);
                this.jadwal.append("alokasi_fakultatif_pengambilan_gas", 0);

                var url = this.$api + "/jadwalPengambilanGas/";
                this.load = true;
                this.$http.post(url, this.alokasi)
                    .then((response) => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = true;
                        this.close();
                    })
                    .catch((error) => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
            },

            //ubah data alokasi
            update() {
                let newData = {
                    id_sppbe: this.form.id_sppbe,
                    id_pegawai: this.form.id_pegawai,
                    tanggal_pengambilan_gas: this.form.tanggal_pengambilan_gas,
                    jumlah_alokasi_pengambilan_gas: this.form.jumlah_alokasi_pengambilan_gas,
                };

                var url = this.$api + "/jadwalPengambilanGas/" + this.editId;
                this.load = true;
                this.$http.put(url, newData)
                    .then((response) => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.close();
                        this.readDataRemove();
                        this.resetForm();
                        this.inputType = "Tambah";
                    })
                    .catch((error) => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
            },

            //non aktif data alokasi
            deleteData() {
                var url = this.$api + "/jadwalPengambilanGasDelete/" + this.deleteId;
                this.load = true;
                this.$http.put(url)
                    .then((response) => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.close();
                        this.readDataRemove();
                        this.resetForm();
                        this.inputType = "Tambah";
                    })
                    .catch((error) => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
            },

            editHandler(item) {
                this.inputType = "Edit";
                this.editId = item.id_jadwal_pengambilan_gas;
                this.form.id_jadwal_pengambilan_gas = item.id_jadwal_pengambilan_gas;
                this.form.tanggal_pengambilan_gas = item.tanggal_pengambilan_gas;
                this.form.id_sppbe = item.id_sppbe,
                this.form.nama_sppbe = item.nama_sppbe,
                this.form.id_pegawai = item.id_pegawai,
                this.form.nama_pegawai = item.nama_pegawai,
                this.form.jumlah_alokasi_pengambilan_gas = item.jumlah_alokasi_pengambilan_gas,
                this.form.alokasi_fakultatif_pengambilan_gas = item.alokasi_fakultatif_pengambilan_gas,

                // this.dialogData= true;
                this.searchSPPBEAlokasi(item.tanggal_pengambilan_gas);
                this.dialog = true;
            },

            deleteHandler(id) {
                if(this.searchDate(this.form.tanggal_pengambilan_gas)!=1)
                {
                    this.deleteId = id;
                    this.dialogConfirm = true;
                }
            },

            close() {
                this.inputType = "Tambah";
                this.dialog = false;
                this.dialogConfirm = false;
                this.dialogData = false;
                this.resetForm();
                window.location.reload(true);
            },

            closeKalender() {
                this.dialog = false;
                this.dialogData = true;
                this.dialogClose = false;
                this.resetForm();
                this.inputType = "Tambah";
            },

            resetForm() {
                this.form = {
                    id_jadwal_pengambilan_gas: null,
                    tanggal_pengambilan_gas: null,
                    id_sppbe: null,
                    nama_sppbe: null,
                    id_pegawai: null,
                    nama_pegawai: null,
                    jumlah_alokasi_pengambilan_gas: null,
                    alokasi_fakultatif_pengambilan_gas: null,
                };
            },
        },

        mounted() {
            this.$refs.calendar.checkChange()
            localStorage.setItem("menu", "Kalender Jadwal Pengambilan Gas");
            this.readDataAlokasi();
        },
    }
</script>

<style>
    .my-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 3px;
        /* background-color: #673AB7; */
        /* color: #ffffff; */
        /* border: 1px solid #673AB7; */
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
</style>