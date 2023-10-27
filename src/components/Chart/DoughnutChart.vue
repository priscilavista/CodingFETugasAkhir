<template>
    <Doughnut
        :data="chartData" 
        :options="chartOptions"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
    />
</template>

<script>
    import { Doughnut } from 'vue-chartjs'
    import { 
        Chart as ChartJS, Title,
        Tooltip, Legend,
        ArcElement, CategoryScale
    } from 'chart.js'
    ChartJS.register(
        Title, Tooltip, 
        Legend, ArcElement, 
        CategoryScale
    )

    export default {
        name: "DoughtnutChart",
        
        components: { Doughnut },
        props: {
            chartData: {
                type: Object,
                default: () => {}
            },

            chartId: {
                type: String,
                default: 'doughnut-chart'
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
                }
            }
        }
    }
</script>