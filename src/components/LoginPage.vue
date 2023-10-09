<template>
    <!-- <div id="app"> -->
        <v-app>
            <v-container fluid pa-0>
                <v-row align="center" justify="center"
                    style="height: 100vh; background: #196b4d; margin: 0">
                    <!-- style="height:100vh; background: linear-gradient(#3e6fbd,#87182c) -->
                    <v-col cols="12" lg="6" md="6" 
                        class="left-login white fill-height d-flex flex-column justify-center align-center">
                        <h2 style="font-weight: bold; margin-top:6.5%">Selamat datang di iSatria!</h2>
                        <h5 >Silahkan login untuk melanjutkan</h5>
                        <v-img
                            contain
                            width="50%"
                            height="50%"
                            :src="image2"
                        ></v-img>
                    </v-col>
                    <v-col cols="12" lg="6" md="6"
                    class="right-login fill-height d-flex flex-column justify-center align-center"
                    style="background: #196b4d;">
                        <v-card max-width="90%"
                            max-height="100%">
                            <v-card-text style="padding: 8%">
                                <v-row>
                                    <v-col cols="6">
                                    </v-col>  
                                    <v-col cols="6" style="padding: 0">
                                        <v-img
                                            contain
                                            :src="image"
                                            width="90%"
                                            height="90%"
                                            style="margin-left: 15%; "
                                        ></v-img>
                                    </v-col>  
                                </v-row>
                                <v-form ref="form" lazy-validation>
                                <v-text-field
                                    label="Email"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                                    required
                                    style="margin-top: -10%"
                                >
                                </v-text-field>
                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    type="password"
                                    :rules="passwordRules"
                                    counter
                                    required
                                ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions style="padding: 0% 8% 8% 8%">
                                <v-btn
                                style="width: 100%; font-size: 90%; border: 10%; 
                                border-radius: 10px; font-weight: 4%; font-family: Calibri;"
                                class="blue white--text justify-center align-center"
                                depressed
                                @click="submit"
                                >Masuk</v-btn
                                >
                            </v-card-actions>
                            <v-overlay :value="overlay">
                                <v-progress-circular indeterminate size="64"></v-progress-circular>
                            </v-overlay>
                        </v-card>
                    </v-col>
                    <!-- <v-col cols="12" lg="6" md="6" 
                    class="right-login grey lighten-5 fill-height d-flex flex-column justify-center align-center">
                        <h2 style="font-weight: bold;">Selamat datang di iSatria!</h2>
                        <h5 >Silahkan login untuk melanjutkan</h5>
                        <v-img
                            contain
                            width="50%"
                            height="50%"
                            :src="image2"
                        ></v-img>
                    </v-col> -->
                </v-row>
            </v-container>
            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
                error_message
            }}</v-snackbar>
        </v-app>
</template>

<script>
export default {
    name: "LoginPage",

    watch: {
        $route: {
        immediate: true,
        handler() {
            document.title = "iSatria";
        },
        },
    },
    data(){
        return{
            snackbar: false,
            error_message: "",
            color: "",
            password: "",
            passwordRules: [(v) => !!v || "Password is Required"],
            email: "",
            emailRules: [
                (v) => !!v || "Email is Required",
                (v) => /.+@.+\..+/.test(v) || "Email must be valid",
            ],
            overlay: false,
            image: require("@/assets/isatria.png"),
            image2: require("@/assets/pertamina.jpg"),
        }
    },
}
</script>


<style>
    .container {
    height: 100%;
    /* display: flex;
    justify-content: center;
    align-items: center; */
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
        text-transform: capitalize;
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
</style>