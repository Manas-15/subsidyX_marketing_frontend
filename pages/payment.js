import Base from "@layouts/Baseof";
import { CustomButton } from "@layouts/components/CustomButton";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Payment = () => {
  const router = useRouter();

  const handlePayNow = () => {
    router.push("/report/final-report");
  };
  return (
    <>
      <Base
        title={"title"}
        description={"dgfdfsdfsffsfd"}
        meta_title={"meta_title"}
        image={"image"}
        noindex={"noindex"}
        canonical={"canonical"}
      >
        <div className="col-12 inner-section ">
          {/* {isLoading && <Loader />} */}

          <div className="d-flex justify-content-center mt-5 mb-5">
            <h2 className="fw-bold text-dark">
              Awesome!! Your report is ready. Kindly complete <br />
              the payment to access your report.
            </h2>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ margin: "auto" }}
          >
            <CustomButton
              name="Pay Now"
              color="#FFFFFF"
              height="50px"
              width="200px"
              bgColor="#FA6130"
              onClick={(e) => handlePayNow(e)}
            />
          </div>
          <div className="mt-5">
            <h6 className="text-dark d-flex justify-content-center">
              NOT READY TO PAY YET &nbsp;{" "}
              <Link
                href="#"
                className="text-primary"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                SAVE AND GO BACK{" "}
              </Link>
            </h6>
            {/* <IoIosArrowDropleft
              style={{ fontSize: "50px", color: "#fa6130" }}
              onClick={(e) => goToNext(e)}
            /> */}
            {/* <IoIosArrowDropright
              style={{ fontSize: "50px", color: "#fa6130", cursor: "pointer" }}
              onClick={(e) => goToNext(e)}
            /> */}
          </div>
        </div>
      </Base>
    </>
  );
};

export default Payment;
