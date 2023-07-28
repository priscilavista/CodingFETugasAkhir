<template>
    <!-- <div id="app"> -->
        <v-app>
            <v-container fluid pa-0>
                <v-row align="center" justify="center"
                    style="height: 100vh; background: #196b4d; margin: 0">
                    <!-- style="height:100vh; background: linear-gradient(#3e6fbd,#87182c) -->
                    
                    <v-col cols="12" lg="6" md="6"
                    class="left-login fill-height d-flex flex-column justify-center align-center">
                        <v-card max-width="90%"
                            max-height="100%">
                            <v-card-text style="padding: 8%">
                                <!-- <h1 style="text-align: center; font-family: Rockwell; font-size: 180%; font-weight: 10%;
                                margin-bottom: 5%">iSatria</h1> -->
                                <v-row>
                                    <v-col cols="6">
                                        <!-- <v-img
                                            contain
                                            :src="image2"
                                        ></v-img> -->
                                    </v-col>  
                                    <v-col cols="6">
                                        <v-img
                                            contain
                                            :src="image"
                                        ></v-img>
                                    </v-col>  
                                </v-row>
                                <!-- <v-img
                                    contain
                                    height="50%"
                                    width="50%"
                                    style="margin-left: 25%"
                                    :src="image"
                                ></v-img> -->
                                <v-form ref="form" lazy-validation>
                                <v-text-field
                                    label="Email"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                                    required
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
                                >Login</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" 
                    class="right-login white fill-height d-flex flex-column justify-center align-center">
                        <!-- <v-carousel
                            cycle
                            height="100%"
                            hide-delimiter-background
                            show-arrows-on-hover
                        >
                            <v-carousel-item
                            v-for="(item, i) in items"
                            :key="i"
                            :src="item.src"
                            >
                            </v-carousel-item>
                        </v-carousel> -->
                        <!-- <v-card>
                            <v-row>
                                <v-col>
                                    <v-img
                                    contain
                                    width="50%"
                                    height="50%"
                                    src="https://e1.pxfuel.com/desktop-wallpaper/14/962/desktop-wallpaper-pertamina-logo-pertamina.jpg"
                                ></v-img>
                                </v-col>
                                <v-row no-gutters>
                                <v-col>
                                    <v-img
                                    contain
                                    width="70%"
                                    height="70%"
                                    :src="image2"
                                ></v-img>
                                </v-col>
                            </v-row>
                            </v-row>
                            
                            <v-row></v-row>
                        </v-card> -->
                        <!-- <v-img
                            contain
                            width="70%"
                            height="70%"
                            :src="image2"
                        ></v-img> -->
                        <h2 style="font-weight: bold;">Selamat datang di iSatria!</h2>
                        <h5 >Silahkan login untuk melanjutkan</h5>
                        <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3179373419835!2d110.60750670895348!3d-7.966057692025687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bb35c043e46a3%3A0xebf21f55d252602!2sSATRIA%20PERMANA%20JAYA.%20PT!5e0!3m2!1sen!2sid!4v1690551960668!5m2!1sen!2sid" 
                            width="80%" height="50%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->
                        <v-card
                            class="mx-auto"
                            max-width="100%"
                            max-height="100%"
                            style="margin-top: 5%; background: #7bb4ed"
                        >
                            <template slot="progress">
                                <v-progress-linear
                                    color="deep-purple"
                                    indeterminate
                                ></v-progress-linear>
                            </template>

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3179373419835!2d110.60750670895348!3d-7.966057692025687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bb35c043e46a3%3A0xebf21f55d252602!2sSATRIA%20PERMANA%20JAYA.%20PT!5e0!3m2!1sen!2sid!4v1690551960668!5m2!1sen!2sid" 
                            width="100%" height="50%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            <!-- <v-img
                                height="250"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            ></v-img> -->
                            <v-card-title style="font-weight: bold; padding: 3% 0 0 5%; font-size: 120%;">PT Satria Permana Jaya</v-card-title>
                            <v-card-text style="text-align: left; padding-left: 0 0 0 5%">$ • Distribution service</v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-text style="text-align: left; padding: 3% 0 0 5%"><strong>Telp/Fax:</strong> 0274 391715</v-card-text>
                            <v-card-text style="text-align: left; padding: 1% 0 8% 5%"><strong>Email:</strong> satriapermanajaya@gmail.com</v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-app>
    <!-- </div> -->
    <!-- <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title class="justify-center">
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container> -->
</template>

<script>
export default {
    data(){
        return{
            image: require("@/assets/isatria.png"),
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

    .v-btn:not(.v-btn--round).v-size--default {
        /* height: 8vw !important; */
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