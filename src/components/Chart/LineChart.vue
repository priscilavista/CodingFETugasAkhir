<template>
    <LineChartGenerator
        :chart-options="chartOptions"
        :data="chartData"
        :chart-id="lineChartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
    />
</template>

<script>
    import { Line as LineChartGenerator } from 'vue-chartjs'
    import { 
        Chart as ChartJS, Title,
        Tooltip, Legend,
        LineElement, LinearScale,
        CategoryScale, PointElement,
    } from 'chart.js'
    ChartJS.register(
        Title, Tooltip,
        Legend, LineElement,
        LinearScale, CategoryScale,
        PointElement,
    )

    export default {
        name: "LineChart",
        
        components: { LineChartGenerator },
        props: {
            lineChartId: {
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
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    }
                },
            }
        }
    }
</script>