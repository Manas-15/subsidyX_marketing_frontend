import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { stateAction } from "redux/Actions/stateAction";
import { useDispatch } from "react-redux";
import { CongratulationsModal } from "../components/Modal";
import { alertActions } from "redux/Actions/alertAction";

const EligibleSubsidy = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [allState, setAllState] = useState([]);
  const [category, setCategory] = useState([]);
  const [sector, setSector] = useState([]);
  const [eligibleUserInfo, setEligibleUserInfo] = useState({
    mobileNumber: 9784596522,
    stateID: 0,
    industryCategoryID: 0,
    industrySectorID: 0,
  });

  let accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const callStateApi = async () => {
    const response = await fetch("http://13.232.213.101/state/", {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    dispatch(alertActions.error(data?.detail));
    setAllState(data);
  };
  const callCategoryApi = async () => {
    const response = await fetch("http://13.232.213.101/industry/industries", {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    dispatch(alertActions.error(data?.detail));

    setCategory(data);
  };
  //   const callSectorApi = async () => {
  //     const response = await fetch(
  //       "http://13.232.213.101/industry_sector/?page=1&page_size=10",
  //       {
  //         method: "GET",
  //         mode: "cors",
  //         credentials: "same-origin",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     setSector(data);
  //   };

  const allSector = [
    { id: 1, name: "Plastic" },
    { id: 2, name: "Pharma" },
    { id: 3, name: "Metal" },
    { id: 4, name: "Paper" },
    { id: 5, name: "Engineering" },
    { id: 6, name: "Agriculture" },
    { id: 7, name: "Chemical" },
    { id: 8, name: "Textile" },
  ];

  useEffect(() => {
    // dispatch(stateAction.getStateList);
    callStateApi();
    callCategoryApi();
    // callSectorApi();
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setEligibleUserInfo({ ...eligibleUserInfo, [name]: value });
  };

  const goToNext = async () => {
    const user_info = {
      mobile_number: eligibleUserInfo?.mobileNumber,
      state_id: eligibleUserInfo?.stateID,
      industry_category_id: eligibleUserInfo?.industryCategoryID,
      industry_sector_id: eligibleUserInfo?.industrySectorID,
    };
    console.log(user_info);
    setModalShow(true);
    // const response = await fetch(
    //   "http://192.168.2.115:1000/subsidy/eligible_subsidies",
    //   {
    //     method: "POST",
    //     mode: "cors",
    //     credentials: "same-origin",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user_info),
    //   }
    // );
    // const data = await response.json();
    // console.log(data);
  };

  return (
    <>
      {modalShow && (
        <CongratulationsModal
          // type={type}
          // action={action}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      <div className="col-12 inner-section ">
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
              {allState?.map((state, index) => (
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
              {category?.map((cat, index) => (
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
              {allSector?.map((sector, index) => (
                <option key={index} className="form-control" value={sector?.id}>
                  {sector?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 d-flex justify-content-center">
            <IoIosArrowDropleft
              style={{ fontSize: "50px", color: "#fa6130" }}
              onClick={(e) => goToNext(e)}
            />
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
