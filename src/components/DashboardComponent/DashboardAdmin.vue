<template>
    <v-row>
        <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
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
                                    Total Pengiriman Gas
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Total Pengiriman Gas Sebanyak {{ pengirimanGasSisa }} Kali</v-list-item-subtitle>
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
                                    Total Pengambilan Gas
                                </v-list-item-title>
                                
                                <v-list-item-subtitle>Total Pengambilan Gas Sebanyak {{ pengambilanGasSisa }} Kali</v-list-item-subtitle>
                            </v-list-item-content>
                            
                            <v-list-item-avatar size="50">
                                <v-icon large>mdi-receipt-text-clock</v-icon>
                            </v-list-item-avatar>
                        </v-list-item>
                    </v-card>

                    <v-card
                        class="mx-auto mt-5" 
                        style="display: flex !important; flex-direction: column;"
                    >
                        <v-card-title class="indigo white--text text-h5">
                            <v-icon medium left style="vertical-align: middle; color: #fff">mdi-clipboard-text-clock-outline</v-icon>
                            <span class="text-h6 font-weight-light">Daftar Kegiatan Hari Ini</span>
                        </v-card-title>

                        <v-card-text style="flex-grow: 1; overflow: auto;" class="mt-3">
                            <template>
                                <v-data-table
                                    id="customStyleTable"
                                    :items-per-page="5"
                                    class="elevation-1"
                                    :headers="headers"
                                    :items="dataRiwayat"
                                    height="350px"
                                    fixed-header
                                />
                            </template>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>

        <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
        >
            <v-card style="display: flex !important; flex-direction: column;" height="100%">
                <v-card-title class="indigo white--text text-h5">
                    <v-icon medium left style="vertical-align: middle; color: #ffffff;">mdi-card-account-details-outline</v-icon>
                    <span class="text-h6 font-weight-light">Informasi Driver</span>
                </v-card-title>

                <v-row
                    class="pt-4"
                    justify="space-between"
                    style="flex-grow: 1; overflow: auto;"
                >
                    <v-col cols="12" sm="5" md="5" lg="5">
                        <v-treeview
                            :active.sync="active"
                            :items="items"
                            :load-children="fetchUsers"
                            :open.sync="open"
                            activatable
                            color="primary"
                            open-all
                            transition
                        >
                            <template v-slot:prepend="{ item }">
                                <v-icon v-if="!item.children">
                                    mdi-account-circle
                                </v-icon>
                            </template>
                        </v-treeview>
                    </v-col>

                    <!-- <v-divider vertical /> -->

                    <v-col cols="12" sm="7" md="7" lg="7" class="d-flex">
                        <v-scroll-y-transition mode="out-in">
                            <div
                                v-if="!selected"
                                class="text-h6 grey--text text--lighten-1 font-weight-light"
                                style="align-self: center; justify-content: center; align-content: center; vertical-align: center"
                            >
                                <v-icon large left>mdi-account-off-outline</v-icon>
                                <span class="text-h6 font-weight-light">Silahkan Pilih Driver</span>
                            </div>
                            
                            <v-card
                                v-else
                                :key="selected.id"
                                class="pt-5 mx-auto"
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

                                    <h3 class="text-h5">
                                        {{ selected.name }}
                                    </h3>
                                </v-card-text>

                                <v-divider />
                                
                                <v-row
                                    class="text-left"
                                    tag="v-card-text"
                                >
                                    <v-col
                                        class="text-right"
                                        tag="strong"
                                        cols="5"
                                    >
                                        Email:
                                    </v-col>

                                    <v-col style="padding:12px 0px 12px 0px">{{ selected.email_pegawai }}</v-col>

                                    <v-col
                                        class="text-right"
                                        tag="strong"
                                        cols="5"
                                    >
                                        Nomor Telepon:
                                    </v-col>

                                    <v-col style="padding:12px 0px 12px 0px">{{ selected.nomor_telepon_pegawai }}</v-col>

                                    <v-col
                                        class="text-right"
                                        tag="strong"
                                        cols="5"
                                    >
                                        Total Pengambilan:
                                    </v-col>

                                    <v-col style="padding-left:0px" class="mr-8">{{ selected.jumlah_pengambilan }}</v-col>

                                    <v-col
                                        class="text-right"
                                        tag="strong"
                                        cols="5"
                                    >
                                        Total Pengiriman:
                                    </v-col>

                                    <v-col style="padding-left:0px">{{ selected.jumlah_pengiriman }}</v-col>
                                </v-row>
                            </v-card>
                        </v-scroll-y-transition>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    const avatars = [
        '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
        '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
        '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
        '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
        '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
    ]

    export default {
        name: "DashboardAdmin",
        
        watch: {
            selected: 'randomAvatar',
        },

        props: {
            users: {
                type: Array,
                default: () => []
            },

            headers: {
                type: Array,
                default: () => []
            },

            dataRiwayat: {
                type: Array,
                default: () => []
            },

            monthNow: {
                type: String,
                default: null
            },

            pengambilanGasSisa: {
                type: Number,
                default: 0
            },

            pengirimanGasSisa: {
                type: Number,
                default: 0
            }
        },

        data() {
            return {
                avatar: null,
                active: [],
                open: [],
            }
        },

        methods: {
            fetchUsers (item) {
                return this.$http.post(
                    this.$api + "/pegawai/postBySearchDataAdmin", 
                    { 'bulan': new Date().getMonth() + 1, 'tahun': new Date().getFullYear() }
                )
                    .then((response) => { 
                        let json = response.data.data;
                        let id = 1;
                        json.forEach(element => {
                            element.id = id;
                            element.name = element.nama_pegawai;
                            item.children.push(element);
                            id = id + 1;
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
            this.fetchUsers();
        },

        computed: {
            items () {
                return [
                    {
                        name: 'Daftar Driver',
                        children: this.users,
                    },
                ]
            },

            selected () {
                if (!this.active.length) return undefined

                const id = this.active[0];
                return this.users.find(user => user.id === id)
            },
        }
    }
</script>

<style>
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 16px 4px 4px 4px;
}
</style>