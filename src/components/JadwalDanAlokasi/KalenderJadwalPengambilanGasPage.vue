<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
        :items="items"
        divider="/"
        style="margin-left:-25px; margin-top:-25px"
        ></v-breadcrumbs>
        <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data kendaraan</h5> -->
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Jadwal Pengambilan Gas</h3>
        </div>
        <div v-else-if="isMediumScreen" style="margin-bottom: 10.5%">
            <h3 style="float:left">Jadwal Pengambilan Gas</h3>
        </div>
        <div v-else style="margin-bottom: 12.5%">
            <h3 style="float:left">Jadwal Pengambilan Gas</h3>
        </div>

        <v-icon small style="float:left;" color="#673AB7">mdi-square</v-icon>
        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi pengambilan gas</span>
        <br/>
        <v-icon small style="float:left;" color="#E91E63">mdi-square</v-icon>
        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi yang terpenuhi</span>
        <br/><br/>

        <div id="app" style="margin-top:-20px">
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
                                                    style="width: 92.5%; text-align:left; padding-left:5px;background-color:#673AB7; color:#ffffff"
                                                    v-if="event.title=='alokasi'"
                                                    v-ripple
                                                    class="my-event"
                                                    v-on="on"
                                                    v-html="event.jumlah_alokasi_pengambilan_gas + ' tabung'"
                                                >
                                                </div>
                                                <div
                                                    style="width: 92.5%; text-align:left; padding-left:5px;background-color:#E91E63; color:#ffffff"
                                                    v-if="event.title=='jadwal'"
                                                    v-ripple
                                                    class="my-event"
                                                    v-on="on"
                                                    v-html="event.jumlah_alokasi_pengambilan_gas + ' tabung'"
                                                    @click="lihatDetail(event)"
                                                >
                                                </div>
                                            </template>
                                            <v-dialog v-model="dialogData" persistent max-width="600px">
                                                <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                                                    <v-card-title>
                                                    <!-- <v-spacer></v-spacer> -->
                                                    <h3 style="font-size:20px; color:#ffffff">Detail Jadwal</h3>
                                                    <v-spacer></v-spacer>
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
                                                                    lg="3"
                                                                >
                                                                    <v-card>
                                                                    <v-card-title style="width:150px" class="subheading font-weight-bold">
                                                                        {{ item.nama_driver }} 
                                                                        <!-- <v-spacer></v-spacer> -->
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

                                                                    <v-divider></v-divider>

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

                                                                <v-spacer></v-spacer>

                                                                <span
                                                                    class="mr-1
                                                                    grey--text"
                                                                    style="font-size:15px"
                                                                >
                                                                    Halaman {{ page }} dari {{ numberOfPages }}
                                                                </span>
                                                                <!-- <v-icon
                                                                    dark
                                                                    color="blue darken-3"
                                                                    class="mr-1"
                                                                    @click="formerPage"
                                                                    small
                                                                >
                                                                    mdi-chevron-left
                                                                </v-icon>
                                                                <v-icon
                                                                    dark
                                                                    color="blue darken-3"
                                                                    class="mr-1"
                                                                    @click="formerPage"
                                                                    small
                                                                >
                                                                    mdi-chevron-right
                                                                </v-icon> -->
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
                    </v-flex>
            
                    
                </v-layout>
            </v-app>
        </div>

        <!-- <v-dialog v-model="dialogData" persistent max-width="600px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                <h3 style="font-size:20px; color:#ffffff">Detail Jadwal</h3>
                <v-spacer></v-spacer>
                <v-icon @click="close()" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>
            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
                <v-container fluid>
                    <v-data-iterator
                    :items="jadwalPerTanggal"
                    :items-per-page.sync="itemsPerPage"
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
                                lg="3"
                            >
                                <v-card>
                                <v-card-title style="width:150px" class="subheading font-weight-bold">
                                    {{ item.nama_driver }} 
                                    <v-tooltip right>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            icon
                                            @click="editHandler(item)"
                                            style="float: right"
                                            >
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Ubah</span>
                                    </v-tooltip>
                                </v-card-title>

                                <v-divider></v-divider>

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
                    </v-data-iterator>
                </v-container>
            </v-card>
        </v-dialog> -->

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                <!-- <v-spacer></v-spacer> -->
                <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
                <v-spacer></v-spacer>
                <v-icon @click="closeHandler" link>mdi-close</v-icon>
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
                    <v-select
                        style="padding-top:0"
                        :rules="SPPBERules"
                        v-model="form.id_sppbe"
                        :items="sppbe"
                        item-text="nama_sppbe"
                        item-value="id_sppbe"
                        label="SPPBE"
                        required
                    ></v-select>
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
                    ></v-select>
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
                    ></v-select>
                    <span v-if="form.tanggal_pengambilan_gas!=null&&form.id_sppbe!=null" style="float:left; margin-top:-20px;">sisa alokasi: {{ searchAlokasi(form.tanggal_pengambilan_gas,form.id_sppbe) - sumAlokasiWithout(form.tanggal_pengambilan_gas,form.id_jadwal_pengambilan_gas) - form.jumlah_alokasi_pengambilan_gas }} tabung</span>
                    <!-- <br v-if="form.tanggal_pengambilan_gas!=null&&form.id_sppbe!=null"> -->
                    <v-select
                        v-if="form.tanggal_pengambilan_gas!=null&&form.id_sppbe!=null"
                        style="padding-top:17px"
                        :rules="driverRules"
                        v-model="form.driver"
                        :items="driver"
                        item-text="nama_driver"
                        item-value="id_driver"
                        label="Driver yang Bertugas"
                        required
                    ></v-select>
                    <v-select
                        v-else
                        style="padding-top:0"
                        :rules="driverRules"
                        v-model="form.driver"
                        :items="driver"
                        item-text="nama_driver"
                        item-value="id_driver"
                        label="Driver yang Bertugas"
                        required
                    ></v-select>
                    <!-- <v-text-field
                        style="padding-top:0"
                        v-if="formTitle=='Edit'"
                        disabled
                        v-model="form.alokasi_fakultatif_pengambilan_gas"
                        label="Alokasi Fakultatif"
                    ></v-text-field> -->
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn small color="primary" dark style="float:right; margin-top: 2%;margin-left:2%" @click="save">Simpan</v-btn>
                        <v-btn v-if="this.inputType!='Tambah'" small color="error" dark style="float:right; ; margin-top: 2%;" @click="deleteHandler(editId)">Hapus</v-btn>
                        
                        <v-spacer></v-spacer>
                    </v-card-action>
                </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                <span class="headline"></span>
                </v-card-title>
                <v-card-text> Anda Yakin ingin menghapus data ini? </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
                    <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false"
                        >Batal</v-btn
                    >
                </v-card-action>
                <v-card-text></v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogClose" persistent max-width="400px">
            <v-card>
                <v-card-title>
                <span class="headline"></span>
                </v-card-title>
                <v-card-text> Buang perubahan? </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn small style="font-size:12px" color="#E53935" text @click="closeKalender">Buang</v-btn>
                    <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogClose=false"
                        >Batal</v-btn
                    >
                </v-card-action>
                <v-card-text></v-card-text>
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

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
            >{{ error_message }}
        </v-snackbar>
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
            isWideScreen: window.innerWidth >= 1000,
            isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
            inputType: "Tambah",
            lihat: false,
            tempTitle: "",
            type: 'month',
            dialog: false,
            dialogConfirm: false,
            dialogData: false,
            dialogClose: false,
            snackbarJadwal: false,
            vertical: true,
            text: 'Alokasi sudah terpenuhi semua!',
            start: new Date().toISOString().slice(0, 10),
            itemsPerPageArray: [2,4, 8, 12],
            page: 1,
            itemsPerPage: 2,
            items: [
                { 
                    text: "Dashboard",
                    disabled: false,
                    href: '/dashboard-page',
                },
                // { 
                //     text: "Jadwal Pengambilan Gas",
                //     disabled: false,
                //     href: '/jadwal-pengambilan-gas-page',
                // },
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
                id_driver: null,
                nama_driver: null,
                jumlah_alokasi_pengambilan_gas: null,
                alokasi_fakultatif_pengambilan_gas: null,
            },
            form_sppbe: {
                id_sppbe: null,
                nama_sppbe: null,
            },
            sppbe: [],
            form_driver: {
                id_driver: null,
                nama_driver: null,
            },
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
            form_event: {
                id_alokasi_pengambilan_gas: null,
                tanggal_pengambilan_gas: null,
                jumlah_alokasi_pengambilan_gas: null,
                id_sppbe: null,
                nama_sppbe: null,
            },
            events: [],
            tempEvents: [],
            form_alokasi: {
                id_alokasi_pengambilan_gas: null,
                id_sppbe: null,
                nama_sppbe: null,
                tanggal_pengambilan_gas: null,
                alokasi_reguler_pengambilan_gas: null,
                alokasi_fakultatif_pengambilan_gas: null,
            },
            jadwalAlokasi: [
                {
                    jumlah_alokasi_pengambilan_gas: 560,
                    id_sppbe: 1,
                    nama_sppbe: 'Going to the beach!',
                    tanggal_pengambilan_gas: new Date().toISOString().slice(0, 10),
                },
                {
                    jumlah_alokasi_pengambilan_gas: 1280,
                    id_sppbe: 1,
                    nama_sppbe: 'Going to the beach!',
                    tanggal_pengambilan_gas: '2023-09-05',
                },
                {
                    jumlah_alokasi_pengambilan_gas: 1280,
                    id_sppbe: 2,
                    nama_sppbe: 'Going to the school!',
                    tanggal_pengambilan_gas: '2023-09-23',
                },
            ],
            form_jadwal: {
                id_jadwal_pengambilan_gas: null,
                tanggal_pengambilan_gas: null,
                jumlah_alokasi_pengambilan_gas: null,
                id_sppbe: null,
                nama_sppbe: null,
                id_driver: null,
                nama_driver: null,
                alokasi_fakultatif_pengambilan_gas: null,
            },
            jadwal: [
                {
                    id_jadwal_pengambilan_gas: 1,
                    id_sppbe: 1,
                    id_driver: 1,
                    jumlah_alokasi_pengambilan_gas: 560,
                    nama_sppbe: 'Going to the beach!',
                    tanggal_pengambilan_gas: new Date().toISOString().slice(0, 10),
                    nama_driver: 'Ryan',
                    alokasi_fakultatif_pengambilan_gas: 0,
                },
                {
                    id_jadwal_pengambilan_gas: 2,
                    id_sppbe: 1,
                    id_driver: 2,
                    jumlah_alokasi_pengambilan_gas: 360,
                    nama_sppbe: 'Going to the beach!',
                    tanggal_pengambilan_gas: '2023-09-05',
                    nama_driver: 'Vista',
                    alokasi_fakultatif_pengambilan_gas: 0,
                },
                {
                    id_jadwal_pengambilan_gas: 3,
                    id_sppbe: 2,
                    id_driver: 3,
                    jumlah_alokasi_pengambilan_gas: 560,
                    nama_sppbe: 'Going to the school!',
                    tanggal_pengambilan_gas: '2023-09-05',
                    nama_driver: 'Mama',
                    alokasi_fakultatif_pengambilan_gas: 0,
                },
                // {
                //     id_jadwal_pengambilan_gas: 4,
                //     id_sppbe: '2',
                //     id_driver: '4',
                //     jumlah_alokasi_pengambilan_gas: 360,
                //     nama_sppbe: 'Going to the school!',
                //     tanggal_pengambilan_gas: '2023-09-05',
                //     nama_driver: 'Papa',
                //     alokasi_fakultatif_pengambilan_gas: 0,
                // },
            ],
            form_jadwalForEvent: {
                id_jadwal_pengambilan_gas: null,
                tanggal_pengambilan_gas: null,
                jumlah_alokasi_pengambilan_gas: null,
            },
            jadwalForEvent: [
                {
                    id_jadwal_pengambilan_gas: 1,
                    jumlah_alokasi_pengambilan_gas: 560,
                    tanggal_pengambilan_gas: new Date().toISOString().slice(0, 10),
                },
                {
                    id_jadwal_pengambilan_gas: 2,
                    jumlah_alokasi_pengambilan_gas: 360,
                    tanggal_pengambilan_gas: '2023-09-05',
                },
                {
                    id_jadwal_pengambilan_gas: 3,
                    jumlah_alokasi_pengambilan_gas: 560,
                    tanggal_pengambilan_gas: '2023-09-05',
                },
            ],
            jadwalPerTanggal: [],
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
            console.log("hai");
            console.log(sum);
            console.log(alokasi);
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
                        console.log(this.jadwalAlokasi[i].jumlah_alokasi_pengambilan_gas);
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
                console.log(date);
                if(date === this.jadwal[i].tanggal_pengambilan_gas)
                {
                    console.log(this.jadwal[i].jumlah_alokasi_pengambilan_gas);
                    sum = sum + this.jadwal[i].jumlah_alokasi_pengambilan_gas;
                    console.log(sum);
                }
            }
            return sum;
        },
        sumAlokasiWithout(date,id) {
            let sum = 0;
            console.log("sumalokasiwithout");
            console.log(id);
            for (let i = 0; i < this.jadwal.length; i++) {
                console.log(this.jadwal[i].id_jadwal_pengambilan_gas);
                if(date === this.jadwal[i].tanggal_pengambilan_gas && 
                this.jadwal[i].id_jadwal_pengambilan_gas !== id)
                {
                    console.log(this.jadwal[i].jumlah_alokasi_pengambilan_gas);
                    sum = sum + this.jadwal[i].jumlah_alokasi_pengambilan_gas;
                    console.log(sum);
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
        readAlokasi() {
            var url = this.$api + "/alokasiRead";
            this.$http.get(url).then((response) => {
                // this.role = response.data.data;
                let temp = response.data.data;
                this.form_alokasi.id_alokasi_pengambilan_gas = temp.map((v) => v.id_alokasi_pengambilan_gas);
                this.form_alokasi.id_sppbe = temp.map((v) => v.id_sppbe);
                this.form_alokasi.nama_sppbe = temp.map((v) => v.nama_sppbe);
                this.form_alokasi.tanggal_pengambilan_gas = temp.map((v) => v.tanggal_pengambilan_gas);
                this.form_alokasi.alokasi_reguler_pengambilan_gas = temp.map((v) => v.alokasi_reguler_pengambilan_gas);
                this.form_alokasi.alokasi_fakultatif_pengambilan_gas = temp.map((v) => v.alokasi_fakultatif_pengambilan_gas);
                for (let i = 0; i < this.form_sppbe.nama_sppbe.length; i++) {
                this.sppbe.id_sppbe.push(this.form_sppbe.id_sppbe[i]);
                this.sppbe.nama_sppbe.push(this.form_sppbe.nama_sppbe[i]);
                }
            });
        },
        readEvent() {
            this.events = [];
            this.tempEvents = [];
            
            //alokasi
            for (let i = 0; i < this.jadwalAlokasi.length; i++) {
                // this.events.push({
                //     title: "alokasi",
                //     tanggal_pengambilan_gas: this.jadwalAlokasi[i].tanggal_pengambilan_gas,
                //     jumlah_alokasi_pengambilan_gas: this.jadwalAlokasi[i].jumlah_alokasi_pengambilan_gas,
                // });
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
        closeHandler(){
            if(this.inputType == 'Edit')
            {
                this.dialogClose = true;
            }
            else
            {
                this.close();
            }
        },
        getEventColor (event) {
            return event.color;
        },
        //jadwal full atribut
        readJadwal() {
            var url = this.$api + "/jadwalPengambilanGasRead/";
            this.$http.get(url).then((response) => {
                // this.role = response.data.data;
                let temp = response.data.data;
                this.form_jadwal.id_jadwal_pengambilan_gas = temp.map((v) => v.id_jadwal_pengambilan_gas);
                this.form_jadwal.tanggal_pengambilan_gas = temp.map((v) => v.tanggal_pengambilan_gas);
                this.form_jadwal.jumlah_alokasi_pengambilan_gas = temp.map((v) => v.jumlah_alokasi_pengambilan_gas);
                this.form_jadwal.nama_sppbe = temp.map((v) => v.nama_sppbe);
                this.form_jadwal.id_sppbe = temp.map((v) => v.id_sppbe);
                this.form_jadwal.nama_driver = temp.map((v) => v.nama_driver);
                this.form_jadwal.id_driver = temp.map((v) => v.id_driver);
                for (let i = 0; i < this.form_jadwal.length; i++) {
                    this.jadwal.push(this.form_jadwal[i]);
                }
            });
        },
        //jadwal tanggal dan alokasi
        readJadwalForEvent() {
            var url = this.$api + "/jadwalPengambilanGasForEventRead/";
            this.$http.get(url).then((response) => {
                // this.role = response.data.data;
                let temp = response.data.data;
                this.form_jadwalForEvent.id_jadwal_pengambilan_gas = temp.map((v) => v.id_jadwal_pengambilan_gas);
                this.form_jadwalForEvent.tanggal_pengambilan_gas = temp.map((v) => v.tanggal_pengambilan_gas);
                this.form_jadwalForEvent.jumlah_alokasi_pengambilan_gas = temp.map((v) => v.jumlah_alokasi_pengambilan_gas);
                for (let i = 0; i < this.form_jadwal.length; i++) {
                    this.jadwalForEvent.push(this.form_jadwal[i]);
                }
            });
        },
        listJadwal(date) {
                console.log(date);
                console.log(this.jadwal.length);
                if(this.jadwalPerTanggal.length!=0)
                    this.jadwalPerTanggal = [];
                for (let i = 0; i < this.jadwal.length; i++) {
                    console.log(date);
                    if(date === this.jadwal[i].tanggal_pengambilan_gas)
                    {
                        console.log(this.jadwal[i].tanggal_pengambilan_gas);
                        this.jadwalPerTanggal.push(this.jadwal[i]);
                        console.log(date);
                        // this.jadwalPerTanggal.id_jadwal_pengambilan_gas.push(this.jadwal[i].id_jadwal_pengambilan_gas);
                        // console.log(date);
                        // this.jadwalPerTanggal.tanggal_pengambilan_gas.push(this.jadwal[i].tanggal_pengambilan_gas);
                        // this.jadwalPerTanggal.jumlah_alokasi_pengambilan_gas.push(this.jadwal[i].jumlah_alokasi_pengambilan_gas);
                        // this.jadwalPerTanggal.nama_sppbe.push(this.jadwal[i].nama_sppbe);
                        // this.jadwalPerTanggal.id_sppbe.push(this.jadwal[i].id_sppbe);
                        // this.jadwalPerTanggal.nama_driver.push(this.jadwal[i].nama_driver);
                        // this.jadwalPerTanggal.id_driver.push(this.jadwal[i].id_driver);
                        // console.log(this.jadwalPerTanggal[i].id_jadwal_pengambilan_gas);

                    }
                }
                console.log(this.jadwalPerTanggal[0].id_jadwal_pengambilan_gas)
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
            var url = this.$api + "/sppbeRead";
            this.$http.get(url).then((response) => {
                // this.role = response.data.data;
                let temp = response.data.data;
                this.form_sppbe.id_sppbe = temp.map((v) => v.id_sppbe);
                this.form_sppbe.nama_sppbe = temp.map((v) => v.nama_sppbe);
                for (let i = 0; i < this.form_sppbe.length; i++) {
                    this.sppbe.push(this.form_sppbe[i]);
                }
            });
        },
        lihatDetail(event) {
            this.listJadwal(event.tanggal_pengambilan_gas);
            this.dialogData = true;
        },
        save() {
        this.jadwal.append("tanggal_pengambilan_gas", this.form.tanggal_pengambilan_gas);
        this.jadwal.append("id_sppbe", this.id_sppbe);
        this.jadwal.append("id_driver", this.id_driver);
        this.jadwal.append("jumlah_alokasi_pengambilan_gas", this.form.jumlah_alokasi_pengambilan_gas);
        this.jadwal.append("alokasi_fakultatif_pengambilan_gas", 0);

        var url = this.$api + "/jadwalPengambilanGas/";
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
        var url = this.$api + "/jadwalPengambilanGasTemp";
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
            id_driver: this.form.id_driver,
            tanggal_pengambilan_gas: this.form.tanggal_pengambilan_gas,
            jumlah_alokasi_pengambilan_gas: this.form.jumlah_alokasi_pengambilan_gas,
        };

        var url = this.$api + "/jadwalPengambilanGas/" + this.editId;
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
        var url = this.$api + "/jadwalPengambilanGasDelete/" + this.deleteId;
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
            this.editId = item.id_jadwal_pengambilan_gas;
            this.form.id_jadwal_pengambilan_gas = item.id_jadwal_pengambilan_gas;
            this.form.tanggal_pengambilan_gas = item.tanggal_pengambilan_gas;
            this.form.id_sppbe = item.id_sppbe,
            this.form.nama_sppbe = item.nama_sppbe,
            this.form.id_driver = item.id_driver,
            this.form.nama_driver = item.nama_driver,
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
            this.readDataRemove();
            this.resetForm();
            // this.window.location.href=window.location.href;
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
                id_driver: null,
                nama_driver: null,
                jumlah_alokasi_pengambilan_gas: null,
                alokasi_fakultatif_pengambilan_gas: null,
            };
        },
    },
    mounted() {
    this.$refs.calendar.checkChange()
    localStorage.setItem("menu", "Kalender Jadwal Pengambilan Gas");
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    // this.readAlokasi();
    this.readEvent();
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