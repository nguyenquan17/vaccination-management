import {useEffect} from "react";
import Chart from "chart.js";
import {reportsDataVaccinationPlaceAction} from "../../../redux/actions/reportsVaccinationPlaceAction";
import {connect} from "react-redux";
import randomColor from "randomcolor";

function PieChartReportPlace(props) {

    const {dataReportsVaccinationPlace} = props.dataTable

    useEffect(() => {
        if(dataReportsVaccinationPlace.length !== 0){
            if(window.myPie instanceof Chart)
            {
                window.myPie.destroy();
            }
            let dataChart = {}
            let listColor = []
            dataReportsVaccinationPlace.forEach(item => {
                if(dataChart[item.id_vaccine] === undefined){
                    dataChart[item.id_vaccine] = {
                        value: 1,
                        name: item.name_vaccine
                    }
                }else{
                    dataChart[item.id_vaccine].value += 1
                }
            })
            Object.keys(dataChart).forEach(item => {
                listColor.push(randomColor())
            })
            const data = {
                labels: Object.values(dataChart).map(item => item.name),
                datasets: [
                    {
                        label: 'Tỷ lệ',
                        data: Object.values(dataChart).map(item => item.value),
                        backgroundColor: listColor,
                    }
                ]
            };
            let config = {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Tỷ lệ tiêm các loại vacxin',
                            fontColor: "black",
                        }
                    }
                },
            };
            let ctx = document.getElementById("pie-chart").getContext("2d");
            window.myPie = new Chart(ctx, config);
        }else{
            if(window.myPie instanceof Chart)
            {
                window.myPie.destroy();
            }
        }
    }, [dataReportsVaccinationPlace]);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Biểu đồ theo lượng vacxin
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative" style={{"height": 250}}>
                        <canvas id="pie-chart"/>
                    </div>
                    <h6 className="text-center">Tổng tiêm: {dataReportsVaccinationPlace.length} liều</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(PieChartReportPlace);