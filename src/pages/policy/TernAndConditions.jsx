import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import Meta from "../../components/Meta";

const TernAndConditions = () => {
  return (
    <>
      <Meta title={"Tern And Conditions"} />
      <BreadCrumb title="Tern And Conditions" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TernAndConditions;
