<template>
    <LineChartGenerator
        v-if="loaded"
        :chart-options="chartOptions"
        :data="lineChartData"
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
                loaded: false,
                
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    }
                },

                lineChartData: {
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
                        let month = [];
                        let value = [];
                        let data = response.data.data;

                        data.forEach(element => {
                            month = [...month, element.nama_bulan];

                            if(element.total_permintaan !== null)
                            {
                                value = [...value, element.total_permintaan];
                            }
                            else
                            {
                                value = [...value, 0];
                            }
                        });
                        
                        this.lineChartData = {
                            labels: month,
                            datasets: [
                                {
                                    label: 'Kelangkaan Gas Per Bulan',
                                    backgroundColor: '#41B883',
                                    data: value
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