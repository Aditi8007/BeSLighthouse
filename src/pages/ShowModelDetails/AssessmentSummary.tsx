import Card from "@mui/material/Card";
import * as React from "react";
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import Grid from "@mui/material/Grid";
import { fetchJsonReport } from "../../utils/fatch_json_report";
import { besecureMlAssessmentDataStore } from "../../dataStore";
import { useLocation } from "react-router-dom";
import StaticAnalysisSummary from "./StaticAnalysisSummary";
import Divider from "@mui/material/Divider";
import AdversarialAttackSummary from "./AdversarialAttackSummary";

export const dividerDiv = (index: number) => {
  if (index !== 0) return <Divider sx={{ my: 1.5 }} />;
};

export const verifyLink = async (link: any, setLinkStatus: any) => {
  try {
    const response = await fetchJsonReport(link);
    try {
      let data = JSON.parse(response);
      setLinkStatus(data);
    } catch (err) {
      setLinkStatus({});
    }
  } catch (error) {
    setLinkStatus({});
  }
};

function displayModelReport(linkStatus: any) {
  return (
    <>
      <AdversarialAttackSummary />
      {dividerDiv(1)}
      <StaticAnalysisSummary data={linkStatus} />
    </>
  );
}

function assissmentReport(linkStatus: any) {
  return (
    <>
      <MKBox pt={2} px={3}>
        <MKTypography
          variant="h5"
          fontWeight="medium"
          style={{ textAlign: "center" }}
        >
          Assessment Summary
        </MKTypography>
      </MKBox>
      <MKBox p={2}>
        <Grid item xs={12}>
          {displayModelReport(linkStatus)}
        </Grid>
      </MKBox>
    </>
  );
}

function AssessmentSummary() {
  const [linkStatus, setLinkStatus]: any = React.useState({});

  const location = useLocation();
  const selectedMenu: any = location.state.selectedMenu;
  React.useEffect(() => {
    const link = `${besecureMlAssessmentDataStore}/${selectedMenu.name}/sast/${selectedMenu.name}-sast-summary-report.json`;
    verifyLink(link, setLinkStatus);
  }, []);
  return (
    <Card sx={{ height: "100%" }}>
      {Object.values(linkStatus).length > 0 ? (
        assissmentReport(linkStatus)
      ) : (
        <>
          <MKBox pt={2} px={3} sty>
            <MKTypography
              variant="h5"
              fontWeight="medium"
              style={{ textAlign: "center" }}
            >
              Assessment Summary
            </MKTypography>
          </MKBox>
          <MKTypography
            variant="h5"
            fontWeight="medium"
            style={{
              textAlign: "center",
              margin: "auto",
              paddingLeft: "26px",
              paddingRight: "26px"
            }}
          >
            Please raise a request if you would like to get this model
            validated.
          </MKTypography>
        </>
      )}
    </Card>
  );
}

export default AssessmentSummary;
