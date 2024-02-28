<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px"
        />

        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Alokasi Pengambilan Gas</h3>
        </div>

        <div v-else-if="isMediumScreen" style="margin-bottom: 10.5%">
            <h3 style="float:left">Alokasi Pengambilan Gas</h3>
        </div>

        <div v-else style="margin-bottom: 8.5%">
            <h3 style="float:left">Alokasi Pengambilan Gas</h3>
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
                        <v-icon small style="float:left;" color="#673AB7">mdi-square</v-icon>
                        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi Reguler</span>
                    </v-row>
                    <v-row align="center" class="ml-1 mt-5">
                        <v-icon small style="float:left;" color="#b73a42">mdi-square</v-icon>
                        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi Fakultatif</span>
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
                                    <v-btn icon @click="$refs.calendar.prev()">
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
                                    <v-btn icon @click="$refs.calendar.next()">
                                        <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </div>

                        <div class="mt-5">
                            <v-sheet height="600">
                                <v-calendar
                                    :type="type"
                                    ref="calendar"
                                    color="#E0E0E0"
                                    v-model="start"
                                    @click:more="viewDay"
                                    @click:date="viewDay"
                                >
                                    <template v-slot:day="{ date }">
                                        <template v-for="event in eventsMap[date]">
                                            <v-menu
                                                offset-x
                                                min-width="300px"
                                                v-model="event.open"
                                                :key="event.jumlah_alokasi_pengambilan_gas"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <div
                                                        v-ripple
                                                        v-on="on"
                                                        class="my-event-reguler"
                                                        style="width: 92.5%; text-align:left; padding-left:5px"
                                                        v-html="event.jumlah_alokasi_pengambilan_gas + ' Tabung'"
                                                        v-if="!event.time && event.jenis_alokasi_pengambilan_gas === 'Reguler'"
                                                    />
                                                    
                                                    <div
                                                        v-ripple
                                                        v-on="on"
                                                        class="my-event-fakultatif"
                                                        style="width: 92.5%; text-align:left; padding-left:5px"
                                                        v-html="event.jumlah_alokasi_pengambilan_gas + ' Tabung'"
                                                        v-else-if="!event.time && event.jenis_alokasi_pengambilan_gas === 'Fakultatif'"
                                                    />
                                                </template>

                                                <v-card
                                                    flat
                                                    min-height="140px"
                                                    color="grey lighten-4"
                                                >
                                                    <v-toolbar
                                                        dark
                                                        color="#196b4d"
                                                        style="height:55px;margin-top:-11.5px"
                                                    >
                                                        <v-tooltip left>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn
                                                                    icon
                                                                    v-on="on"
                                                                    v-bind="attrs"
                                                                    style="height:30px"
                                                                    @click="editHandler(event)"
                                                                >
                                                                    <v-icon small>mdi-pencil</v-icon>
                                                                </v-btn>
                                                            </template>

                                                            <span>Ubah</span>
                                                        </v-tooltip>

                                                        <v-toolbar-title style="font-size: 17.5px; margin-top:2.5px" small>
                                                            <strong>Detail</strong>
                                                        </v-toolbar-title>

                                                        <v-spacer />

                                                        <v-tooltip right>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn
                                                                    icon
                                                                    v-on="on"
                                                                    v-bind="attrs"
                                                                    style="height:30px"
                                                                >
                                                                    <v-icon @click="close()" small>mdi-close</v-icon>
                                                                </v-btn>
                                                            </template>

                                                            <span>Tutup</span>
                                                        </v-tooltip>
                                                    </v-toolbar>

                                                    <v-container class="grey lighten-5">
                                                        <v-row no-gutters>
                                                            <v-col
                                                                md="4"
                                                                cols="6"
                                                            >
                                                                <v-card
                                                                    tile
                                                                    outlined
                                                                    class="pa-2"
                                                                    style="text-align:left;"
                                                                >
                                                                    <strong style="margin-left:5px">Tanggal</strong>
                                                                </v-card>
                                                            </v-col>

                                                            <v-col
                                                                sm="6"
                                                                md="8"
                                                                cols="6"
                                                            >
                                                                <v-card
                                                                    tile
                                                                    outlined
                                                                    class="pa-2"
                                                                    style="text-align:left;"
                                                                >
                                                                    <span style="margin-left:5px">{{ event.tanggal_pengambilan_gas }}</span>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>

                                                        <v-row no-gutters>
                                                            <v-col
                                                                md="4"
                                                                cols="6"
                                                            >
                                                                <v-card
                                                                    tile
                                                                    outlined
                                                                    class="pa-2"
                                                                    style="text-align:left;"
                                                                >
                                                                    <strong style="margin-left:5px">Jenis</strong>
                                                                </v-card>
                                                            </v-col>

                                                            <v-col
                                                                sm="6"
                                                                md="8"
                                                                cols="6"
                                                            >
                                                                <v-card
                                                                    tile
                                                                    outlined
                                                                    class="pa-2"
                                                                    style="text-align:left;"
                                                                >
                                                                    <span style="margin-left:5px">{{ event.jenis_alokasi_pengambilan_gas }}</span>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>

                                                        <v-row no-gutters>
                                                            <v-col
                                                                md="4"
                                                                cols="6"
                                                            >
                                                                <v-card
                                                                    tile
                                                                    outlined
                                                                    class="pa-2"
                                                                    style="text-align:left;"
                                                                >
                                                                    <strong style="margin-left:5px">Jumlah</strong>
                                                                </v-card>
                                                            </v-col>

                                                            <v-col
                                                                sm="6"
                                                                md="8"
                                                                cols="6"
                                                            >
                                                                <v-card
                                                                    tile
                                                                    outlined
                                                                    class="pa-2"
                                                                    style="text-align:left;"
                                                                >
                                                                    <span style="margin-left:5px">{{ event.jumlah_alokasi_pengambilan_gas }} Tabung</span>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>

                                                        <v-row no-gutters>
                                                            <v-col
                                                                md="4"
                                                                cols="6"
                                                            >
                                                                <v-card
                                                                    tile
                                                                    outlined
                                                                    class="pa-2"
                                                                    style="text-align:left;"
                                                                >
                                                                    <strong style="margin-left:5px">SPPBE</strong>
                                                                </v-card>
                                                            </v-col>

                                                            <v-col
                                                                sm="6"
                                                                md="8"
                                                                cols="6"
                                                                style="text-align:left;"
                                                            >
                                                                <v-card
                                                                    tile
                                                                    outlined
                                                                    class="pa-2"
                                                                >
                                                                    <span style="margin-left:5px">{{ event.nama_sppbe }}</span>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
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

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                    <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
                    <v-spacer />
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" @click="close()" style="font-size: 28px" link color="error">mdi-close</v-icon>
                        </template>
                        <span>Tutup</span>
                    </v-tooltip>
                </v-card-title>
            </v-card>

            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
                <v-card-text>
                    <v-container style="padding-left: 5px; padding-right: 5px">
                        <v-text-field
                            disabled
                            type="date"
                            :rules="tanggalRules"
                            label="Tanggal Pengambilan Gas"
                            v-model="form.tanggal_pengambilan_gas"
                        />

                        <v-select
                            required
                            :rules="jenisRules"
                            label="Jenis Alokasi"
                            item-text="nama_jenis"
                            :items="jenis_alokasi"
                            item-value="nama_jenis"
                            v-model="form.jenis_alokasi_pengambilan_gas"
                        />

                        <v-text-field
                            type="number"
                            :rules="alokasiRules"
                            label="Jumlah Alokasi"
                            v-model="form.jumlah_alokasi_pengambilan_gas"
                        />

                        <v-select
                            required
                            label="SPPBE"
                            :items="sppbe"
                            :rules="SPPBERules"
                            item-value="id_sppbe"
                            item-text="nama_sppbe"
                            v-model="form.SPPBEid_sppbe"
                        />
                        
                        <v-spacer />
                        <v-btn v-if="this.inputType!='Tambah' && this.form.status_alokasi_pengambilan_gas!='A'" text small color="primary" dark style="float:left; margin-left:-2.5%; margin-top: 3%" @click="dialogConfirmStatus=true">Konfirmasi</v-btn>
                        <v-btn v-if="this.inputType!='Tambah' && this.form.status_alokasi_pengambilan_gas!='A'" small color="error" dark style="float:right; margin-left:2%; margin-top: 3%;" @click="deleteHandler(editId)">Hapus</v-btn>
                        <v-btn v-if="this.form.status_alokasi_pengambilan_gas!='A'" small color="primary" dark style="float:right; margin-top: 3%" @click="setForm">Simpan</v-btn>
                        <v-spacer />
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
                <v-card-title >
                    <h3 style="font-size:20px; color:#ffffff">Hapus Data</h3>
                    <v-spacer />
                    <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" @click="dialogConfirm = false" style="font-size: 28px" link color="error">mdi-close</v-icon>
                    </template>
                    <span>Tutup</span>
                    </v-tooltip>
                </v-card-title>
                </v-card>
                <v-card-text style="padding-bottom:5px; padding-left:16px">
                <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">Apakah anda yakin ingin menghapus data tersebut?</p>
                </v-card-text>
                <v-card-actions>
                <v-spacer />
                <v-btn color="#E53935" text @click="deleteData">Hapus</v-btn>
                <v-btn color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirmStatus" persistent max-width="400px">
            <v-card>
                <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
                <v-card-title>
                    <h3 style="font-size:18px; color:#ffffff">Konfirmasi Alokasi Pengambilan Gas</h3>
                    <v-spacer />
                    <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" @click="dialogConfirmStatus = false" style="font-size: 28px" link color="error">mdi-close</v-icon>
                    </template>
                    <span>Tutup</span>
                    </v-tooltip>
                </v-card-title>
                </v-card>

                <v-card-text style="padding-bottom:5px; padding-left:16px">
                <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">
                    Anda yakin ingin <strong>menyetujui</strong> permintaan alokasi pengambilan gas ini?
                </p>
                </v-card-text>

                <v-card-actions>
                <v-spacer />
                <v-btn color="#E53935" text @click="updateStatus">Setuju</v-btn>
                <v-btn color="#1E88E5" text @click="dialogConfirmStatus = false">Batal</v-btn>
                </v-card-actions>
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
                color: "",
                sppbe: [],
                editId: "",
                events: [],
                deleteId: "",
                type: 'month',
                dialog: false,
                snackbar: false,
                overlay: false,
                error_message: "",
                inputType: "Tambah",
                dialogConfirm: false,
                dialogConfirmStatus: false,
                isWideScreen: window.innerWidth >= 1000,
                alokasi_pengambilan_gas: new FormData(),
                start: new Date().toLocaleDateString("sv-se").split('T')[0],
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                jenis_alokasi: [ { id: 1, nama_jenis: 'Reguler' }, { id: 2, nama_jenis: 'Fakultatif' }, ],
                items: [
                    { 
                        disabled: false,
                        text: "Dashboard",
                        href: '/dashboard-page',
                    },
                    { 
                        disabled: false,
                        text: "Alokasi Pengambilan Gas",
                        href: '/alokasi-pengambilan-gas-page',
                    },
                    { 
                        disabled: true,
                        text: "Kalender Alokasi Pengambilan Gas",
                        href: '/kalender-alokasi-pengambilan-gas-page',
                    },
                ],
                form: {
                    nama_sppbe: null,
                    SPPBEid_sppbe: null,
                    tanggal_pengambilan_gas: null,
                    id_alokasi_pengambilan_gas: null,
                    jenis_alokasi_pengambilan_gas: null,
                    jumlah_alokasi_pengambilan_gas: null,
                    status_alokasi_pengambilan_gas: null,
                },
                form_event: {
                    nama_sppbe: null,
                    SPPBEid_sppbe: null,
                    tanggal_pengambilan_gas: null,
                    id_alokasi_pengambilan_gas: null,
                    jenis_alokasi_pengambilan_gas: null,
                    jumlah_alokasi_pengambilan_gas: null,
                },
                SPPBERules: [(v) => !!v || "SPPBE Tidak Boleh Kosong"],
                jenisRules: [(v) => !!v || "Jenis Alokasi Tidak Boleh Kosong"],
                alokasiRules: [(v) => !!v || "Jumlah Alokasi Tidak Boleh Kosong"],
                tanggalRules: [(v) => !!v || "Tanggal Alokasi Tidak Boleh Kosong"],
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
        },

        methods: {
            setForm() {
                if (this.inputType !== "Tambah") 
                {
                    this.update();
                } 
                else 
                {
                    this.save();
                }
            },

            open (event) {
                alert(event.title)
            },

            viewDay ({ date }) {
                this.dialog=true;
                this.readSPPBE();
                this.form.tanggal_pengambilan_gas = date;
            },

            readEvent() {
                this.overlay = true;

                var url = this.$api + "/alokasiPengambilanGas/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code == 200)
                        {
                            let temp = response.data.data;

                            for (let i = 0; i < temp.length; i++) 
                            {
                                this.events.push({
                                    SPPBEid_sppbe: parseInt(temp[i].SPPBEid_sppbe),
                                    nama_sppbe: temp[i].nama_sppbe,
                                    id_alokasi_pengambilan_gas: parseInt(temp[i].id_alokasi_pengambilan_gas),
                                    jumlah_alokasi_pengambilan_gas: temp[i].jumlah_alokasi_pengambilan_gas,
                                    jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                                    tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                                    status_alokasi_pengambilan_gas: temp[i].status_alokasi_pengambilan_gas,
                                })
                            }

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

            readSPPBE() {
                this.overlay = true;
                var url = this.$api + "/sppbe/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.sppbe = response.data.data;
                            this.overlay = false;
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

            save() {
                this.overlay = true;
                this.alokasi_pengambilan_gas.append("SPPBEid_sppbe", this.form.SPPBEid_sppbe);
                this.alokasi_pengambilan_gas.append("tanggal_pengambilan_gas", this.form.tanggal_pengambilan_gas);
                this.alokasi_pengambilan_gas.append("jenis_alokasi_pengambilan_gas", this.form.jenis_alokasi_pengambilan_gas);
                this.alokasi_pengambilan_gas.append("jumlah_alokasi_pengambilan_gas", this.form.jumlah_alokasi_pengambilan_gas);
                this.alokasi_pengambilan_gas.append("status_alokasi_pengambilan_gas", 'P');

                var url = this.$api + "/alokasiPengambilanGas/create";
                this.$http.post(url, this.alokasi_pengambilan_gas)
                .then((response) => {
                    if(response.data.code === 200)
                    {
                        this.close();
                        this.readEvent();
                        this.resetForm();
                        this.color = "green";
                        this.snackbar = true;
                        this.inputType = "Tambah";
                        this.overlay = false;
                        this.error_message = response.data.message;
                        location.reload();
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

            //ubah data alokasi
            update() {
                this.overlay = true;
                let newData = {
                    SPPBEid_sppbe: this.form.SPPBEid_sppbe,
                    tanggal_pengambilan_gas: this.form.tanggal_pengambilan_gas,
                    jenis_alokasi_pengambilan_gas: this.form.jenis_alokasi_pengambilan_gas,
                    jumlah_alokasi_pengambilan_gas: this.form.jumlah_alokasi_pengambilan_gas,
                };

                var url = this.$api + "/alokasiPengambilanGas/update/" + this.editId;
                this.$http.put(url, newData)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.close();
                            this.readEvent();
                            this.resetForm();
                            this.color = "green";
                            this.snackbar = true;
                            this.inputType = "Tambah";
                            this.overlay = false;
                            this.error_message = response.data.message;
                            location.reload();
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

            //non aktif data alokasi
            deleteData() {
                this.overlay = true;
                var url = this.$api + "/alokasiPengambilanGas/delete/" + this.deleteId;
                this.$http.delete(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.close();
                            this.readEvent();
                            this.resetForm();
                            this.color = "green";
                            this.snackbar = true;
                            this.inputType = "Tambah";
                            this.overlay = false;
                            this.error_message = response.data.message;
                            location.reload();
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

            updateStatus() {
                this.overlay = true;
                let statusPersetujuan = '';

                if(this.dialogConfirmStatus === true)
                {
                    statusPersetujuan = 'A';
                }
                // else if(this.dialogReject === true)
                // {
                //   statusPersetujuan = 'D';
                // }

                if(statusPersetujuan !== '')
                {
                    let newData = {
                        SPPBEid_sppbe: this.form.SPPBEid_sppbe,
                        tanggal_pengambilan_gas: this.form.tanggal_pengambilan_gas,
                        jenis_alokasi_pengambilan_gas: this.form.jenis_alokasi_pengambilan_gas,
                        jumlah_alokasi_pengambilan_gas: this.form.jumlah_alokasi_pengambilan_gas,
                        status_alokasi_pengambilan_gas: statusPersetujuan,
                };

                var url = this.$api + "/alokasiPengambilanGas/updateStatus/" + this.editId;
                this.$http.put(url, newData)
                    .then((response) => {
                    if(response.data.code === 200)
                    {
                        this.close();
                        this.readEvent();
                        this.resetForm();
                        this.color = "green";
                        this.snackbar = true;
                        this.overlay = false;
                        this.error_message = response.data.message;
                        location.reload();
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
                }
            },

            editHandler(item) {
                this.readSPPBE();
                this.inputType = "Edit";
                this.form.nama_sppbe = item.nama_sppbe;
                this.form.SPPBEid_sppbe = item.SPPBEid_sppbe;
                this.editId = item.id_alokasi_pengambilan_gas;
                this.form.tanggal_pengambilan_gas = item.tanggal_pengambilan_gas;
                this.form.id_alokasi_pengambilan_gas = item.id_alokasi_pengambilan_gas;
                this.form.jenis_alokasi_pengambilan_gas = item.jenis_alokasi_pengambilan_gas;
                this.form.jumlah_alokasi_pengambilan_gas = item.jumlah_alokasi_pengambilan_gas;
                this.form.status_alokasi_pengambilan_gas = item.status_alokasi_pengambilan_gas;

                this.dialog = true;
            },

            deleteHandler(id) {
                this.deleteId = id;
                this.dialogConfirm = true;
            },

            close() {
                this.sppbe = [];
                this.resetForm();
                this.dialog = false;
                this.inputType = "Tambah";
            },

            resetForm() {
                this.form = {
                    nama_sppbe: null,
                    SPPBEid_sppbe: null,
                    tanggal_pengambilan_gas: null,
                    id_alokasi_pengambilan_gas: null,
                    jenis_alokasi_pengambilan_gas: null,
                    jumlah_alokasi_pengambilan_gas: null,
                    status_alokasi_pengambilan_gas: null,
                };
            },
        },

        mounted() {
            this.readSPPBE();
            this.readEvent();
            this.$refs.calendar.checkChange()
            localStorage.setItem("menu", "Kalender Alokasi Pengambilan Gas");
        },
    }
</script>

<style>
    .my-event-reguler {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 3px;
        background-color: #673AB7;
        color: #ffffff;
        border: 1px solid #673AB7;
        width: 100%;
        font-size: 12px;
        padding: 0px;
        cursor: pointer;
        margin-bottom: 2px;
        margin-top: 4px;
    }

    .my-event-fakultatif {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 3px;
        background-color: #b73a42;
        color: #ffffff;
        border: 1px solid #b73a42;
        width: 100%;
        font-size: 12px;
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

    .v-btn {
        letter-spacing: .020em;
    }

    .v-btn.v-size--small {
        font-size: .70rem;
        font-family: "Helvetica", Arial, sans-serif;
    }

    .v-text-field input {
        font-size: 12.5px;
    }

    .v-text-field .v-label {
        font-size: 14px;
    }

    .v-icon.v-icon.mdi-magnify {
        font-size: 22px;
    }

    .v-select__selection--comma {
        font-size: 12.5px;
    }

    .v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn {
        margin-left: 0px;
    }


    .v-dialog>.v-card>.v-card__title {
        padding: 16px 24px;
    }
</style>