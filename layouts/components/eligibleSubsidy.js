import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { stateAction } from "redux/Actions/stateAction";
import { useDispatch, useSelector } from "react-redux";
import { categoryAction } from "redux/Actions/categoryAction";
import { sectorAction } from "redux/Actions/sectorAction";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";
import CongratulationsModal from "./Modal";
// import Loader from "./Loader";

const EligibleSubsidy = ({ edit, setNext, setSelectedRadioButton }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [subsidyType, setSubsidyType] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [selectedInformation, setSelectedInformation] = useState({
    stateID: "",
    industryCategoryID: "",
    industrySectorID: "",
  });
  const [eligibleUserInfo, setEligibleUserInfo] = useState({
    mobileNumber: 9784596522,
    stateID: 0,
    industryCategoryID: 0,
    industrySectorID: 0,
  });

  const allStates = useSelector((state) => state?.state?.state?.states);

  const allCategories = useSelector(
    (state) => state?.industryCategory?.category
  );
  const allSectors = useSelector((state) => state?.industrySector?.sector);
  const eligibleSubsidy = useSelector(
    (state) => state?.eligibleSubsidy?.eligible_subsidy
  );
  const selectedData = useSelector(
    (state) => state?.eligibleSubsidy?.selected_data?.user_info
  );

  useEffect(() => {
    dispatch(stateAction.getStateList({ pagination: { page, pageSize } }));
    dispatch(categoryAction.getCategoryList());
  }, []);

  useEffect(() => {
    if (edit === "editEligibleSubsidy") {
      setEligibleUserInfo({
        mobileNumber: selectedData?.mobile_number,
        stateID: selectedData?.state_id,
        industryCategoryID: selectedData?.industry_category_id,
        industrySectorID: selectedData?.industry_sector_id,
      });
    }
  }, [edit]);

  const handleSelectChange = (e) => {
    setSubsidyType("fetchEligibleSubsidy");
    const { name, value } = e.target;
    const selectedOption = e.target.options[e.target.selectedIndex];
    // console.log(selectedOption?.text);
    setSelectedInformation({
      ...selectedInformation,
      [name]: selectedOption?.text,
    });

    setEligibleUserInfo({ ...eligibleUserInfo, [name]: parseInt(value) });
    if (name === "industryCategoryID") {
      dispatch(sectorAction.getSectorList(value));
    }

    // if (name === "industrySectorID") {
    //   const selectedData = {
    //     stateID: selectedInformation?.stateID,
    //     industryCategoryID: selectedInformation?.industryCategoryID,
    //     industrySectorID: selectedOption?.text,
    //   };

    //   const data = {
    //     user_info: {
    //       mobile_number: eligibleUserInfo?.mobileNumber,
    //       state_id: eligibleUserInfo?.stateID,
    //       industry_category_id: eligibleUserInfo?.industryCategoryID,
    //       industry_sector_id: value,
    //     },
    //   };

    //   dispatch(eligibleSubsidyAction.getEligible(data));
    //   dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
    //   dispatch(
    //     eligibleSubsidyAction.selectedInformationForEligibleSubsidy(
    //       selectedData
    //     )
    //   );
    // }
  };

  const goToNext = () => {
    const data = {
      user_info: {
        mobile_number: eligibleUserInfo?.mobileNumber,
        state_id: parseInt(eligibleUserInfo?.stateID),
        industry_category_id: parseInt(eligibleUserInfo?.industryCategoryID),
        industry_sector_id: parseInt(eligibleUserInfo?.industrySectorID),
      },
    };
    if (
      eligibleUserInfo?.stateID !== 0 ||
      eligibleUserInfo?.industryCategoryID !== 0 ||
      eligibleUserInfo?.industrySectorID !== 0
    ) {
      dispatch(eligibleSubsidyAction.getEligible(data));
      dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
      dispatch(
        eligibleSubsidyAction.selectedInformationForEligibleSubsidy(
          selectedInformation
        )
      );
      setModalShow(true);
    }
  };
  useEffect(() => {
    if (
      subsidyType === "fetchEligibleSubsidy" &&
      eligibleSubsidy !== undefined &&
      eligibleSubsidy !== null &&
      Object.keys(eligibleSubsidy).length !== 0
    ) {
      setModalShow(true);
    }
    if (
      eligibleSubsidy?.status === 408 &&
      eligibleSubsidy?.subsidies?.length === 0
    ) {
      setModalShow(true);
      setType("warn");
      // setReportID(subsidyData?.eligible_subsidy?.report_id);
    }
  }, [eligibleSubsidy]);

  return (
    <>
      {modalShow && (
        <CongratulationsModal
          type={type}
          setType={setType}
          action={eligibleSubsidy}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
          setNext={setNext}
          setSelectedRadioButton={setSelectedRadioButton}
        />
      )}
      <div className="col-12 inner-section ">
        {/* {isLoading && <Loader />} */}

        <div className="d-flex justify-content-center mt-5 mb-5">
          <h2 className="fw-bold text-dark">
            Please Select State, Industry Category and Industry Sector
          </h2>
        </div>
        <div style={{ margin: "auto" }}>
          <div className="d-flex justify-content-center">
            <select
              className="form-control mb-3 w-25"
              name="stateID"
              value={eligibleUserInfo?.stateID}
              onChange={(e) => handleSelectChange(e)}
            >
              <option value="none">Select State</option>

              {allStates?.map((state, index) => (
                <option key={index} className="form-control" value={state?.id}>
                  {state?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <select
              className="form-control mb-3 w-25 mx-3"
              name="industryCategoryID"
              value={eligibleUserInfo?.industryCategoryID}
              onChange={(e) => handleSelectChange(e)}
            >
              <option value="none">Select Industry Category</option>
              {allCategories?.map((cat, index) => (
                <option className="form-control" value={cat?.id}>
                  {cat?.name}
                </option>
              ))}
            </select>

            <select
              className="form-control mb-3 w-25"
              name="industrySectorID"
              value={eligibleUserInfo?.industrySectorID}
              onChange={(e) => handleSelectChange(e)}
            >
              <option value="none">Select Industry Sector</option>
              {allSectors?.sectors?.map((sector, index) => (
                <option key={index} className="form-control" value={sector?.id}>
                  {sector?.name}
                </option>
              ))}
            </select>
          </div>
          <span className="mt-5 d-flex justify-content-center">
            {/* <IoIosArrowDropleft /> */}
            <IoIosArrowDropright
              style={{ fontSize: "50px", color: "#fa6130", cursor: "pointer" }}
              onClick={(e) => goToNext(e)}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default EligibleSubsidy;
