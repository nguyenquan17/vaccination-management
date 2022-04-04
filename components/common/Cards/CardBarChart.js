import React, {useEffect} from "react";
import Chart from "chart.js";
import {getAllDataBarChart} from "../../../redux/actions/chartsAction";
import {connect} from "react-redux";
import randomColor from "randomcolor";

function CardBarChart(props) {

    const {dataBarChart} = props.dataBarChart;
    /// Call api
    useEffect(() => {
        props.getAllDataBarChart();
    }, [])

    useEffect(() => {
        let listColor = [
            '#4bc0c0',
            '#36a2eb',
            '#ff9000',
            '#fc708e',
            '#bf4c8b',
        ]
        if(dataBarChart.length > 5){
            for(let i=0;i < dataBarChart.length-5;i++){
                listColor.push(randomColor())
            }
        }
        let config = {
            type: "bar",
            data: {
                labels: dataBarChart.name_vaccine,
                datasets: [
                    {
                        label: "",
                        backgroundColor: [
                            '#4bc0c0',
                            '#36a2eb',
                            '#ff9000',
                            '#fc708e',
                            '#bf4c8b',
                        ],
                        borderColor: "#ed64a6",
                        data: dataBarChart.number_vaccine,
                        fill: false,
                        barThickness: 20,
                    },

                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Orders Chart",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                legend: {
                    display: false,
                    labels: {
                        fontColor: "rgba(0,0,0,.4)",
                    },
                    align: "end",
                    position: "bottom",
                },
                scales: {
                    xAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Vaccine Name",
                            },
                            gridLines: {
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                userCallback: function(label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }

                                },
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                            },
                            gridLines: {
                                borderDash: [2],
                                drawBorder: false,
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.2)",
                                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        let ctx = document.getElementById("bar-chart").getContext("2d");
        window.myBar = new Chart(ctx, config)
    }, [dataBarChart.name_vaccine,dataBarChart.name_vaccine]);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                                {/*Overview*/}
                            </h6>
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Dữ liệu vaccine đã tiêm
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-96">
                        <canvas id="bar-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}
const mapStateToProps = (state) => ({
    dataBarChart: state.chartsReducer,
});

const mapDispatchToProps = {
    getAllDataBarChart
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBarChart);