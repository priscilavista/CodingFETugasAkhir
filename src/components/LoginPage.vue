<template>
    <v-app>
        <v-container fluid pa-0>
            <v-row 
                align="center" justify="center"
                style="height: 100vh; background: #196b4d; margin: 0"
            >
                <v-col 
                    cols="12" lg="6" md="6" 
                    class="left-login white fill-height d-flex flex-column justify-center align-center"
                >
                    <h2 style="font-weight: bold; margin-top:6.5%">Selamat Datang di iSatria!</h2>
                    <h5>Silahkan Login Untuk Melanjutkan</h5>
                    <v-img
                        contain
                        width="50%"
                        height="50%"
                        :src="image2"
                    />
                </v-col>

                <v-col 
                    cols="12" lg="6" md="6"
                    style="background: #196b4d;"
                    class="right-login fill-height d-flex flex-column justify-center align-center"
                >
                    <v-card 
                        max-width="90%"
                        max-height="100%"
                    >
                        <v-form ref="form" lazy-validation @submit.prevent="login">
                            <v-card-text style="padding: 8%">
                                <v-row>
                                    <v-col cols="6" />
                                    <v-col cols="6" style="padding: 0">
                                        <v-img
                                            contain
                                            width="90%"
                                            height="90%"
                                            :src="image"
                                            style="margin-left: 15%;"
                                        />
                                    </v-col>
                                </v-row>

                                    <v-radio-group
                                        row
                                        v-model="role"
                                        style="padding-bottom:20px"
                                    >
                                        <div v-for="(role, index) in roleData" :key="index">
                                            <v-radio :label="role.label" :value="role.value" :key="index" />
                                        </div>
                                    </v-radio-group>

                                    <v-text-field
                                        required
                                        type="email"
                                        label="Email"
                                        v-model="email"
                                        :rules="emailRules"
                                        style="margin-top: -10%"
                                        @keydown.enter="login"
                                    />
                                    
                                    <v-text-field
                                        counter
                                        required
                                        label="Password"
                                        v-model="password"
                                        :rules="passwordRules"
                                        :type="showPassword ? 'text' : 'password'"
                                        @click:append="showPassword = !showPassword"
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @keydown.enter="login"
                                    />
                            </v-card-text>

                            <v-card-actions style="padding: 0% 8% 8% 8%">
                                <v-btn
                                    depressed
                                    @click="login"
                                    class="blue white--text justify-center align-center"
                                    style="width: 100%; font-size: 90%; border: 10%; border-radius: 10px; font-weight: 4%; font-family: Calibri;"
                                >
                                    Masuk
                                </v-btn>
                            </v-card-actions>
                        </v-form>

                        <v-overlay :value="overlay">
                            <v-progress-circular indeterminate size="64" />
                        </v-overlay>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-app>
</template>

<script>
    export default {
        name: "LoginPage",

        watch: {
            $route: {
                immediate: true,

                handler() {
                    document.title = "Login iSatria";
                },
            },
        },

        data() {
            return {
                color: "",
                email: "",
                password: "",
                overlay: false,
                role: "pegawai",
                snackbar: false,
                error_message: "",
                showPassword: false,
                image: require("@/assets/isatria.png"),
                image2: require("@/assets/pertamina.jpg"),
                roleData: [ {label: 'Pegawai', value: 'pegawai'},  {label: 'Pangkalan', value: 'pangkalan'} ],
                roleRules: [(v) => !!v || "Jabatan Harus Dipilih"],
                passwordRules: [(v) => !!v || "Password Wajib Dimasukkan"],
                emailRules: [
                    (v) => !!v || "Email Wajib Dimasukkan",
                    (v) => /.+@.+\..+/.test(v) || "Format Email Harus Valid",
                ],
            }
        },

        methods: {
            login() {
                if(this.email !== '' && this.password !== '')
                {
                    this.overlay = true;
                    var url = this.$api;
                    var body = {};

                    if(this.role === 'pegawai')
                    {
                        url = url + "/login";
                        body = {email_pegawai: this.email, password: this.password};
                    }
                    else if(this.role === 'pangkalan')
                    {
                        url = url + "/loginPangkalan";
                        body = {email_pangkalan: this.email, password: this.password};
                    }

                    this.$http.post(url, body)
                        .then((response) => {
                            if(response.data.code === 200)
                            {
                                if(this.role === 'pegawai')
                                {
                                    localStorage.setItem("id", response.data.user.id_pegawai);
                                }
                                else if(this.role === 'pangkalan')
                                {
                                    localStorage.setItem("id", response.data.user.id_pangkalan);
                                }
                                localStorage.setItem("token", response.data.token);
                                localStorage.setItem("role", this.role);
                                
                                if(this.role === 'pegawai')
                                {
                                    localStorage.setItem("jabatan", response.data.user.role_pegawai);
                                }

                                this.color = "green";
                                this.snackbar = true;
                                this.overlay = false;
                                this.error_message = response.data.message;

                                this.$router.push({ name: "Dashboard" });
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
                else
                {
                    this.color = "red";
                    this.snackbar = true;
                    this.overlay = false;
                    this.error_message = 'Mohon Masukkan Data yang Dibutuhkan!';
                }
            }
        }
    }
</script>

<style>
    .container {
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

    .left-login{
        display: flex;
    }

    .right-login{
        flex: 1;
        position: relative;
    }

    .theme--light.v-application {
        background: rgba(248,249,253,255);
    }

    .v-application .blue {
        background-color: #366abf!important;
        border-color: #4cb5f9!important;
    }

    .v-application{
        display: block;
    }

    .v-btn {
        letter-spacing: 0;
        font-weight: 550;
    }

    .v-text-field label {
        font-size: 80%;
    }

    .v-text-field input {
        font-size: 80%;
    }

    .v-responsive {
        flex: none;
    }

    [class*="col-"] {
        float: left;
        padding: 15px;
    }

    /* For mobile phones: */
    [class*="col-"] {
        width: 100%;
    }

    @media only screen and (min-width: 600px) {
        /* For tablets: */
        .col-s-1 {width: 8.33%;}
        .col-s-2 {width: 16.66%;}
        .col-s-3 {width: 25%;}
        .col-s-4 {width: 33.33%;}
        .col-s-5 {width: 41.66%;}
        .col-s-6 {width: 50%;}
        .col-s-7 {width: 58.33%;}
        .col-s-8 {width: 66.66%;}
        .col-s-9 {width: 75%;}
        .col-s-10 {width: 83.33%;}
        .col-s-11 {width: 91.66%;}
        .col-s-12 {width: 100%;}
    }

    @media only screen and (min-width: 768px) {
        /* For desktop: */
        .col-1 {width: 8.33%;}
        .col-2 {width: 16.66%;}
        .col-3 {width: 25%;}
        .col-4 {width: 33.33%;}
        .col-5 {width: 41.66%;}
        .col-6 {width: 50%;}
        .col-7 {width: 58.33%;}
        .col-8 {width: 66.66%;}
        .col-9 {width: 75%;}
        .col-10 {width: 83.33%;}
        .col-11 {width: 91.66%;}
        .col-12 {width: 100%;}
    }
    
    .v-input--radio-group__input {
        width: 77.7%;
    }
</style>