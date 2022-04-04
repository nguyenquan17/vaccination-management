import React from "react";

// components

import CardStats from "../Cards/CardStats";
import {getDataVaccines} from "../../../redux/actions/vaccinesAction";
import {reportsDataVaccinationPlaceAction} from "../../../redux/actions/reportsVaccinationPlaceAction";
import {connect} from "react-redux";

function HeaderStats(props) {

  const {dataReportsVaccinationPlace} = props.dataTable

  const myCount = ()=> {
    return dataReportsVaccinationPlace.reduce(function(sum, record){
      if(record.status.toString() === '2') {
        return sum + 1;
      } else{
        return sum
      }
    }, 0);

  }

  return (
    <>
      {/* Header */}
      <div className="relative bg-primary md:pt-20 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Số liều tiêm"
                  statTitle={dataReportsVaccinationPlace.length.toString()}
                  statIconName="fas fa-syringe"
                  statIconColor="bg-green"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Người tiêm"
                  statTitle={dataReportsVaccinationPlace.length.toString()}
                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Người đăng ký"
                  statTitle={myCount().toString()}
                  statIconName="fas fa-hospital-user"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  dataTable: state.reportsVaccinationPlaceReducer
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStats);