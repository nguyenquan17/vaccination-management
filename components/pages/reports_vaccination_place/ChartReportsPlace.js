import {useEffect} from "react";
import Chart from "chart.js";
import {reportsDataVaccinationPlaceAction} from "../../../redux/actions/reportsVaccinationPlaceAction";
import {connect} from "react-redux";

function ChartReportsPlace(props) {

    const {dataReportsVaccinationPlace} = props.dataTable

    useEffect(() => {
        if(dataReportsVaccinationPlace.length !== 0){
            if(window.myLine instanceof Chart)
            {
                window.myLine.destroy();
            }
            let dataChart = {}
            let currentYear = new Date().getFullYear()
            dataReportsVaccinationPlace.forEach(item => {
                let bodUser =new Date(item.dob * 1000).getFullYear()
                if(dataChart[currentYear-bodUser] === undefined){
                    dataChart[currentYear-bodUser] = 1
                }else{
                    dataChart[currentYear-bodUser] += 1
                }
            })
            dataChart = Object.fromEntries(Object.entries(dataChart).sort())
            let config = {
                type: "line",
                data: {
                    labels: Object.keys(dataChart),
                    datasets: [
                        {
                            label: "Số lượng tiêm theo độ tuổi",
                            backgroundColor: "#2088bc",
                            borderColor: "#2088bc",
                            data: Object.values(dataChart),
                            fill: false,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: false,
                        text: "Sales Charts",
                        fontColor: "white",
                    },
                    legend: {
                        labels: {
                            fontColor: "black",
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
                                label: "",
                                ticks: {
                                    fontColor: "#000",
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
                                label: "Số lượng",
                                ticks: {
                                    fontColor: "#000",
                                    precision: 0
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
                                    color: "#000",
                                    zeroLineColor: "rgba(33, 37, 41, 0)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                    },
                },
            };
            let ctx = document.getElementById("line-chart").getContext("2d");
            window.myLine = new Chart(ctx, config);
        }
    }, [dataReportsVaccinationPlace]);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Biểu đồ theo độ tuổi
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative" style={{"height":250}}>
                        <canvas id="line-chart"/>
                    </div>
                    <h6 className="text-center">Tổng tiêm: {dataReportsVaccinationPlace.length} người tiêm</h6>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    dataTable : state.reportsVaccinationPlaceReducer
});

const mapDispatchToProps = {
    reportsDataVaccinationPlaceAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartReportsPlace);