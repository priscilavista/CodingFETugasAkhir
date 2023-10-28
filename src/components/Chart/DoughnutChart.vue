<template>
    <Doughnut
        v-if="loaded"
        :data="doughnutChartData" 
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
                loaded: false,
                
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                },

                doughnutChartData: {
                    labels: [],
                    datasets: []
                },
            }
        },

        async mounted() {
            this.loaded = false;

            try {
                var url = this.$api + "/kelangkaanGas/getBySearchAllData";
                this.$http.get(url)
                .then((response) => {
                    if(response.data.code === 200)
                    {
                        this.doughnutChartData = {
                            labels: ['Normal', 'Bocor'],
                            datasets: [
                                {
                                    backgroundColor: ['#00D8FF', '#ee534f'],
                                    data: [100, 40]
                                }
                            ],
                        };

                        this.loaded = true;
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            } catch (error) {
                console.log(error)
            }
        },
    }
</script>