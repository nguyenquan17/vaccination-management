import React, {useEffect} from "react";
import Chart from "chart.js";
import {getAllDataLineChart} from "../../../redux/actions/chartsAction";
import {connect} from "react-redux";


function CardLineChart(props) {

    const {dataLineChart} = props.dataLineChart;
    /// Call api
    useEffect(() => {
        props.getAllDataLineChart();
    }, [])


    useEffect(() => {
        var config = {
            type: "line",
            data: {
                labels: dataLineChart.date_time,
                datasets: [
                    {
                        label: "Đã tiêm",
                        backgroundColor: "#fff",
                        borderColor: "#36A2EB",
                        data: dataLineChart.injected,
                        // fill: false,
                        lineTension:0
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Vaccine Chart",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "#000",

                    },
                    align: "end",
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "#000", //rgba(255,255,255,.7),
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },

                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "#000", //rgba(255,255,255,.7),
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
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(33, 37, 41, 0.2)", //rgba(255, 255, 255, 0.15)
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },

                        },
                    ],
                },
            },
        };
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
    }, [dataLineChart.date_time, dataLineChart.injected]);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-white">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                                {/*Overview*/}
                            </h6>
                            <h2 className=" text-xl font-semibold">Dữ liệu tiêm theo ngày</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto bg-white">
                    {/* Chart */}
                    <div className="relative h-96">
                        <canvas id="line-chart" />
                    </div>
                </div>
            </div>
        </>
    );
}
const mapStateToProps = (state) => ({
    dataLineChart: state.chartsReducer,
});

const mapDispatchToProps = {
    getAllDataLineChart
};

export default connect(mapStateToProps, mapDispatchToProps)(CardLineChart);