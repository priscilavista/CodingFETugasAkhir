<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
        :items="items"
        divider="/"
        style="margin-left:-25px; margin-top:-25px"
        ></v-breadcrumbs>
        <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data kendaraan</h5> -->
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
        <h3 style="float:left">Alokasi Pengambilan Gas</h3>
        </div>
        <div v-else-if="isMediumScreen" style="margin-bottom: 10.5%">
        <h3 style="float:left">Alokasi Pengambilan Gas</h3>
        </div>
        <div v-else style="margin-bottom: 8.5%">
        <h3 style="float:left">Alokasi Pengambilan Gas</h3>
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
                                @click:more="viewDay"
                                @click:date="viewDay"
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
                                                    <v-tooltip left>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            @click="editHandler(event)"
                                                            style="height:30px"
                                                            >
                                                              <v-icon small>mdi-pencil</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <span>Ubah</span>
                                                    </v-tooltip>
                                                    <!-- <v-btn icon>
                                                        <v-icon small>mdi-pencil</v-icon>
                                                    </v-btn> -->
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
                                                            <strong style="margin-left:5px">Reguler</strong>
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
                                                            <span style="margin-left:5px">{{ event.alokasi_reguler_pengambilan_gas }}</span>
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
                                                            <strong style="margin-left:5px">Fakultatif</strong>
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
                                                            <span style="margin-left:5px">{{ event.alokasi_fakultatif_pengambilan_gas }}</span>
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
                                                <!-- <span style="float: left; margin-left: 15px; margin-top: 15px">
                                                    <strong>Jumlah Alokasi:</strong> {{ event.jumlah_alokasi_pengambilan_gas }}
                                                </span>
                                                <br/>
                                                <span style="float: left; margin-left: 15px">
                                                    <strong>SPPBE:</strong> {{ event.nama_sppbe }}
                                                </span>
                                                <br/> -->
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

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                <!-- <v-spacer></v-spacer> -->
                <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
                <v-spacer></v-spacer>
                <v-icon @click="close()" link>mdi-close</v-icon>
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
                    ></v-text-field>
                    <v-text-field
                        :rules="alokasiRules"
                        type="number"
                        v-model="form.alokasi_reguler_pengambilan_gas"
                        label="Alokasi Reguler"
                    ></v-text-field>
                    <v-text-field
                        :rules="alokasiRules"
                        type="number"
                        v-model="form.alokasi_fakultatif_pengambilan_gas"
                        label="Alokasi Fakultatif"
                    ></v-text-field>
                    <v-select
                        :rules="SPPBERules"
                        v-model="form.id_sppbe"
                        :items="sppbe"
                        item-text="nama_SPPBE"
                        item-value="id_SPPBE"
                        label="SPPBE"
                        required
                    ></v-select>
                    
                    <v-spacer></v-spacer>
                    <v-btn v-if="this.inputType!='Tambah'" small color="error" dark style="float:right; margin-left:2%; margin-top: 3%;" @click="deleteHandler(editId)">Hapus</v-btn>
                    <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
                    <v-spacer></v-spacer>
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
                
                <v-spacer></v-spacer>
                <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
                <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
                <v-card-text></v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
            >{{ error_message }}
        </v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "KalenderAlokasiPengambilanGasPage",
    watch: {
        $route: {
            immediate: true,
            handler() {
                document.title = "Kalender Alokasi Pengambilan Gas";
            },
        },
    },
    data() {
        return{
            isWideScreen: window.innerWidth >= 1000,
            isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
            inputType: "Tambah",
            tempTitle: "",
            type: 'month',
            dialog: false,
            dialogConfirm: false,
            start: new Date().toISOString().slice(0, 10),
            items: [
                { 
                    text: "Dashboard",
                    disabled: false,
                    href: '/dashboard-page',
                },
                // { 
                //     text: "Alokasi Pengambilan Gas",
                //     disabled: false,
                //     href: '/alokasi-pengambilan-gas-page',
                // },
                { 
                    text: "Alokasi Pengambilan Gas",
                    disabled: true,
                    href: '/kalender-alokasi-pengambilan-gas-page',
                },
            ],
            form: {
                id_alokasi_pengambilan_gas: null,
                tanggal_pengambilan_gas: null,
                id_sppbe: null,
                nama_sppbe: null,
                jumlah_alokasi_pengambilan_gas: null,
                alokasi_reguler_pengambilan_gas: null,
                alokasi_fakultatif_pengambilan_gas: null,
            },
            form_sppbe: {
                id_sppbe: null,
                nama_sppbe: null,
            },
            sppbe: [],
            deleteId: "",
            editId: "",
            form_event: {
                id_alokasi_pengambilan_gas: null,
                tanggal_pengambilan_gas: null,
                alokasi_reguler_pengambilan_gas: null,
                alokasi_fakultatif_pengambilan_gas: null,
                id_sppbe: null,
                nama_sppbe: null,
            },
            events: [
                {
                    id_alokasi_pengambilan_gas: 1,
                    jumlah_alokasi_pengambilan_gas: 1840,
                    alokasi_reguler_pengambilan_gas: 1280,
                    alokasi_fakultatif_pengambilan_gas: 560,
                    nama_sppbe: 'Going to the beach!',
                    tanggal_pengambilan_gas: new Date().toISOString().slice(0, 10),
                },
            ],
            // jumlahAlokasi: [
            //     {
            //         alokasi: 360,
            //     },
            //     {
            //         alokasi: 560,
            //     }
            // ],
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
      open (event) {
        alert(event.title)
      },
      viewDay ({ date }) {
        var temp = this.searchDate(date);
        if(temp == 0)
        {
            this.dialog=true;
            this.form.tanggal_pengambilan_gas = date;
        }

      },
      searchDate(date) {
        for (let i = 0; i < this.events.length; i++) {
            if(date == this.events[i].tanggal_pengambilan_gas) {
                return 1;
            }
        }
        return 0;
        // if(date === this.events[0].tanggal_pengambilan_gas)
        //     return 1;
        // else
        //     return 0;
      },
      readEvent() {
        var url = this.$api + "/alokasiPengambilanGasRead/";
        this.$http.get(url).then((response) => {
            // this.role = response.data.data;
            let temp = response.data.data;
            this.form_event.id_alokasi_pengambilan_gas = temp.map((v) => v.id_alokasi_pengambilan_gas);
            this.form_event.tanggal_pengambilan_gas = temp.map((v) => v.tanggal_pengambilan_gas);
            this.form_event.alokasi_reguler_pengambilan_gas = temp.map((v) => v.alokasi_reguler_pengambilan_gas);
            this.form_event.alokasi_fakultatif_pengambilan_gas = temp.map((v) => v.alokasi_fakultatif_pengambilan_gas);
            this.form_event.nama_sppbe = temp.map((v) => v.nama_sppbe);
            this.form_event.id_sppbe = temp.map((v) => v.id_sppbe);
            for (let i = 0; i < this.form_event.nama_event.length; i++) {
                this.events.push({
                    id_alokasi_pengambilan_gas: this.form_event.id_alokasi_pengambilan_gas[i],
                    tanggal_pengambilan_gas: this.form_event.tanggal_pengambilan_gas[i],
                    alokasi_reguler_pengambilan_gas: this.form_event.alokasi_reguler_pengambilan_gas[i],
                    alokasi_fakultatif_pengambilan_gas: this.form_event.alokasi_fakultatif_pengambilan_gas[i],
                    jumlah_alokasi_pengambilan_gas: this.form_event.alokasi_reguler_pengambilan_gas[i] + this.form_event.alokasi_fakultatif_pengambilan_gas[i],
                    nama_sppbe: this.form_event.nama_sppbe[i],
                    id_sppbe: this.form_event.id_sppbe[i],
                })
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
      save() {
      this.alokasi.append("tanggal_pengambilan_gas", this.form.tanggal_pengambilan_gas);
      this.alokasi.append("id_sppbe", this.id_sppbe);
      this.alokasi.append("alokasi_reguler_pengambilan_gas", this.form.alokasi_reguler_pengambilan_gas);
      this.alokasi.append("alokasi_fakultatif_pengambilan_gas", this.form.alokasi_fakultatif_pengambilan_gas);

      var url = this.$api + "/alokasi/";
      this.load = true;
      this.$http
        .post(url, this.alokasi, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.close();
          this.updateTemp();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
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
    //ubah data alokasi
    update() {
      let newData = {
        id_sppbe: this.form.id_sppbe,
        tanggal_pengambilan_gas: this.form.tanggal_pengambilan_gas,
        alokasi_reguler_pengambilan_gas: this.form.alokasi_reguler_pengambilan_gas,
        alokasi_fakultatif_pengambilan_gas: this.form.alokasi_fakultatif_pengambilan_gas,
      };

      var url = this.$api + "/alokasi/" + this.editId;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
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
      var url = this.$api + "/alokasiDelete/" + this.deleteId;
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
        this.editId = item.id_alokasi_pengambilan_gas;
        this.form.tanggal_pengambilan_gas = item.tanggal_pengambilan_gas;
        this.form.id_sppbe = item.id_sppbe,
        this.form.nama_sppbe = item.nama_sppbe,
        this.form.alokasi_reguler_pengambilan_gas = item.alokasi_reguler_pengambilan_gas,
        this.form.alokasi_fakultatif_pengambilan_gas = item.alokasi_fakultatif_pengambilan_gas,
        this.dialog = true;
    },
    deleteHandler(id) {
    //   if(this.searchDate(this.form.tanggal_pengambilan_gas)!=1)
    //   {
    //     this.deleteId = id;
    //     this.dialogConfirm = true;
    //   }
    this.deleteId = id;
    this.dialogConfirm = true;
    },
      close() {
        this.inputType = "Tambah";
        this.dialog = false;
        this.dialogConfirm = false;
        this.resetForm();
        this.readDataRemove();
        location.reload(true);
    },
      resetForm() {
      this.form = {
        id_alokasi_pengambilan_gas: null,
        tanggal_pengambilan_gas: null,
        id_sppbe: null,
        nama_sppbe: null,
        jumlah_alokasi_pengambilan_gas: null,
        alokasi_reguler_pengambilan_gas: null,
        alokasi_fakultatif_pengambilan_gas: null,
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
        background-color: #673AB7;
        color: #ffffff;
        border: 1px solid #673AB7;
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