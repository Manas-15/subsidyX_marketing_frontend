import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Image from "next/image";
import Link from "next/link";
import Slider from "layouts/components/Slider/slider";
import Portfolio from "layouts/components/Slider/portfolio";
import greatBenifitImg from "../public/images/great_benifits.png";
import hugeBenifitImg from "../public/images/huge_benifits.png";
import centralAndStateGif from "../public/images/central_and_state.gif";
import afthoniaImg from "../public/images/afthonialogo.png";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { title } = config.site;

  useEffect(() => {
    const extraData = {
      next: false,
      path: "",
    };
    dispatch(eligibleSubsidyAction.benefitsData(extraData));
  }, []);

  const itesBenefit = () => {
    console.log("itesBenefits clicked");
    const data = {
      user_info: {
        mobile_number: 9784596522,
        state_id: 12,
        industry_category_id: 20,
        industry_sector_id: 32,
      },
    };
    const extraData = {
      next: true,
      path: "questions-after-eligible",
    };
    if (data) {
      dispatch(eligibleSubsidyAction.benefitsData(extraData));
      // dispatch(eligibleSubsidyAction.getEligible(data));
      dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
      router.push("/questions-after-eligible");
    }
  };
  const msmeBenefit = () => {
    console.log("msmeBenifits clicked");
    const data = {
      user_info: {
        mobile_number: 9784596522,
        state_id: 12,
        industry_category_id: 0,
        industry_sector_id: 0,
      },
    };
    const extraData = {
      next: true,
      path: "questions-after-eligible",
    };

    if (data) {
      dispatch(eligibleSubsidyAction.benefitsData(extraData));
      // dispatch(eligibleSubsidyAction.getEligible(data));
      dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
      router.push("/questions-after-eligible");
    }
  };
  const electronicsBenefit = () => {
    console.log("electronicsBenefit clicked");
    const data = {
      user_info: {
        mobile_number: 9784596522,
        state_id: 12,
        industry_category_id: 18,
        industry_sector_id: 17,
      },
    };
    const extraData = {
      next: true,
      path: "questions-after-eligible",
    };
    if (data) {
      dispatch(eligibleSubsidyAction.benefitsData(extraData));
      // dispatch(eligibleSubsidyAction.getEligible(data));
      dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
      router.push("/questions-after-eligible");
    }
  };
  const textileBenefit = () => {
    console.log("electronicsBenefit clicked");
    const data = {
      user_info: {
        mobile_number: 9784596522,
        state_id: 12,
        industry_category_id: 18,
        industry_sector_id: 16,
      },
    };
    const extraData = {
      next: true,
      path: "questions-after-eligible",
    };
    if (data) {
      dispatch(eligibleSubsidyAction.benefitsData(extraData));
      // dispatch(eligibleSubsidyAction.getEligible(data));
      dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
      router.push("/questions-after-eligible");
    }
  };
  const centralBenefit = () => {
    console.log("central benifit clicked");
    const data = {
      user_info: {
        mobile_number: 9784596522,
        state_id: 0,
        industry_category_id: 0,
        industry_sector_id: 0,
      },
    };
    const extraData = {
      next: true,
      path: "questions-after-eligible",
    };
    if (data) {
      dispatch(eligibleSubsidyAction.benefitsData(extraData));
      // dispatch(eligibleSubsidyAction.getEligible(data));
      dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
      router.push("/questions-after-eligible");
    }
  };

  return (
    <Base title={title}>
      <Slider />
      <section className="cmn_sec_pad our_feature_sec" id="features">
        <div className="container">
          <h2 className="cmn_h2_heading text-center">
            <span className="col_blue"> OUR</span>
            <span className="col_orng"> FEATURES</span>
          </h2>
          <div className="row">
            <div className="col-md-3">
              <div className="card feature_card text-center">
                <div className="card-body feature_card_body ">
                  <figure>
                    <Image
                      src="/images/comprehensive_database.png"
                      width="180"
                      height="180"
                      alt="comprehensive database"
                    />
                  </figure>
                  <h3 className="cmn_h3_heading pb-4">
                    Comprehensive Database
                  </h3>
                  <div className="crd_content">
                    <p>
                      SubsidyX contains a comprehensive database of subsidies at
                      the state and central level, enabling users to easily
                      search for applicable subsidies based on their industry
                      and business type.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card feature_card text-center">
                <div className="card-body feature_card_body ">
                  <figure>
                    <Image
                      src="/images/clear_eligibility_criteria.png"
                      width="180"
                      height="180"
                      alt="clear eligibility criteria"
                    />
                  </figure>
                  <h3 className="cmn_h3_heading pb-4">
                    Clear Eligibility Criteria
                  </h3>
                  <div className="crd_content">
                    <p>
                      SubsidyX provides clear eligibility criteria for each
                      subsidy, allowing users to quickly determine if they
                      qualify for a particular subsidy or incentive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card feature_card">
                <div className="card-body feature_card_body text-center">
                  <figure>
                    <Image
                      src="/images/personalized_advice.png"
                      width="180"
                      height="180"
                      alt="personalized advice"
                    />
                  </figure>
                  <h3 className="cmn_h3_heading pb-4">Personalized Advice</h3>
                  <div className="crd_content">
                    <p>
                      SubsidyX offers personalized advice and guidance to
                      start-ups, MSMEs, and large entrepreneurs, helping them
                      navigate the complex world of government incentives and
                      subsidies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card feature_card text-center">
                <div className="card-body feature_card_body ">
                  <figure>
                    <Image
                      src="/images/comparative_analysis.png"
                      width="180"
                      height="180"
                      alt=""
                    />
                  </figure>
                  <h3 className="cmn_h3_heading pb-4">Comparative Analysis</h3>
                  <div className="crd_content">
                    <p>
                      SubsidyX provides detailed reports that outline all
                      eligible subsidies and benefits, allowing users to better
                      understand, analyze, and plan their business growth
                      strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmn_sec_pad incentive_sec_ites">
        <div className="container">
          <div className="ites_part">
            <h2 className="cmn_h2_heading text-center">
              <span className="col_blue">INCENTIVES TO </span>
              <span className="col_orng">IT/ITeS </span>
              <span className="col_blue">COMPANIES IN </span>
              <span className="col_orng">GUJARAT </span>
            </h2>
            <div className="row incen_row_content">
              <div className="col-md-7 text-center">
                <div className="incen_content">
                  <p>
                    Are you an IT / ITeS Unit looking for incentives from
                    Gujarat Government!!
                  </p>
                </div>
                <div
                  className="btn btn-primary lo_ck_btn"
                  onClick={() => itesBenefit()}
                >
                  CHECK YOUR BENEFITS
                </div>
              </div>
              <div className="col-md-5">
                <figure>
                  <Image
                    src="/images/incentives_to_it.png"
                    width="351"
                    height="359"
                    alt="incentives to it"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmn_sec_pad incentive_sec_msme">
        <div className="container">
          <div className="ites_part">
            <h2 className="cmn_h2_heading text-center">
              <span className="col_orng">MSME INCENTIVES </span>
              <span className="col_blue">BY GUJARAT GOVERNMENTS </span>
            </h2>
            <div className="row incen_row_content">
              <div className="col-md-5 ">
                <figure className="pt-2">
                  <Image
                    src="/images/msme_incentives.png"
                    width="351"
                    height="359"
                    alt="msme incentives"
                  />
                </figure>
              </div>
              <div className="col-md-7 text-center">
                <div>
                  <p className="incen_content">
                    Maximize your potential with Gujarats MSME incentives -
                    Check your benefits now and take your business to new
                    heights!
                  </p>
                </div>
                <div
                  className="btn btn-primary lo_ck_btn"
                  onClick={() => msmeBenefit()}
                >
                  CHECK YOUR BENEFITS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmn_sec_pad incentive_sec_ites">
        <div className="container">
          <div className="ites_part">
            <h2 className="cmn_h2_heading text-center">
              <span className="col_blue">GREAT BENEFITS IN </span>
              <span className="col_orng">ELECTRONICS </span>
              <span className="col_blue">SECTOR </span>
            </h2>
            <div className="row incen_row_content">
              <div className="col-md-7 text-center">
                <div>
                  <p className="incen_content">
                    Join the electronics revolution and take advantage of
                    Gujarat Government support for your unit
                  </p>
                </div>
                <div
                  className="btn btn-primary lo_ck_btn"
                  onClick={() => electronicsBenefit()}
                >
                  CHECK YOUR BENEFITS
                </div>
              </div>
              <div className="col-md-5">
                <figure>
                  <Image
                    src={greatBenifitImg?.src}
                    width="351"
                    height="359"
                    alt="great benifits"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmn_sec_pad incentive_sec_msme">
        <div className="container">
          <div className="ites_part">
            <h2 className="cmn_h2_heading text-center">
              <span className="col_blue">HUGE BENEFITS IN </span>
              <span className="col_orng">TEXTILE </span>
              <span className="col_blue">SECTOR </span>
            </h2>
            <div className="row incen_row_content">
              <div className="col-md-5 ">
                <figure>
                  <Image
                    src={hugeBenifitImg?.src}
                    width="351"
                    height="359"
                    alt=""
                  />
                </figure>
              </div>
              <div className="col-md-7 text-center">
                <div>
                  <p className="incen_content">
                    Revitalize your textile business - Gujarat Governments
                    incentives can help you grow and expand your unit like never
                    before.
                  </p>
                </div>
                <div
                  className="btn btn-primary lo_ck_btn"
                  onClick={() => textileBenefit()}
                >
                  CHECK YOUR BENEFITS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmn_sec_pad incentive_sec_ites">
        <div className="container">
          <div className="ites_part">
            <h2 className="cmn_h2_heading text-center">
              <span className="col_orng">CENTRAL AND STATE </span>
              <span className="col_blue">GOVERNMENT BENEFITS </span>
            </h2>
            <div className="row incen_row_content">
              <div className="col-md-7 text-center">
                <div>
                  <p className="incen_content">
                    Discover your eligibility for government subsidies - Check
                    your benefit report today and unlock the potential for your
                    business!
                  </p>
                </div>
                <div
                  className="btn btn-primary lo_ck_btn"
                  onClick={() => centralBenefit()}
                >
                  CHECK YOUR BENEFITS
                </div>
              </div>
              <div className="col-md-5">
                <figure>
                  <Image
                    src={centralAndStateGif?.src}
                    width="400"
                    height="359"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmn_sec_pad incentive_sec_msme">
        <div className="container">
          <div className="ites_part">
            <h2 className="cmn_h2_heading text-center">
              <span className="col_blue">PROUDLY INCUBATED AT </span>
              {/* <span className="col_orng">TEXTILE </span>
              <span className="col_blue">SECTOR </span> */}
            </h2>
            <div className="row incen_row_content">
              <div className="col-md-5 ">
                <figure>
                  <Image
                    src={afthoniaImg?.src}
                    width="351"
                    height="359"
                    alt=""
                  />
                </figure>
              </div>
              <div className="col-md-7 text-center">
                <div>
                  <p className="incen_content">
                    Revitalize your textile business - Gujarat Governments
                    incentives can help you grow and expand your unit like never
                    before.
                  </p>
                </div>
                <div
                  className="btn btn-primary lo_ck_btn"
                  // onClick={() => msmeBenefit()}
                >
                  CHECK YOUR BENEFITS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};
export default Home;
