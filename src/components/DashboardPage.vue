<template>
    <v-main class="list" style="margin: auto">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px; width:30%"
        />
        <v-spacer />
        
        <div v-if="isWideScreen" style="margin-bottom: 5%">
            <h3 style="float:left;">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
            <h3 style="float:left">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div v-else style="margin-bottom: 17.5%">
            <h3 style="float:left">Dashboard</h3>
            <v-spacer />
        </div>
        
        <div v-if="jabatan === 'Admin'">
            <template>
                <LineChartGenerator
                    :chart-options="chartOptions"
                    :data="chartData"
                    :chart-id="chartId"
                    :dataset-id-key="datasetIdKey"
                    :plugins="plugins"
                    :css-classes="cssClasses"
                    :styles="styles"
                />
            </template>
        </div>
    </v-main>
</template>

<script>
    import { Line as LineChartGenerator } from 'vue-chartjs'
    import { 
        Chart as ChartJS, Title,
        Tooltip, Legend,
        LineElement, LinearScale,
        CategoryScale, PointElement 
    } from 'chart.js'

    ChartJS.register(
        Title, Tooltip,
        Legend, LineElement,
        LinearScale, CategoryScale,
        PointElement
    )

    export default {
        name: "DashboardPage",
        
        components: { LineChartGenerator },

        watch: {
            $route: {
                immediate: true,
                handler() {
                    document.title = "Dashboard";
                },
            },
        },

        props: {
            chartId: {
                type: String,
                default: 'line-chart'
            },

            datasetIdKey: {
                type: String,
                default: 'label'
            },

            cssClasses: {
                default: '',
                type: String
            },

            styles: {
                type: Object,
                default: () => {}
            },

            plugins: {
                type: Array,
                default: () => []
            }
        },

        data() {
            return {
                jabatan: localStorage.getItem("jabatan"),
                isWideScreen: window.innerWidth >= 1000,
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                ],
                chartData: {
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
                            label: 'Transaksi Per Bulan',
                            backgroundColor: '#f87979',
                            data: [40, 39, 10, 40, 39, 80, 40, 100, 50, 70, 24, 88]
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        }
    }
</script>