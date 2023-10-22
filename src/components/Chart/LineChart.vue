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
            chartData: {
                type: Object,
                default: () => {}
            },

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