<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px"
        />

        <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data kendaraan</h5> -->
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Kalender Jadwal Pengiriman Gas</h3>
        </div>
        
        <div v-else-if="isMediumScreen" style="margin-bottom: 10.5%">
            <h3 style="float:left">Kalender Jadwal Pengiriman Gas</h3>
        </div>

        <div v-else style="margin-bottom: 12.5%">
            <h3 style="float:left">Kalender Jadwal Pengiriman Gas</h3>
        </div>

        <div>
            <v-row>
                <v-col
                    sm="3"
                    md="3"
                    lg="3"
                    cols="3"
                >
                    <v-row align="center" class="ml-1">
                        <v-icon small style="float:left;" color="#E91E63">mdi-square</v-icon>
                        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi Pengambilan Gas</span>
                    </v-row>
                    
                    <v-row align="center" class="ml-1 mt-5">
                        <v-icon small style="float:left;" color="#F9A825">mdi-square</v-icon>
                        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi Pengiriman Gas</span>
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
                                >
                                    <template v-slot:day="{ date }">
                                        <template v-for="event in eventsMap[date]">
                                            <v-menu
                                                :key="event.id"
                                                v-model="event.open"
                                                offset-x
                                                min-width="300px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <div
                                                        style="width: 92.5%; text-align:left; padding-left:5px;background-color:#E91E63; color:#ffffff"
                                                        v-if="event.title=='pengambilan'"
                                                        v-ripple
                                                        class="my-event"
                                                        v-html="event.jumlah_alokasi + ' Tabung'"
                                                    />

                                                    <div
                                                        style="width: 92.5%; text-align:left; padding-left:5px;background-color:#F9A825; color:#ffffff"
                                                        v-if="event.title=='pengiriman'"
                                                        v-ripple
                                                        class="my-event"
                                                        v-on="on"
                                                        v-html="event.jumlah_alokasi + ' Tabung'"
                                                        @click="eventHandler(event)"
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

        <v-dialog v-model="dialogData" persistent max-width="1000px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                    <h3 style="font-size:20px; color:#ffffff">Detail Jadwal</h3>
                    <v-spacer />
                    <v-icon @click="close()" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>

            <v-card style="border-radius: 0px 0px 4px 4px;">
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" lg="6" md="4">
                            <v-card outlined style="border-radius: 0px">
                                <v-simple-table
                                    fixed-header
                                    height="300px"
                                >
                                    <template v-slot:default>
                                        <thead style="background-color: #546E7A;">
                                            <tr style="background-color: #546E7A;">
                                                <th style="background-color: #546E7A; font-size: 15px; width: 65%; color: white;" class="text-center">
                                                    Driver
                                                </th>
                                                <th style="background-color: #546E7A; font-size: 15px; color: white;" class="text-center">
                                                    Pangkalan
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr
                                                v-for="driver in driverPerHari"
                                                :key="driver"
                                            >
                                                <td v-if="checkDriver==driver" style="background-color:#C8E6C9">{{ driver }}</td>
                                                <td v-else>{{ driver }}</td>
                                                <td v-if="checkDriver==driver" style="background-color:#C8E6C9">
                                                    <v-tooltip right>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon v-bind="attrs" v-on="on" small @click="pangkalanHandler(temp_tanggal, driver)" color="primary">mdi-eye</v-icon>
                                                        </template>
                                                        <span>Lihat Pangkalan</span>
                                                    </v-tooltip>
                                                </td>
                                                <td v-else>
                                                    <v-tooltip right>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon v-bind="attrs" v-on="on" small @click="pangkalanHandler(temp_tanggal,driver)" color="primary">mdi-eye</v-icon>
                                                        </template>
                                                        <span>Lihat Pangkalan</span>
                                                    </v-tooltip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-col>

                        <v-divider vertical />

                        <v-col cols="12" lg="6" md="8">
                            <span style="float:left">Tanggal Pengiriman: {{ temp_tanggal }}</span>
                            <br/>
                            <v-card v-if="lihatPangkalan==true" fill-height class="flex-item mx-auto" elevation="5" style="margin-top: 2.5%;">
                                <v-data-table
                                    :headers="headers"
                                    :items="pangkalanPerDriver"
                                    style="border-radius:4px"
                                >
                                    <template v-slot:[`item.actions`]="{ item }">
                                        <v-menu offset-y style="float: left">
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-bind="attrs" v-on="on" style="cursor: pointer">
                                                    <v-icon small @click="editHandler(item)" color="primary">mdi-magnify</v-icon>
                                                </span>
                                            </template>
                                        </v-menu>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                    <h3 style="font-size:20px; color:#ffffff">Detail Data</h3>
                    <v-spacer />
                    <v-icon @click="closeDialog" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>

            <v-card style="border-radius: 0px 0px 4px 4px">
                <v-card-text>
                    <v-container style="padding-left: 5px; padding-right: 5px">
                        <v-text-field
                            readonly
                            :rules="tanggalRules"
                            type="date"
                            v-model="form.tanggal_pengiriman_gas"
                            label="Tanggal Pengiriman Gas"
                        />

                        <v-text-field
                            readonly
                            v-model="form.jenis_alokasi_pengiriman_gas"
                            label="Jenis Alokasi"
                        />

                        <v-text-field
                            readonly
                            v-model="form.total_alokasi_pengiriman_gas"
                            label="Total Alokasi"
                        />

                        <v-select
                            readonly
                            :rules="pangkalanRules"
                            v-model="form.id_pangkalan"
                            :items="pangkalan"
                            item-text="nama_pangkalan"
                            item-value="id_pangkalan"
                            label="Pangkalan"
                            required
                        />
                        
                        <v-text-field
                            :rules="driverRules"
                            v-model="form.nama_driver"
                            label="Driver yang Bertugas"
                            readonly
                        />
                        
                        <v-spacer />
                        <!-- <v-btn v-if="this.inputType!='Tambah'" small color="error" dark style="float:right; margin-left:2%; margin-top: 3%;" @click="deleteHandler(editId)">Hapus</v-btn>
                        <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn> -->
                        <v-spacer />
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline" />
                </v-card-title>

                <v-card-text> Anda Yakin Ingin Menghapus Data Tersebut? </v-card-text>
                
                <v-spacer />
                <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
                <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
                <v-card-text />
            </v-card>
        </v-dialog> -->

        <!-- <v-dialog v-model="dialogClose" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline" />
                </v-card-title>
                <v-card-text> Buang perubahan? </v-card-text>
                
                <v-spacer />
                <v-btn small style="font-size:12px" color="#E53935" text @click="closeKalender">Buang</v-btn>
                <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogClose=false">Batal</v-btn>
                <v-card-text />
            </v-card>
        </v-dialog> -->

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
        name: "KalenderJadwalPengirimanGasPage",

        watch: {
            $route: {
                immediate: true,
                handler() {
                    document.title = "Kalender Jadwal Pengiriman Gas";
                },
            },
        },

        data() {
            return{
                color: "",
                sppbe: [],
                driver: [],
                jadwal: [],
                events: [],
                editId: "",
                type: 'month',
                dialog: false,
                pangkalan: [],
                tempEvents: [],
                vertical: true,
                overlay: false,
                snackbar: false,
                checkDriver: "",
                temp_tanggal: '',
                error_message: "",
                dialogData: false,
                driverPerHari: [],
                jadwalForEvent: [],
                dialogClose: false,
                inputType: "Tambah",
                dialogConfirm: false,
                snackbarJadwal: false,
                lihatPangkalan: false,
                pangkalanPerDriver: [],
                jadwalPengambilanGas: [],
                text: 'Alokasi sudah terpenuhi semua!',
                isWideScreen: window.innerWidth >= 1000,
                start: new Date().toISOString().slice(0, 10),
                driverRules: [(v) => !!v || "Nama Driver is Required"],
                pangkalanRules: [(v) => !!v || "Pangkalan is Required"],
                tanggalRules: [(v) => !!v || "Tanggal Alokasi is Required"],
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                    { 
                        text: "Jadwal Pengiriman Gas",
                        disabled: false,
                        href: '/jadwal-pengiriman-gas-page',
                    },
                    { 
                        text: "Kalender Jadwal Pengiriman Gas",
                        disabled: true,
                        href: '/kalender-jadwal-pengiriman-gas-page',
                    },
                ],
                headers: [
                    { text: "Pangkalan", value: "nama_pangkalan", align: "start",},
                    { text: "Jenis Alokasi", value: "jenis_alokasi_pengambilan_gas" },
                    { text: "Total Alokasi", value: "total_alokasi_pengiriman_gas" },
                    { text: "",  value:"actions", sortable: false},
                ],
                form: {
                    id_driver: null,
                    nama_driver: null,
                    id_pangkalan: null,
                    nama_pangkalan: null,
                    tanggal_pengiriman_gas: null,
                    id_jadwal_pengiriman_gas: null,
                    id_jadwal_rutin_pangkalan: null,
                    total_alokasi_pengiriman_gas: null,
                    jenis_alokasi_pengiriman_gas: null,
                },
            }
        },

        computed: {
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {}
                this.events.forEach(e => (map[e.tanggal] = map[e.tanggal] || []).push(e))
                return map
            },

            formTitle() {
                return this.inputType;
            },
        },

        methods: {
            open (event) {
                alert(event.title)
            },

            eventHandler(event) {
                this.driverPerHari=[];
                this.getDriver(event.tanggal);
                this.temp_tanggal = event.tanggal;
                
                this.dialogData=true;
            },

            pangkalanHandler(date,driver) {
                this.checkDriver = driver;
                this.lihatPangkalan = true;
                this.pangkalanPerDriver = [];
                this.tampilPangkalan(date,driver);
            },

            getDriver(date) {
                for (let i = 0; i < this.jadwal.length; i++) 
                {
                    if(this.jadwal[i].tanggal_pengiriman_gas === date && this.searchDriver(this.jadwal[i].nama_pegawai)==0) 
                    {
                        this.driverPerHari.push(this.jadwal[i].nama_pegawai);
                    }
                }
            },

            searchDriver(name) {
                for (let i = 0; i < this.driverPerHari.length; i++)
                {
                    if(this.driverPerHari[i] === name) 
                    {
                        return 1;
                    }
                }
                
                return 0;
            },

            tampilPangkalan(date, driver) {
                for (let i = 0; i < this.jadwal.length; i++) 
                {
                    if(this.jadwal[i].tanggal_pengiriman_gas === date && this.jadwal[i].nama_pegawai === driver) 
                    {
                        this.pangkalanPerDriver.push(this.jadwal[i]);
                    }
                } 
            },

            readEvent() {
                this.events = [];
                this.tempEvents = [];

                //jadwal pengambilan gas
                for (let i = 0; i < this.jadwalPengambilanGas.length; i++) 
                {
                    this.events = [
                        ...this.events,
                        {
                            title: "pengambilan",
                            tanggal: this.jadwalPengambilanGas[i].tanggal_pengambilan_gas,
                            jumlah_alokasi: this.jadwalPengambilanGas[i].alokasi_pengambilan_gas,
                            id: parseInt(this.jadwalPengambilanGas[i].id_jadwal_pengambilan_gas) + 1000,
                        }
                    ];
                    
                    this.overlay = false;
                }

                //jadwal pengiriman gas
                for (let i = 0; i < this.jadwal.length; i++) 
                {
                    if(i==0 || this.searchDate(this.jadwal[i].tanggal_pengiriman_gas) == null)
                    {
                        this.tempEvents = [
                            ...this.tempEvents, 
                            {
                                id: this.jadwal[i].id_jadwal_pengiriman_gas,
                                tanggal: this.jadwal[i].tanggal_pengiriman_gas,
                                jumlah_alokasi: this.jadwal[i].total_alokasi_pengiriman_gas,
                            }
                        ];
                    }
                    else
                    {
                        let temp = this.tempEvents[this.searchDate(this.jadwal[i].tanggal_pengiriman_gas)].jumlah_alokasi + this.jadwal[i].total_alokasi_pengiriman_gas;
                        this.tempEvents[this.searchDate(this.jadwal[i].tanggal_pengiriman_gas)].jumlah_alokasi = temp;
                    }
                }

                for (let i = 0; i < this.tempEvents.length; i++) 
                {
                    this.events = [
                        ...this.events,
                        {
                            title: "pengiriman",
                            tanggal: this.tempEvents[i].tanggal,
                            jumlah_alokasi: this.tempEvents[i].jumlah_alokasi,
                            id: parseInt(this.tempEvents[i].id_jadwal_pengiriman_gas) + 2000,
                        }
                    ];
                }
            },

            searchDate(date) {
                for (let i = 0; i < this.tempEvents.length; i++)
                {
                    if(this.tempEvents[i].tanggal === date)
                    {
                        return i;
                    }
                }

                return null;
            },

            //jadwal full atribut
            readJadwal() {
                var url = this.$api + "/jadwalPengirimanGas/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            let temp = response.data.data;

                            for (let i = 0; i < temp.length; i++) 
                            {
                                this.jadwalForEvent.push(
                                    {
                                        tanggal_pengiriman_gas: temp[i].tanggal_pengambilan_gas,
                                        jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                                        id_jadwal_pengiriman_gas: parseInt(temp[i].id_jadwal_pengiriman_gas),
                                        total_alokasi_pengiriman_gas: parseInt(temp[i].alokasi_penerimaan_gas),
                                    }
                                );
                                
                                this.jadwal.push(
                                    {
                                        nama_pegawai: temp[i].nama_pegawai,
                                        nama_pangkalan: temp[i].nama_pangkalan,
                                        id_pegawai: parseInt(temp[i].Pegawaiid_pegawai),
                                        id_pangkalan: parseInt(temp[i].Pangkalanid_pangkalan),
                                        tanggal_pengiriman_gas: temp[i].tanggal_pengambilan_gas,
                                        id_jadwal_pengiriman_gas: parseInt(temp[i].id_jadwal_pengiriman_gas),
                                        jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                                        id_jadwal_rutin_pangkalan: parseInt(temp[i].id_jadwal_rutin_pangkalan),
                                        total_alokasi_pengiriman_gas: parseInt(temp[i].alokasi_penerimaan_gas),
                                    },
                                );
                            }

                            this.color = "green";
                            this.snackbar = true;
                            this.error_message = response.data.message;

                            this.readJadwalPengambilan();
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

            searchDatePengambilan(date) {
                for (let i = 0; i < this.jadwalPengambilanGas.length; i++)
                {
                    if(this.jadwalPengambilanGas[i].tanggal_pengambilan_gas === date)
                    {
                        return i;
                    }
                }

                return null;
            },

            readJadwalPengambilan(){
                var url = this.$api + "/jadwalPengambilanGas/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            let tempArray = [];
                            let temp = response.data.data;

                            for (let i = 0; i < temp.length; i++) 
                            {
                                tempArray.push(
                                    {
                                        tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                        jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                                        id_jadwal_pengambilan_gas: parseInt(temp[i].id_jadwal_pengambilan_gas),
                                        alokasi_pengambilan_gas: parseInt(temp[i].jumlah_alokasi_pengambilan_gas),
                                    },
                                );
                            }

                            for (let i = 0; i < tempArray.length; i++) 
                            {
                                if(i==0 || this.searchDatePengambilan(tempArray[i].tanggal_pengambilan_gas) == null)
                                {
                                    this.jadwalPengambilanGas.push(tempArray[i]);
                                }
                                else
                                {
                                    this.jadwalPengambilanGas[this.searchDatePengambilan(tempArray[i].tanggal_pengambilan_gas)].alokasi_pengambilan_gas = this.jadwalPengambilanGas[this.searchDatePengambilan(tempArray[i].tanggal_pengambilan_gas)].alokasi_pengambilan_gas + tempArray[i].alokasi_pengambilan_gas;
                                }
                            }

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

            readPangkalan() {
                var url = this.$api + "/pangkalan/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.pangkalan = response.data.data;
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

            editHandler(item) {
                this.readPangkalan();
                this.inputType = "Edit";
                this.form.id_driver = item.id_pegawai;
                this.form.nama_driver = item.nama_pegawai;
                this.form.id_pangkalan = item.id_pangkalan;
                this.editId = item.id_jadwal_pengiriman_gas;
                this.form.nama_pangkalan = item.nama_pangkalan;
                this.form.tanggal_pengiriman_gas = item.tanggal_pengiriman_gas;
                this.form.id_jadwal_pengiriman_gas = item.id_jadwal_pengiriman_gas;
                this.form.id_jadwal_rutin_pangkalan = item.id_jadwal_rutin_pangkalan;
                this.form.total_alokasi_pengiriman_gas = item.total_alokasi_pengiriman_gas;
                this.form.jenis_alokasi_pengiriman_gas = item.jenis_alokasi_pengambilan_gas;

                this.dialogData = false;
                this.dialog = true;
            },

            close() {
                this.resetForm();
                this.checkDriver = "";
                this.inputType = "Tambah";
                this.pangkalanPerDriver = [];

                this.lihatPangkalan = false;
                this.dialogConfirm = false;
                this.dialogData = false;
                this.dialog = false;
            },

            closeDialog() {
                this.dialogData = true;
                this.dialog = false;
            },

            resetForm() {
                this.form = {
                    id_driver: null,
                    nama_driver: null,
                    id_pangkalan: null,
                    nama_pangkalan: null,
                    tanggal_pengiriman_gas: null,
                    id_jadwal_pengiriman_gas: null,
                    id_jadwal_rutin_pangkalan: null,
                    total_alokasi_pengiriman_gas: null,
                    jenis_alokasi_pengiriman_gas: null,
                };
            },
        },

        mounted() {
            this.$refs.calendar.checkChange()
            localStorage.setItem("menu", "Kalender Jadwal Pengiriman Gas");
            this.readJadwal();
        },
    }
</script>

<style>
    .my-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 3px;
        /* background-color: #F9A825; */
        color: #ffffff;
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

    .theme--light.v-sheet--outlined {
        border: thin solid rgba(0,0,0,.87);
    }

    /* .theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr>th {
        background-color:#546E7A;
        color:#ffffff
    } */
</style>