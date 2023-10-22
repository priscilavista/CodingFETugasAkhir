<template>
    <Doughnut
        :data="chartData" 
        :options="chartOptions"
        :chart-id="lineChartId"
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
                chartData: {
                    labels: ['Normal', 'Bocor', 'Rusak'],
                    datasets: [
                        {
                            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                            data: [40, 20, 100],
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            }
        }
    }
</script>