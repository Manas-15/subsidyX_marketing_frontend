import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { stateAction } from "redux/Actions/stateAction";
import { useDispatch, useSelector } from "react-redux";
import { CongratulationsModal } from "../components/Modal";
import { categoryAction } from "redux/Actions/categoryAction";
import { sectorAction } from "redux/Actions/sectorAction";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";
import Loader from "./Loader";

const EligibleSubsidy = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [eligibleUserInfo, setEligibleUserInfo] = useState({
    mobileNumber: 9784596522,
    stateID: 0,
    industryCategoryID: 0,
    industrySectorID: 0,
  });

  const allStates = useSelector((state) => state?.state?.state);
  const allCategories = useSelector(
    (state) => state?.industryCategory?.category
  );
  const allSectors = useSelector((state) => state?.industrySector?.sector);

  const eligibleSubsidy = useSelector(
    (state) => state?.eligibleSubsidy?.eligible_subsidy
  );

  useEffect(() => {
    dispatch(stateAction.getStateList());
    dispatch(categoryAction.getCategoryList());
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setEligibleUserInfo({ ...eligibleUserInfo, [name]: value });

    if (name === "industryCategoryID") {
      dispatch(sectorAction.getSectorList(value));
    }
  };

  const goToNext = async () => {
    const data = {
      user_info: {
        mobile_number: eligibleUserInfo?.mobileNumber,
        state_id: eligibleUserInfo?.stateID,
        industry_category_id: eligibleUserInfo?.industryCategoryID,
        industry_sector_id: eligibleUserInfo?.industrySectorID,
      },
    };
    console.log(data);
    if (
      eligibleUserInfo?.stateID !== 0 ||
      eligibleUserInfo?.industryCategoryID !== 0 ||
      eligibleUserInfo?.industrySectorID !== 0
    ) {
      // setIsLoading(true);
      dispatch(eligibleSubsidyAction.getEligible(data));
      dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
    }
  };
  useEffect(() => {
    if (eligibleSubsidy !== undefined && eligibleSubsidy !== null) {
      // setIsLoading(false);
      console.log("showwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
      setModalShow(true);
    }
  }, [eligibleSubsidy]);

  return (
    <>
      {modalShow && (
        <CongratulationsModal
          // type={type}
          action={eligibleSubsidy}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      <div className="col-12 inner-section ">
        {/* {isLoading && <Loader />} */}

        <div className="d-flex justify-content-center mt-5 mb-5">
          <h2 className="fw-bold text-dark">
            Hey!! Do you have Udyam Aadhar Number or GST Number?
          </h2>
        </div>
        <div style={{ margin: "auto" }}>
          <div className="d-flex justify-content-center">
            <select
              className="form-control mb-3 w-25"
              name="stateID"
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
          <div className="mt-5 d-flex justify-content-center">
            {/* <IoIosArrowDropleft
              style={{ fontSize: "50px", color: "#fa6130" }}
              onClick={(e) => goToNext(e)}
            /> */}
            <IoIosArrowDropright
              style={{ fontSize: "50px", color: "#fa6130" }}
              onClick={(e) => goToNext(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EligibleSubsidy;
