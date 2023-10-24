<template>
    <v-main class="list" style="margin: auto">
        <v-breadcrumbs
            :items="breadCrumbItems"
            divider="/"
            style="margin-left:-25px; margin-top:-25px; width:30%"
        />

        <v-spacer />
        
        <div v-if="isWideScreen" style="margin-bottom: 50px">
            <h3 style="float:left;">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div v-else-if="isMediumScreen" style="margin-bottom: 125px">
            <h3 style="float:left">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div v-else style="margin-bottom: 175px">
            <h3 style="float:left">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div>
            <div v-if="role === 'pegawai'">
                <!-- Dashboard Manager -->
                <div v-if="jabatan === 'Manajer' && jabatan !== ''">
                    <template>
                        <v-row>
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card color="#1d88e6" dark>
                                    <v-list-item three-line>
                                        <v-list-item-avatar size="50">
                                            <v-icon large>mdi-cart-variant</v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-h6 mb-1">
                                                Total Pembelian Tahunan
                                            </v-list-item-title>

                                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>

                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card color="#02d79d" dark>
                                    <v-list-item three-line>
                                        <v-list-item-avatar size="50">
                                            <v-icon style="transform: rotateY(180deg);" large>mdi-truck-delivery</v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-h6 mb-1">
                                                Total Pengambilan Gas
                                            </v-list-item-title>
                                            
                                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            
                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-card color="#673bb7" dark>
                                    <v-list-item three-line>
                                        <v-list-item-avatar size="50">
                                            <v-icon large>mdi-truck-delivery</v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-h6 mb-1">
                                                Total Pengiriman Gas
                                            </v-list-item-title>
                                            
                                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-divider style="margin-top: 20px;" />

                        <v-row style="margin-top: 10px;">
                            <v-col
                                cols="6"
                                sm="6"
                                md="6"
                                lg="6"
                            >
                                <v-card height="500px">
                                    <v-card-title>
                                        <v-icon medium left style="vertical-align: middle;">mdi-chart-line</v-icon>
                                        <span class="text-h6 font-weight-light">Kelangkaan Gas Bulanan</span>
                                    </v-card-title>

                                    <v-card-subtitle>
                                        <v-card color="#41B883" dark class="mt-2">
                                            <v-list-item three-line>
                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-gas-station-off-outline</v-icon>
                                                </v-list-item-avatar>

                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Total Kelangkaan Gas Bulan - {{ monthNow }}
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-card>
                                    </v-card-subtitle>

                                    <v-card-text class="mt-2">
                                        <div class="d-flex justify-center bg-surface-variant">
                                            <line-chart :chartData="lineChartData" />
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col
                                cols="6"
                                sm="6"
                                md="6"
                                lg="6"
                            >
                                <v-row>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card
                                            class="mx-auto" 
                                            height="500px"
                                            style="display: flex !important; flex-direction: column;"
                                        >
                                            <v-img
                                                height="100"
                                                src="https://cdn.ajnn.net/files/images/20220722-20220406-28052019-gas-elpiji-net.jpg"
                                            />

                                            <v-card-title>Riwayat Transaksi - {{ monthNow }}</v-card-title>

                                            <v-card-text style="flex-grow: 1; overflow: auto;">
                                                <template>
                                                    <v-data-table 
                                                        id="customStyleTable"
                                                        :items-per-page="100"
                                                        :headers="headersManajer" 
                                                        :items="dessertsManajer" 
                                                        class="elevation-1"
                                                        hide-default-footer
                                                    />
                                                </template>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card height="500px">
                                            <v-card-title class="text-h6">
                                                <v-icon medium left style="vertical-align: middle;">mdi-chart-donut</v-icon>
                                                <span class="text-h6 font-weight-light">Persentase Kondisi Gas</span>
                                            </v-card-title>

                                            <v-card-text class="text--primary">
                                                <div class="d-flex justify-center bg-surface-variant">
                                                    <doughnut-chart :chartData="doughnutChartData" />
                                                </div>

                                                <div style="margin-top: 40px;">
                                                    <div>
                                                        <v-row>
                                                            <v-col
                                                                cols="6"
                                                                sm="6"
                                                                md="6"
                                                                lg="6"
                                                            >
                                                                <div style="color: #62d5fb; font-size: 15px;">
                                                                    Normal
                                                                </div>
                                                            </v-col>
                                                            
                                                            <v-col
                                                                cols="6"
                                                                sm="6"
                                                                md="6"
                                                                lg="6"
                                                            >
                                                                <div style="color: #62d5fb; font-size: 15px;">
                                                                    100
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>

                                                    <v-divider class="mt-2" />

                                                    <div class="mt-2">
                                                        <v-row>
                                                            <v-col
                                                                cols="6"
                                                                sm="6"
                                                                md="6"
                                                                lg="6"
                                                            >
                                                                <div style="color: #ee534f; font-size: 15px;">
                                                                    Bocor
                                                                </div>
                                                            </v-col>
                                                            
                                                            <v-col
                                                                cols="6"
                                                                sm="6"
                                                                md="6"
                                                                lg="6"
                                                            >
                                                                <div style="color: #ee534f; font-size: 15px;">
                                                                    40
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </template>
                </div>

                <!-- Dashboard Driver -->
                <div v-else-if="jabatan === 'Driver' && jabatan !== ''">
                    <template>
                        <v-row>
                            <v-col
                                cols="8"
                                sm="8"
                                md="8"
                                lg="8"
                            >
                                <v-row>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card color="#1d88e6" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Total Pengiriman Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>

                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-truck-delivery</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>
                                    </v-col>

                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card color="#02d79d" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Total Pengambilan Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                                
                                                <v-list-item-avatar size="50">
                                                    <v-icon style="transform: rotateY(180deg);" large>mdi-truck-delivery</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card color="#673bb7" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Sisa Pengiriman Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                                
                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-receipt-clock</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>
                                    </v-col>

                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                        lg="6"
                                    >
                                        <v-card color="#ee534f" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Sisa Pengambilan Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                                
                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-receipt-text-clock</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                        lg="12"
                                    >
                                        <v-card height="426px" style="display: flex !important; flex-direction: column;">
                                            <v-card-title class="mb-3">
                                                <v-icon medium left style="vertical-align: middle;">mdi-history</v-icon>
                                                <span class="text-h6 font-weight-light">Riwayat Kegiatan Bulan {{ monthNow }}</span>
                                            </v-card-title>
                                            <v-card-subtitle style="flex-grow: 1; overflow: auto;">
                                                <template>
                                                    <v-data-table
                                                        id="customStyleTable" 
                                                        :items-per-page="5"
                                                        :headers="headers" 
                                                        :items="desserts" 
                                                        class="elevation-1"
                                                    >
                                                        <template v-slot:items="props">
                                                            <td>{{ props.item.name }}</td>
                                                            <td class="text-xs-right">{{ props.item.calories }}</td>
                                                            <td class="text-xs-right">{{ props.item.fat }}</td>
                                                            <td class="text-xs-right">{{ props.item.carbs }}</td>
                                                            <td class="text-xs-right">{{ props.item.protein }}</td>
                                                            <td class="text-xs-right">{{ props.item.iron }}</td>
                                                        </template>
                                                    </v-data-table>
                                                </template>
                                            </v-card-subtitle>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col
                                cols="4"
                                sm="4"
                                md="4"
                                lg="4"
                            >
                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                        lg="12"
                                    >
                                        <v-card height="650px" style="display: flex !important; flex-direction: column;">
                                            <v-card-title>
                                                <v-icon medium left style="vertical-align: middle;">mdi-checkbox-marked-circle-auto-outline</v-icon>
                                                <span class="text-h6 font-weight-light">Daftar Kegiatan Bulan {{ monthNow }}</span>
                                            </v-card-title>

                                            <v-card-text style="flex-grow: 1; overflow: auto;">
                                                <v-timeline dense>
                                                    <v-timeline-item
                                                        v-for="message in messages"
                                                        :key="message.time"
                                                        :color="message.color"
                                                        small
                                                    >
                                                        <div>
                                                            <div class="font-weight-normal"><strong>{{ message.from }}</strong> @{{ message.time }}</div>
                                                            <div>{{ message.message }}</div>
                                                        </div>
                                                    </v-timeline-item>
                                                </v-timeline>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </template>
                </div>

                <!-- Dashboard Admin -->
                <div v-if="jabatan === 'Admin' && jabatan !== ''">
                    <template>
                        <v-row>
                            <v-col
                                cols="5"
                                sm="5"
                                md="5"
                                lg="5"
                            >
                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                        lg="12"
                                    >
                                        <v-card color="#673bb7" dark>
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Sisa Pengiriman Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                                
                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-receipt-clock</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>

                                        <v-card color="#ee534f" dark class="mt-5">
                                            <v-list-item three-line>
                                                <v-list-item-content>
                                                    <v-list-item-title class="text-h6 mb-1">
                                                        Sisa Pengambilan Gas
                                                    </v-list-item-title>
                                                    
                                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                                </v-list-item-content>
                                                
                                                <v-list-item-avatar size="50">
                                                    <v-icon large>mdi-receipt-text-clock</v-icon>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                        </v-card>

                                        <v-card
                                            class="mx-auto mt-5" 
                                            height="450px"
                                            style="display: flex !important; flex-direction: column;"
                                        >
                                            <v-card-title>
                                                <v-icon medium left style="vertical-align: middle;">mdi-clipboard-text-clock-outline</v-icon>
                                                <span class="text-h6 font-weight-light">Daftar Kegiatan</span>
                                            </v-card-title>

                                            <v-card-text style="flex-grow: 1; overflow: auto;">
                                                <template>
                                                    <v-data-table
                                                        id="customStyleTable"
                                                        :items-per-page="5"
                                                        :headers="headers"
                                                        :items="desserts"
                                                        class="elevation-1"
                                                    />
                                                </template>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col
                                cols="7"
                                sm="7"
                                md="7"
                                lg="7"
                            >
                                <v-card style="display: flex !important; flex-direction: column;" height="666.5px">
                                    <v-card-title class="indigo white--text text-h5">
                                        <v-icon medium left style="vertical-align: middle; color: #ffffff;">mdi-card-account-details-outline</v-icon>
                                        <span class="text-h6 font-weight-light">Daftar Driver</span>
                                    </v-card-title>

                                    <v-row
                                        class="pa-4"
                                        justify="space-between"
                                        style="flex-grow: 1; overflow: auto;"
                                    >
                                        <v-col cols="5">
                                            <v-treeview
                                                :active.sync="active"
                                                :items="items"
                                                :load-children="fetchUsers"
                                                :open.sync="open"
                                                activatable
                                                color="warning"
                                                open-all
                                                transition
                                            >
                                                <template v-slot:prepend="{ item }">
                                                    <v-icon v-if="!item.children">
                                                        mdi-account
                                                    </v-icon>
                                                </template>
                                            </v-treeview>
                                        </v-col>

                                        <v-divider vertical />

                                        <v-col class="d-flex text-center">
                                            <v-scroll-y-transition mode="out-in">
                                                <div
                                                    v-if="!selected"
                                                    class="text-h6 grey--text text--lighten-1 font-weight-light"
                                                    style="align-self: center; justify-content: center; align-content: middle;"
                                                >
                                                    Silahkan Pilih Driver
                                                </div>
                                                
                                                <v-card
                                                    v-else
                                                    :key="selected.id"
                                                    class="pt-6 mx-auto"
                                                    flat
                                                    max-width="400"
                                                    style="align-self: center; justify-content: center; align-content: middle;"
                                                >
                                                    <v-card-text>
                                                        <v-avatar v-if="avatar" size="88">
                                                            <v-img
                                                                :src="`https://avataaars.io/${avatar}`"
                                                                class="mb-6"
                                                            />
                                                        </v-avatar>

                                                        <h3 class="text-h5 mb-2">
                                                            {{ selected.name }}
                                                        </h3>
                                                        <div class="blue--text mb-2">
                                                            {{ selected.website }}
                                                        </div>
                                                        <div class="blue--text subheading font-weight-bold">
                                                            {{ selected.username }}
                                                        </div>
                                                    </v-card-text>

                                                    <v-divider />
                                                    
                                                    <v-row
                                                        class="text-left"
                                                        tag="v-card-text"
                                                    >
                                                        <v-col
                                                            class="text-right mr-4 mb-2"
                                                            tag="strong"
                                                            cols="5"
                                                        >
                                                            Email:
                                                        </v-col>

                                                        <v-col>{{ selected.email }}</v-col>

                                                        <v-col
                                                            class="text-right mr-4 mb-2"
                                                            tag="strong"
                                                            cols="5"
                                                        >
                                                            Nomor Telepon:
                                                        </v-col>

                                                        <v-col>{{ selected.phone }}</v-col>

                                                        <v-col
                                                            class="text-right mr-4 mb-2"
                                                            tag="strong"
                                                            cols="5"
                                                        >
                                                            Total Pengiriman:
                                                        </v-col>

                                                        <v-col>{{ selected.company.name }}</v-col>
                                                    </v-row>
                                                </v-card>
                                            </v-scroll-y-transition>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </div>
            </div>

            <div v-else>
                <template>
                    <v-row>
                        <v-col
                            cols="9"
                            sm="9"
                            md="9"
                            lg="9"
                        >
                            <v-card style="display: flex !important; flex-direction: column;" height="666.5px">
                            
                            </v-card>
                        </v-col>
                    </v-row>
                </template>
            </div>
                        
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64" />
            </v-overlay>
        </div>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
    import DoughnutChart from './Chart/DoughnutChart.vue';
    import LineChart from './Chart/LineChart.vue';
    
    const avatars = [
        '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
        '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
        '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
        '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
        '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
    ]

    export default {
        name: "DashboardPage",

        watch: {
            $route: {
                immediate: true,
                handler() {
                    document.title = "Dashboard";
                },
            },
            selected: 'randomAvatar',
        },

        components: { LineChart, DoughnutChart },

        data() {
            return {
                jabatan: "",
                role: localStorage.getItem("role"),
                snackbar: false,
                error_message: "",
                color: "",
                overlay: false,
                isWideScreen: window.innerWidth >= 1000,
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                breadCrumbItems: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                ],

                // Manager Variable
                monthNow: "",
                lineChartData: {
                    labels: [
                        'Januari',
                        'Februari',
                        'Maret',
                        'April',
                        'Mei',
                        'Juni',
                        'Juli',
                        'Augustus',
                        'September',
                        'Oktober',
                        'November',
                        'Desember'
                    ],
                    datasets: [
                        {
                            label: 'Kelangkaan Gas Per Bulan',
                            backgroundColor: '#41B883',
                            data: [40, 39, 10, 40, 39, 80, 40, 100, 50, 70, 24, 88]
                        }
                    ]
                },
                doughnutChartData: {
                    labels: ['Bocor', 'Normal'],
                    datasets: [
                        {
                            backgroundColor: ['#ee534f', '#00D8FF'],
                            data: [40, 100],
                        }
                    ]
                },
                headersManajer: [
                    {
                        text: 'Tanggal',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Jumlah', value: 'calories' },
                ],
                dessertsManajer: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                    },
                ],

                //Driver Variable
                headers: [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' },
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: 1,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: 1,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: 7,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: 8,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: 16,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: 0,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: 2,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: 45,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: 22,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: 6,
                    },
                ],
                messages: [
                    {
                        from: 'You',
                        message: `Sure, I'll see you later.`,
                        time: '10:42am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'John Doe',
                        message: 'Yeah, sure. Does 1:00pm work?',
                        time: '10:37am',
                        color: 'green',
                    },
                    {
                        from: 'You',
                        message: 'Did you still want to grab lunch today?',
                        time: '9:47am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'You',
                        message: `Sure, I'll see you later.`,
                        time: '10:42am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'John Doe',
                        message: 'Yeah, sure. Does 1:00pm work?',
                        time: '10:37am',
                        color: 'green',
                    },
                    {
                        from: 'You',
                        message: 'Did you still want to grab lunch today?',
                        time: '9:47am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'You',
                        message: `Sure, I'll see you later.`,
                        time: '10:42am',
                        color: 'deep-purple lighten-1',
                    },
                    {
                        from: 'John Doe',
                        message: 'Yeah, sure. Does 1:00pm work?',
                        time: '10:37am',
                        color: 'green',
                    },
                    {
                        from: 'You',
                        message: 'Did you still want to grab lunch today?',
                        time: '9:47am',
                        color: 'deep-purple lighten-1',
                    },
                ],

                // Admin Variable
                active: [],
                avatar: null,
                open: [],
                users: [],

                //Pangkalan Variable
            }
        },

        methods: {
            getDateNow(){
                let month = new Date().toLocaleDateString("sv-se", { month: 'long' }).split('T')[0];
                this.monthNow = month[0].toUpperCase() + month.slice(1);
            },

            getDataUser() {
                this.overlay = true;
                var url = this.$api;

                if(this.role === 'pegawai')
                {
                    url = url + "/pegawai/getById";
                    this.$http.get(url + "/" + localStorage.getItem("id"))
                        .then((response) => {
                            if(response.data.code == 200)
                            {
                                var res = response.data.data;
                                this.jabatan = res.role_pegawai;
                                this.overlay = false;
                            }
                            else
                            {
                                this.color = "red";
                                this.snackbar = true;
                                this.error_message = response.data.message;
                                this.overlay = false;
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

            async fetchUsers (item) {
                return this.$http.get('https://jsonplaceholder.typicode.com/users')
                    .then((response) => { 
                        let json = response.data;
                        json.forEach(element => {
                            item.children.push(element)
                        });
                    })
                    .catch((error) => {
                        console.warn(error)
                    })
            },

            randomAvatar () {
                this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
            },
        },
        
        mounted() {
            this.getDateNow();
            this.getDataUser();
            this.fetchUsers();
        },

        computed: {
            items () {
                return [
                    {
                        name: 'Drivers',
                        children: this.users,
                    },
                ]
            },
            selected () {
                if (!this.active.length) return undefined

                const id = this.active[0]

                return this.users.find(user => user.id === id)
            },
        },
    }
</script>