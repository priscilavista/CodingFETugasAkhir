<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
        :items="items"
        divider="/"
        style="margin-left:-25px; margin-top:-25px"
        ></v-breadcrumbs>
        <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data transaksi</h5> -->
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
        <h3 style="float:left">Surat Kuasa Pengambilan Gas</h3>
        <v-spacer></v-spacer>
        </div>
        <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
        <h3 style="float:left">Surat Kuasa Pengambilan Gas</h3>
        <v-spacer></v-spacer>
        </div>
        <div v-else style="margin-bottom: 17.5%">
        <h3 style="float:left">Surat Kuasa Pengambilan Gas</h3>
        <v-spacer></v-spacer>
        </div>

        <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
            <v-card-title>
                <!-- <v-spacer></v-spacer> -->
                <h3 style="font-size:20px; color:#ffffff">Isilah data di bawah ini:</h3>
            </v-card-title>
            </v-card>
            <v-card style="border-radius: 0px 0px 4px 4px;width:350px;height:">
            <v-card-text>
                <!-- <v-container v-if="isWideScreen" style="padding-left: 5px; padding-right: 5px; padding-bottom:30px">
                <v-row style="margin-top:-30px">
                    <v-col 
                    cols="12"
                    md="7">
                        <v-select
                            v-model="form.id_sppbe"
                            :items="sppbe"
                            item-text="nama_sppbe"
                            item-value="id_sppbe"
                            label="SPPBE"
                        ></v-select>
                    </v-col>
                    <v-col
                    cols="6"
                    md="5">
                        <v-text-field
                            v-model="form_filter.tahun_transaksi"
                            label="Tahun"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-select
                    v-model="form_filter.pangkalan_transaksi"
                    :items="pangkalan"
                    item-text="nama_pangkalan"
                    item-value="id_pangkalan"
                    label="Pangkalan"
                    style="margin-top:-25px"
                ></v-select>
                
                <v-btn small color="primary" dark style="float:left;" >Filter</v-btn>
                </v-container> -->
                <v-container style="padding-left: 5px; padding-right: 5px; padding-bottom:47.5px">
                    <v-text-field
                        :rules="tanggalRules"
                        type="date"
                        v-model="form.tanggal_pengambilan_gas"
                        label="Tanggal Pengambilan Gas"
                        style="margin-top:-5px"
                    ></v-text-field>
                    <v-select
                        v-model="form.nama_sppbe"
                        :items="sppbe"
                        item-text="nama_sppbe"
                        item-value="nama_sppbe"
                        label="SPPBE"
                        style="margin-top:-10px"
                    ></v-select>
                    <v-text-field
                        v-model="form.nomor_armada"
                        label="Nomor Armada"
                        style="margin-top:-10px"
                    ></v-text-field>
                    <v-select
                        v-model="form.nama_driver"
                        :items="driver"
                        item-text="nama_driver"
                        item-value="nama_driver"
                        label="Driver"
                        style="margin-top:-10px"
                    ></v-select>
                    <v-select
                        v-model="form.kuantitas_tabung"
                        :items="alokasi"
                        item-text="jumlah_alokasi"
                        item-value="jumlah_alokasi"
                        label="Kuantitas tabung yang diambil"
                        style="margin-top:-10px"
                    ></v-select>
                    
                    <v-btn small @click="dialog=true" color="primary" dark style="float:left;margin-top:10px">Proses</v-btn>
                </v-container>
            </v-card-text>
        
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                <!-- <v-spacer></v-spacer> -->
                <h3 style="font-size:20px; color:#ffffff">Pratinjau</h3>
                <v-spacer></v-spacer>
                <v-icon @click="close()" color="#ffffff" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>
            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%;overflow-x: hidden">
                <v-spacer></v-spacer>
                <v-btn small color="primary" dark style="float:right; margin-top: 3%;margin-right:3%" @click="exportPDF">Cetak</v-btn>
                <v-spacer></v-spacer>
                
                <span id="SuratKuasa">
                    <v-card-text style="margin-left:10px; margin-top: 3%">
                        <span style="float:left;">Kepada SPBE/SPPBE</span> <br/>
                        <span style="float:left;">PT {{ form.nama_sppbe }}</span> <br/><br/>
                        <span style="float:left;">Dengan hormat,</span> <br/><br/>
                        <span style="float:left;">Mohon bantuannya untuk pelaksanaan transaksi pengambilan LPG 3kg kami sebagai berikut:</span> <br/>
                        <span style="float:left;margin-left:48px">-</span> <span style="float:left;margin-left:17.5px">Tanggal Pengambilan</span> <span style="float:left;margin-left:109px">: {{form.tanggal_pengambilan_gas}}</span> <br/>
                        <span style="float:left;margin-left:48px">-</span> <span style="float:left;margin-left:17.5px">Nomor Armada</span> <span style="float:left;margin-left:150px">: {{form.nomor_armada}}</span> <br/>
                        <span style="float:left;margin-left:48px">-</span> <span style="float:left;margin-left:17.5px">Nama Pengemudi</span> <span style="float:left;margin-left:132px">: {{form.nama_driver}}</span> <br/>
                        <span style="float:left;margin-left:48px">-</span> <span style="float:left;margin-left:17.5px">Kuantitas Tabung yang Diambil</span> <span style="float:left;margin-left:50px">: {{form.kuantitas_tabung}}</span> <br/><br/>
                        <span style="float:left;">Atas perhatiannya kami ucapkan terima kasih.</span> <br/><br/><br/>
                        <span style="float:left;">Wonosari,</span> <br/>
                        <span style="float:left;">PT Satria Permana Jaya</span> <br/>
                    </v-card-text>
                </span>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
import html2PDF from "jspdf-html2canvas";
export default {
    name: "SuratKuasaPage",
    watch: {
        $route: {
            immediate: true,
            handler() {
                document.title = "Surat Kuasa Pengambilan Gas";
            },
        },
    },
    data() {
        return {
            isWideScreen: window.innerWidth >= 1000,
            isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
            dialog: false,
            items: [
                { 
                    text: "Dashboard",
                    disabled: false,
                    href: '/dashboard-page',
                },
                { 
                    text: "Surat Kuasa Pengambilan Gas",
                    disabled: true,
                    href: '/surat-kuasa-pengambilan-gas-page',
                },
            ],
            form: {
                id_sppbe: null,
                nama_sppbe: 'Lestari Pelita Graha',
                tanggal_pengambilan_gas: '25-09-2023',
                nomor_armada: 'AB 8797 JC',
                id_driver: null,
                nama_driver: 'Vista',
                kuantitas_tabung: 560,
            },
        }
    },
    methods: {
        close() {
            this.dialog = false;
        },

        exportPDF() {
            var report;
            var reportName = "";

            report = document.getElementById("SuratKuasa");
            reportName = "Surat Kuasa_" + this.form.nama_driver;

            html2PDF(report, {
                jsPDF: {
                    format: "a4",
                },
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: -2.5,
                },
                html2canvas: {
                    scrollX: 0,
                    scrollY: 0,
                },

                imageType: "image/jpeg",
                output: reportName + ".pdf",
            });

            this.close();
        },
    },
}
</script>

<style>
    .v-application p {
        padding-bottom: 0px !important;
    }
</style>