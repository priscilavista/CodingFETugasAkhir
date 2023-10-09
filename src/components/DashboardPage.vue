<template>
    <v-main class="list" style="margin: auto">
        <v-breadcrumbs
        :items="items"
        divider="/"
        style="margin-left:-25px; margin-top:-25px; width:30%"
        ></v-breadcrumbs>
        <v-spacer></v-spacer>
        <div v-if="isWideScreen" style="margin-bottom: 7.5%">
            <h3 style="float:left;">Dashboard</h3>
            <v-spacer></v-spacer>
        </div>
        <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
            <h3 style="float:left">Dashboard</h3>
            <v-spacer></v-spacer>
        </div>
        <div v-else style="margin-bottom: 17.5%">
            <h3 style="float:left">Dashboard</h3>
            <v-spacer></v-spacer>
        </div>

        <!-- admin -->
        <v-row>
            <v-col md="2">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-account-multiple</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">Pegawai</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col md="2">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-truck</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">Driver</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col md="2">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-store</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">Pangkalan</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">224</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col md="2">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-factory</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">SPPBE</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <!-- manager -->
        <v-row>
            <v-col style="max-width:19%">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-import</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">J.Ambil</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col style="max-width:19%">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-export</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">J.Kirim</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col style="max-width:19%">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-clipboard-clock-outline</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">J.Pangkalan</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col style="max-width:19%">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-calendar-star</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">Fakultatif</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <!-- pangkalan -->
        <v-row>
            <v-col style="max-width:19%">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-import</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">J.Terima</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col style="max-width:19%">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-cash-register</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">Transaksi</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col style="max-width:19%">
                <v-card color="#3F51B5">
                    <v-row>
                        <v-col style="padding:0">
                            <v-icon color="#ffffff" style="font-size:50px;padding:10px;float:right">mdi-inbox-multiple</v-icon>
                        </v-col>
                        <v-col style="color:#ffffff;padding:0">
                            <h6 style="float:left;margin-top:7px">P.Fakultatif</h6><br/>
                            <h6 style="float:left;margin-top:-5px;font-size:30px">34</h6>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
    export default {
        name: "DashboardPage",
        watch: {
            $route: {
                immediate: true,
                handler() {
                    document.title = "Dashboard";
                },
            },
        },
        data() {
            return {
                isWideScreen: window.innerWidth >= 1000,
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                ],
            }
        }
    }
</script>