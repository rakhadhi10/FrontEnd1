import React from "react";
import { compose } from "redux";
import { CardDasboard } from "../../component/CardDasboard";
import { CardTasksDashboard } from "../../component/CardTasksDashboard";
import { CardTodaysTrend } from "../../component/CardTodaysTrend";
import { CardUnresolvedTickets } from "../../component/CardUnresolvedTickets";
// import { dashboard } from "../routes/allowedRoles";
import withAuth from "../routes/hoc/withAuth";
// import withRole from "../routes/hoc/withRole";

export function DashboardPage() {
  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-row justify-between flex-wrap">
        <CardDasboard title="PAT">1</CardDasboard>
        <CardDasboard title="EWP">4</CardDasboard>
        <CardDasboard title="RPM">10</CardDasboard>
        <CardDasboard title="Aproval">8</CardDasboard>
      </div>
      <div className="flex flex-row justify-between flex-wrap py-8">
        <CardUnresolvedTickets />
        <CardTasksDashboard />
      </div>
      <CardTodaysTrend />
    </div>
  );
}

export default compose(
  withAuth,
  // withRole(dashboard)
)(DashboardPage)
