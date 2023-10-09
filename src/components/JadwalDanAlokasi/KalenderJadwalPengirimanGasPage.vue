<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
        :items="items"
        divider="/"
        style="margin-left:-25px; margin-top:-25px"
        ></v-breadcrumbs>
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

        <v-icon small style="float:left;" color="#E91E63">mdi-square</v-icon>
        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi jadwal pengambilan gas</span>
        <br/>
        <v-icon small style="float:left;" color="#F9A825">mdi-square</v-icon>
        <span style="float:left; margin-left:3.5px; font-size:15px;">Alokasi jadwal pengiriman gas</span>
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
                                            :key="event.jumlah_alokasi"
                                            v-model="event.open"
                                            full-width
                                            offset-x
                                            min-width="300px"

                                            
                                        >
                                            <template v-slot:activator="{ on }">
                                                <div
                                                    style="width: 92.5%; text-align:left; padding-left:5px;background-color:#E91E63; color:#ffffff"
                                                    v-if="event.title=='pengambilan'"
                                                    v-ripple
                                                    class="my-event"
                                                    v-on="on"
                                                    v-html="event.jumlah_alokasi + ' tabung'"
                                                >
                                                </div>
                                                <div
                                                    style="width: 92.5%; text-align:left; padding-left:5px;background-color:#F9A825; color:#ffffff"
                                                    v-if="event.title=='pengiriman'"
                                                    v-ripple
                                                    class="my-event"
                                                    v-on="on"
                                                    v-html="event.jumlah_alokasi + ' tabung'"
                                                    @click="eventHandler(event)"
                                                >
                                                </div>
                                            </template>
                                            <v-dialog v-model="dialogData" persistent max-width="800px">
                                                <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                                                    <v-card-title>
                                                    <!-- <v-spacer></v-spacer> -->
                                                    <h3 style="font-size:20px; color:#ffffff">Detail Jadwal</h3>
                                                    <v-spacer></v-spacer>
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
                                                                            <thead color="#000000">
                                                                                <tr >
                                                                                <th style="font-size:15px;width:65%" class="text-center">
                                                                                    Driver
                                                                                </th>
                                                                                <th style="font-size:15px" class="text-center">
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
                                                                                    <!-- <v-btn height="30px" width="10px" style="font-size:10px" color="primary">tampil</v-btn> -->
                                                                                    <v-tooltip right>
                                                                                        <template v-slot:activator="{ on, attrs }">
                                                                                            <v-icon v-bind="attrs" v-on="on" small @click="pangkalanHandler(event.tanggal,driver)" color="primary">mdi-eye</v-icon>
                                                                                        </template>
                                                                                        <span>Lihat Pangkalan</span>
                                                                                    </v-tooltip>
                                                                                    <!-- <br/> -->
                                                                                    <!-- <v-icon small @click="deleteHandler(driver.id_driver_rutin_pangkalan)" color="error">mdi-delete</v-icon> -->
                                                                                </td>
                                                                                <td v-else>
                                                                                    <!-- <v-btn height="30px" width="10px" style="font-size:10px" color="primary">tampil</v-btn> -->
                                                                                    <v-tooltip right>
                                                                                        <template v-slot:activator="{ on, attrs }">
                                                                                            <v-icon v-bind="attrs" v-on="on" small @click="pangkalanHandler(event.tanggal,driver)" color="primary">mdi-eye</v-icon>
                                                                                        </template>
                                                                                        <span>Lihat Pangkalan</span>
                                                                                    </v-tooltip>
                                                                                    <!-- <br/> -->
                                                                                    <!-- <v-icon small @click="deleteHandler(driver.id_driver_rutin_pangkalan)" color="error">mdi-delete</v-icon> -->
                                                                                </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </template>
                                                                    </v-simple-table>
                                                                </v-card>
                                                            </v-col>
                                                            <v-divider vertical></v-divider>
                                                            <v-col cols="12" lg="6" md="8">
                                                                <span style="float:left">Tanggal: {{ event.tanggal }}</span>
                                                                <br/>
                                                                <v-card v-if="lihatPangkalan==true" fill-height class="flex-item mx-auto" elevation="5" style="margin-top: 2.5%;">
                                                                    <!-- <v-card-title class="text-right" style="display: inherit;">
                                                                        <v-text-field
                                                                        v-if="isWideScreen"
                                                                        v-model="search"
                                                                        append-icon="mdi-magnify"
                                                                        label="Cari"
                                                                        single-line
                                                                        hide-details
                                                                        style="margin-left: 75%; width: 25%;"
                                                                        >
                                                                        </v-text-field>
                                                                        <v-text-field
                                                                        v-else
                                                                        v-model="search"
                                                                        append-icon="mdi-magnify"
                                                                        label="Cari"
                                                                        single-line
                                                                        hide-details
                                                                        style="margin-left: 50%; width: 50%;"
                                                                        >
                                                                        </v-text-field>
                                                                    </v-card-title> -->

                                                                    <v-data-table
                                                                        :headers="headers"
                                                                        :items="pangkalanPerDriver"
                                                                        style="border-radius:4px"
                                                                    >
                                                                        <template v-slot:[`item.actions`]="{ item }">
                                                                        <v-menu offset-y style="float: left">
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                            <span v-bind="attrs" v-on="on" style="cursor: pointer">
                                                                                <v-icon small @click="editHandler(item)" color="primary">mdi-pencil</v-icon>
                                                                                    <!-- <br/> -->
                                                                                    <!-- <v-icon small @click="deleteHandler(item.id_jadwal_rutin_pangkalan)" color="error">mdi-delete</v-icon> -->
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
                                        </v-menu>
                                    </template>
                                </template>
                                
                            </v-calendar>
                        </v-sheet>
                    </v-flex>
            
                    
                </v-layout>
            </v-app>
        </div>

        <v-dialog v-model="dialoggg" persistent max-width="600px">
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
                    hide-default-footer
                    >
                        <!-- <template v-slot:header>
                            <v-toolbar
                            class="mb-2"
                            color="indigo darken-5"
                            dark
                            flat
                            >
                            <v-toolbar-title>This is a header</v-toolbar-title>
                            </v-toolbar>
                        </template> -->

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
                                            {{ item.tanggal_pengiriman_gas }}
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

                        <!-- <template v-slot:footer>
                            <v-toolbar
                            class="mt-2"
                            color="indigo"
                            dark
                            flat
                            >
                            <v-toolbar-title class="subheading">
                                This is a footer
                            </v-toolbar-title>
                            </v-toolbar>
                        </template> -->
                    </v-data-iterator>
                </v-container>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                <!-- <v-spacer></v-spacer> -->
                <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
                <v-spacer></v-spacer>
                <v-icon @click="dialogClose=true" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>
            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
                <v-card-text>
                <v-container style="padding-left: 5px; padding-right: 5px">
                    <v-text-field
                    disabled
                    :rules="tanggalRules"
                    type="date"
                    v-model="form.tanggal_pengiriman_gas"
                    label="Tanggal Pengiriman Gas"
                    ></v-text-field>
                    <v-text-field
                    v-if="formTitle=='Edit'"
                    disabled
                    v-model="form.total_alokasi_pengiriman_gas"
                    label="Total Alokasi"
                    ></v-text-field>
                    <v-text-field
                    v-if="formTitle=='Edit'"
                    disabled
                    v-model="form.alokasi_fakultatif_pengiriman_gas"
                    label="Alokasi Fakultatif"
                    ></v-text-field>
                    <v-select
                    v-if="formTitle=='Tambah'"
                    :rules="pangkalanRules"
                    v-model="form.pangkalan"
                    :items="pangkalan"
                    item-text="nama_pangkalan"
                    item-value="id_pangkalan"
                    label="Pangkalan"
                    required
                    ></v-select>
                    <v-select
                    v-else
                    disabled
                    :rules="pangkalanRules"
                    v-model="form.pangkalan"
                    :items="pangkalan"
                    item-text="nama_pangkalan"
                    item-value="id_pangkalan"
                    label="Pangkalan"
                    required
                    ></v-select>
                    <!-- <v-select
                    v-else
                    :rules="pangkalanRules"
                    v-model="form.pangkalan"
                    :items="jadwalPangkalanPerHari(form.tanggal_pengiriman_gas)"
                    item-text="nama_pangkalan"
                    item-value="id_jadwal_rutin_pangkalan"
                    label="Pangkalan"
                    required
                    ></v-select> -->
                    <v-select
                    :rules="driverRules"
                    v-model="form.driver"
                    :items="driver"
                    item-text="nama_driver"
                    item-value="id_driver"
                    label="Driver yang Bertugas"
                    required
                    ></v-select>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn v-if="this.inputType!='Tambah'" small color="error" dark style="float:right; margin-left:2%; margin-top: 3%;" @click="deleteHandler(editId)">Hapus</v-btn>
                        <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
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
            lihatPangkalan: false,
            checkDriver: "",
            text: 'Alokasi sudah terpenuhi semua!',
            start: new Date().toISOString().slice(0, 10),
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
                { text: "Total Alokasi", value: "total_alokasi_pengiriman_gas" },
                { text: "Alokasi Fakultatif", value: "alokasi_fakultatif_pengiriman_gas" },
                { text: "",  value:"actions"},
            ],
            form: {
                id_jadwal_pengiriman_gas: null,
                tanggal_pengiriman_gas: null,
                id_jadwal_rutin_pangkalan: null,
                id_pangkalan: null,
                nama_pangkalan: null,
                id_driver: null,
                nama_driver: null,
                total_alokasi_pengiriman_gas: null,
                alokasi_fakultatif_pengiriman_gas: null,
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
                tanggal_alokasi_pengambilan_gas: null,
                alokasi_pengambilan_gas: null,
                id_sppbe: null,
                nama_sppbe: null,
            },
            events: [
                // {
                //     alokasi_pengambilan_gas: 560,
                //     nama_sppbe: 'Going to the beach!',
                //     tanggal_alokasi_pengambilan_gas: new Date().toISOString().slice(0, 10),
                // },
                // {
                //     alokasi_pengambilan_gas: 1280,
                //     nama_sppbe: 'Going to the school!',
                //     tanggal_alokasi_pengambilan_gas: '2023-09-05',
                // },
            ],
            tempEvents: [],
            driverPerHari: [],
            pangkalanPerDriver: [],
            form_jadwal: {
                id_jadwal_pengiriman_gas: null,
                tanggal_pengiriman_gas: null,
                id_jadwal_rutin_pangkalan: null,
                id_pangkalan: null,
                nama_pangkalan: null,
                id_driver: null,
                nama_driver: null,
                total_alokasi_pengiriman_gas: null,
                alokasi_fakultatif_pengiriman_gas: null,
            },
            jadwal: [
                {
                    id_jadwal_pengiriman_gas: 1,
                    tanggal_pengiriman_gas: '2023-09-09',
                    id_jadwal_rutin_pangkalan: 1,
                    id_pangkalan: 1,
                    nama_pangkalan: "A",
                    id_driver: 1,
                    nama_driver: "A",
                    total_alokasi_pengiriman_gas: 20,
                    alokasi_fakultatif_pengiriman_gas: 0,
                },
                {
                    id_jadwal_pengiriman_gas: 2,
                    tanggal_pengiriman_gas: '2023-09-10',
                    id_jadwal_rutin_pangkalan: 2,
                    id_pangkalan: 2,
                    nama_pangkalan: "B",
                    id_driver: 2,
                    nama_driver: "B",
                    total_alokasi_pengiriman_gas: 25,
                    alokasi_fakultatif_pengiriman_gas: 5,
                },
                {
                    id_jadwal_pengiriman_gas: 3,
                    tanggal_pengiriman_gas: '2023-09-11',
                    id_jadwal_rutin_pangkalan: 3,
                    id_pangkalan: 3,
                    nama_pangkalan: "C",
                    id_driver: 3,
                    nama_driver: "C",
                    total_alokasi_pengiriman_gas: 20,
                    alokasi_fakultatif_pengiriman_gas: 10,
                },
                {
                    id_jadwal_pengiriman_gas: 4,
                    tanggal_pengiriman_gas: '2023-09-09',
                    id_jadwal_rutin_pangkalan: 4,
                    id_pangkalan: 4,
                    nama_pangkalan: "D",
                    id_driver: 4,
                    nama_driver: "D",
                    total_alokasi_pengiriman_gas: 21,
                    alokasi_fakultatif_pengiriman_gas: 0,
                },
                {
                    id_jadwal_pengiriman_gas: 5,
                    tanggal_pengiriman_gas: '2023-09-11',
                    id_jadwal_rutin_pangkalan: 5,
                    id_pangkalan: 5,
                    nama_pangkalan: "E",
                    id_driver: 5,
                    nama_driver: "E",
                    total_alokasi_pengiriman_gas: 20,
                    alokasi_fakultatif_pengiriman_gas: 10,
                },
            ],
            form_jadwalForEvent: {
                id_jadwal_pengiriman_gas: null,
                tanggal_pengiriman_gas: null,
                total_alokasi_pengiriman_gas: null,
            },
            jadwalForEvent: [
                {
                    id_jadwal_pengiriman_gas: 1,
                    tanggal_pengiriman_gas: '2023-09-09',
                    total_alokasi_pengiriman_gas: 20,
                },
                {
                    id_jadwal_pengiriman_gas: 2,
                    tanggal_pengiriman_gas: '2023-09-10',
                    total_alokasi_pengiriman_gas: 25,
                },
                {
                    id_jadwal_pengiriman_gas: 3,
                    tanggal_pengiriman_gas: '2023-09-11',
                    total_alokasi_pengiriman_gas: 20,
                },
                {
                    id_jadwal_pengiriman_gas: 4,
                    tanggal_pengiriman_gas: '2023-09-09',
                    total_alokasi_pengiriman_gas: 21,
                },
                {
                    id_jadwal_pengiriman_gas: 5,
                    tanggal_pengiriman_gas: '2023-09-11',
                    total_alokasi_pengiriman_gas: 20,
                },
            ],
            jadwalPengambilanGas: [
                {
                    id_jadwal_pengambilan_gas: 1,
                    alokasi_pengambilan_gas: 41,
                    tanggal_pengambilan_gas: '2023-09-09',
                },
                {
                    id_jadwal_pengambilan_gas: 2,
                    alokasi_pengambilan_gas: 50,
                    tanggal_pengambilan_gas: '2023-09-10',
                },
                {
                    id_jadwal_pengambilan_gas: 3,
                    alokasi_pengambilan_gas: 40,
                    tanggal_pengambilan_gas: '2023-09-11',
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
      viewDay ({ date }) {
        var sum = this.sumAlokasi(date);
        var alokasi = this.searchJadwalPengambilan(date);
        console.log("hai");
        console.log(sum);
        console.log(alokasi);
        this.resetForm();
        if(sum < alokasi)
        {
            this.form.tanggal_pengiriman_gas = date;
            this.dialog=true;
        }
        else if(sum!=0)
        {
            this.snackbarJadwal = true;
        }
      },
      searchJadwalPengambilan(date) {
        for (let i = 0; i < this.jadwalPengambilanGas.length; i++) {
            if(date === this.jadwalPengambilanGas[i].tanggal_pengambilan_gas) {
                console.log(this.jadwalPengambilanGas[i].alokasi_pengambilan_gas);
                return this.jadwalPengambilanGas[i].alokasi_pengambilan_gas;
            }
        }
        return 0;
      },
      sumAlokasi(date) {
        let sum = 0;

        for (let i = 0; i < this.jadwal.length; i++) {
            console.log(date);
            if(date === this.jadwal[i].tanggal_pengiriman_gas)
            {
                console.log(this.jadwal[i].total_alokasi_pengiriman_gas);
                sum = sum + this.jadwal[i].total_alokasi_pengiriman_gas;
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
                console.log(this.jadwal[i].alokasi_pengambilan_gas);
                sum = sum + this.jadwal[i].alokasi_pengambilan_gas;
                console.log(sum);
            }
        }
        return sum;
      },
      eventHandler(event) {
          this.driverPerHari=[];
          this.getDriver(event.tanggal);
          this.dialogData=true;
      },
      pangkalanHandler(date,driver) {
            console.log("pangkalan handler date", date);
            console.log("pangkalan handler driver", driver);
            this.pangkalanPerDriver = [];
            this.lihatPangkalan = true;
            this.checkDriver = driver;
            this.tampilPangkalan(date,driver);
      },
      getDriver(date) {
        // let driver;
        console.log("get driver 1",this.driverPerHari.length);
        for (let i = 0; i < this.jadwal.length; i++) {
            if(this.jadwal[i].tanggal_pengiriman_gas === date && this.searchDriver(this.jadwal[i].nama_driver)==0) {
                // driver.push(this.jadwal[i].nama_driver);
                console.log("get driver 2",i);
                // driver.nama_driver = this.jadwal[i].nama_driver;
                this.driverPerHari.push(this.jadwal[i].nama_driver);
                console.log("get driver 3",this.jadwal[i].nama_driver);
            }
        } 
        
        console.log("get driver 4",this.driverPerHari.length);
        console.log(this.driverPerHari[0]);
        console.log(this.driverPerHari[1]);
        // for (let i = 0; i < this.driverPerHari.length; i++) {
        //     console.log(this.driverPerHari[i].nama_driver)
        // }
        // return this.driverPerHari;
      },
      searchDriver(name) {
        console.log("search driver start",this.driverPerHari.length);
        for (let i = 0; i < this.driverPerHari.length; i++) {
            if(this.driverPerHari[i].nama_driver === name) {
                console.log("search driver 1");
                return 1;
            }
        }
        console.log("search driver 0");
        return 0;
      },
      tampilPangkalan(date, driver) {
          for (let i = 0; i < this.jadwal.length; i++) {
            if(this.jadwal[i].tanggal_pengiriman_gas === date && this.jadwal[i].nama_driver === driver) {
                this.pangkalanPerDriver.push(this.jadwal[i]);
            }
          } 
      },
      readEvent() {
        this.events = [];
        this.tempEvents = [];
        
        //jadwal pengambilan gas
        for (let i = 0; i < this.jadwalPengambilanGas.length; i++) {
            this.events.push({
                title: "pengambilan",
                tanggal: this.jadwalPengambilanGas[i].tanggal_pengambilan_gas,
                jumlah_alokasi: this.jadwalPengambilanGas[i].alokasi_pengambilan_gas,
            });
            console.log("events pengambilan", this.events[i].tanggal);
        }
        //jadwal pengiriman gas
        console.log("jadwal length ",this.jadwal.length);
        for (let i = 0; i < this.jadwal.length; i++) {
            
            if(i==0 || this.searchDate(this.jadwal[i].tanggal_pengiriman_gas) == null)
            {
                this.tempEvents.push(this.jadwal[i]);
                console.log("i",i);
                console.log("search date",this.tempEvents[i].tanggal_pengiriman_gas);
            }
            else
            {
                this.tempEvents[this.searchDate(this.jadwal[i].tanggal_pengiriman_gas)].total_alokasi_pengiriman_gas = this.tempEvents[this.searchDate(this.jadwal[i].tanggal_pengiriman_gas)].total_alokasi_pengiriman_gas + this.jadwal[i].total_alokasi_pengiriman_gas;
                console.log("i",i);
            console.log("search date",this.searchDate(this.jadwal[i].tanggal_pengiriman_gas));
            }
        }
        for (let i = 0; i < this.tempEvents.length; i++) {
            this.events.push({
                title: "pengiriman",
                tanggal: this.tempEvents[i].tanggal_pengiriman_gas,
                jumlah_alokasi: this.tempEvents[i].total_alokasi_pengiriman_gas,
            });
            console.log("events pengiriman", this.events[i].tanggal);
        }

        // this.events = [];
        // for (let i = 0; i < this.jadwal.length; i++) {
        //     if(i==0 || this.searchDate(this.jadwal[i].tanggal_pengiriman_gas) == null)
        //     {
        //         this.events.push(this.jadwal[i]);
        //         // console.log(this.events[i].tanggal_pengiriman_gas);
        //         // console.log(this.events[i].total_alokasi_pengiriman_gas);
        //     }
        //     else
        //     {
        //         this.events[this.searchDate(this.jadwal[i].tanggal_pengiriman_gas)].total_alokasi_pengiriman_gas = this.events[this.searchDate(this.jadwal[i].tanggal_pengiriman_gas)].total_alokasi_pengiriman_gas + this.jadwal[i].total_alokasi_pengiriman_gas;
        //         console.log(this.events[this.searchDate(this.jadwal[i].tanggal_pengiriman_gas)].tanggal_pengiriman_gas);
        //         console.log(this.events[this.searchDate(this.jadwal[i].tanggal_pengiriman_gas)].total_alokasi_pengiriman_gas);
        //     }
        // }
      },
      searchDate(date) {
          for (let i = 0; i < this.tempEvents.length; i++)
          {
              if(this.tempEvents[i].tanggal_pengiriman_gas === date)
              {
                  return i;
              }
          }
          return null;
      },
      //jadwal full atribut
      readJadwal() {
        var url = this.$api + "/jadwalPengambilanGasRead/";
        this.$http.get(url).then((response) => {
            // this.role = response.data.data;
            let temp = response.data.data;
            this.form_jadwal.id_jadwal_pengiriman_gas = temp.map((v) => v.id_jadwal_pengiriman_gas);
            this.form_jadwal.tanggal_pengiriman_gas = temp.map((v) => v.tanggal_pengiriman_gas);
            this.form_jadwal.total_alokasi_pengiriman_gas = 0;
            this.form.id_jadwal_rutin_pangkalan = temp.map((v) => v.id_jadwal_rutin_pangkalan );
            this.form_jadwal.nama_pangkalan = temp.map((v) => v.nama_pangkalan);
            this.form_jadwal.id_pangkalan = temp.map((v) => v.id_pangkalan);
            this.form_jadwal.nama_driver = temp.map((v) => v.nama_driver);
            this.form_jadwal.id_driver = temp.map((v) => v.id_driver);
            this.form.alokasi_fakultatif_pengiriman_gas = temp.map((v) => v.alokasi_tambahan);
            this.form.alokasi_reguler_pengiriman_gas = temp.map((v) => v.alokasi_penerimaan_gas);
            for (let i = 0; i < this.form_jadwal.length; i++) {
                this.jadwal.push(this.form_jadwal[i]);
                this.jadwal[i].total_alokasi_pengiriman_gas = this.jadwal[i].alokasi_penerimaan_gas + this.jadwal[i].alokasi_fakultatif_pengiriman_gas;
            }
        });
      },
      //jadwal atribut tanggal & alokasi
      readJadwalForEvent() {
        var url = this.$api + "/jadwalPengambilanGasForEventRead/";
        this.$http.get(url).then((response) => {
            // this.role = response.data.data;
            let temp = response.data.data;
            this.form_jadwalForEvent.id_jadwal_pengiriman_gas = temp.map((v) => v.id_jadwal_pengiriman_gas);
            this.form_jadwalForEvent.tanggal_pengiriman_gas = temp.map((v) => v.tanggal_pengiriman_gas);
            this.form_jadwalForEvent.total_alokasi_pengiriman_gas = temp.map((v) => v.total_alokasi_pengiriman_gas);
            for (let i = 0; i < this.form_jadwalForEvent.length; i++) {
                this.jadwalForEvent.push(this.form_jadwalForEvent[i]);
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
                if(date === this.jadwal[i].tanggal_pengiriman_gas)
                {
                    console.log(this.jadwal[i].tanggal_pengiriman_gas);
                    this.jadwalPerTanggal.push(this.jadwal[i]);
                    console.log(date);
                    // this.jadwalPerTanggal.id_jadwal_pengambilan_gas.push(this.jadwal[i].id_jadwal_pengambilan_gas);
                    // console.log(date);
                    // this.jadwalPerTanggal.tanggal_pengambilan_gas.push(this.jadwal[i].tanggal_pengambilan_gas);
                    // this.jadwalPerTanggal.alokasi_pengambilan_gas.push(this.jadwal[i].alokasi_pengambilan_gas);
                    // this.jadwalPerTanggal.nama_sppbe.push(this.jadwal[i].nama_sppbe);
                    // this.jadwalPerTanggal.id_sppbe.push(this.jadwal[i].id_sppbe);
                    // this.jadwalPerTanggal.nama_driver.push(this.jadwal[i].nama_driver);
                    // this.jadwalPerTanggal.id_driver.push(this.jadwal[i].id_driver);
                    // console.log(this.jadwalPerTanggal[i].id_jadwal_pengambilan_gas);

                }
            }
            console.log(this.jadwalPerTanggal[0].id_jadwal_pengambilan_gas)
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
      lihatDetail(date) {
          this.listJadwal(date);
          this.dialogData = true;
      },
      save() {
      this.jadwal.append("tanggal_pengambilan_gas", this.form.tanggal_pengiriman_gas);
      this.jadwal.append("id_sppbe", this.id_sppbe);
      this.jadwal.append("id_driver", this.id_driver);
      this.jadwal.append("alokasi_pengambilan_gas", this.form.alokasi_pengambilan_gas);
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
        tanggal_pengiriman_gas: this.form.tanggal_pengiriman_gas,
        alokasi_pengambilan_gas: this.form.alokasi_pengambilan_gas,
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
          this.closeKalender();
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
        this.editId = item.id_jadwal_pengiriman_gas;
        this.form.id_jadwal_pengambilan_gas = item.id_jadwal_pengambilan_gas;
        this.form.tanggal_pengiriman_gas = item.tanggal_pengiriman_gas;
        this.form.id_sppbe = item.id_sppbe,
        this.form.nama_sppbe = item.nama_sppbe,
        this.form.id_driver = item.id_driver,
        this.form.nama_driver = item.nama_driver,
        this.form.total_alokasi_pengambilan_gas = item.total_alokasi_pengambilan_gas,
        this.form.alokasi_fakultatif_pengambilan_gas = item.alokasi_fakultatif_pengambilan_gas,


        // this.dialogData= false;
        this.dialog = true;
    },
    deleteHandler(id) {
      if(this.searchDate(this.form.tanggal_alokasi_pengambilan_gas)!=1)
      {
        this.deleteId = id;
        this.dialogConfirm = true;
      }

    },
    closeKalender() {
        this.dialog = false;
        this.dialogData = true;
        this.dialogClose = false;
        this.resetForm();
        this.inputType = "Tambah";
    },
    close() {
        this.inputType = "Tambah";
        this.dialog = false;
        this.dialogConfirm = false;
        this.dialogData = false;
        this.lihatPangkalan = false;
        this.checkDriver = "";
        this.pangkalanPerDriver = [];
        this.resetForm();
        location.reload(true);
    },
      resetForm() {
      this.form = {
        id_jadwal_pengiriman_gas: null,
        tanggal_pengiriman_gas: null,
        id_pangkalan: null,
        nama_pangkalan: null,
        id_driver: null,
        nama_driver: null,
        total_alokasi_pengambilan_gas: null,
        alokasi_reguler_pengambilan_gas: null,
      };
    },
    },
    mounted() {
    this.$refs.calendar.checkChange()
    localStorage.setItem("menu", "Kalender Jadwal Pengiriman Gas");
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
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
    
    .theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr>th {
        background-color:#546E7A;
        color:#ffffff
    }
</style>