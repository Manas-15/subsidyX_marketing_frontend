import Base from "@layouts/Baseof";

const AboutUs = ({ data }) => {
  return (
    <Base
      title={"About Us"}
      description={"dgfdfsdfsffsfd"}
      meta_title={"meta_title"}
      image={"image"}
      noindex={"noindex"}
      canonical={"canonical"}
    >
      <section className="section bg-inner">
        <div
          className="container pt-4 pb-4"
          style={{ color: "#04032b", height: "760px", overflowY: "scroll" }}
        >
          <h1 className="d-flex justify-content-center ">
            <strong>ABOUT US</strong>
          </h1>

          <p>
            SubsidyX is a highly advanced, tech based platform which can provide
            details of applicable government incentives within just a few
            minutes, by a click of a button. The SubsidyX Portal is designed and
            engineered in a manner to navigate the way through complex
            calculations of incentives as per their applicability, and provide
            amount of benefits available as per information provided. Our team
            of highly experienced and qualified professionals has a deep
            understanding of the government's subsidy schemes and has worked
            upon preparing a portal which can compute subsidy benefits by
            analyzing the data provided
          </p>

          <p>
            We also aim to provide consultancy services to get the various
            benefits/subsidy available from the central as well as state
            governments to our clients in such a way that our clients get the
            maximum benefit.
          </p>

          <p>
            Our biggest strength is the use of Technology which has been put
            into place to digitize the entire process of subsidy application.
            This Portal shall be a single stop for all the various subsidy
            applications for a client. Whether it be uploading the documents
            required, submitting queries or replies, or checking the status of
            their application, all these information is available on a single
            place; that is SubsidyX Portal. The client is therefore free from
            the tiresome work of logging into different portals for different
            applications to know their application status.
          </p>

          <p>
            We are committed to providing our clients with the highest quality
            of service and the most up-to-date information on government
            subsidies. We understand that starting or growing a business can be
            a daunting task, and we are here to help you in availing a secured
            way of finance in the form of Government Subsidy.
          </p>

          <p>
            We are a team of experienced and qualified professionals who are
            passionate about helping entrepreneurs fulfill their financial
            needs. We understand the challenges that you face and are committed
            to providing you with the support and guidance you need to achieve
            your goals. We are having a team of specialized persons exclusively
            for the Government Subsidies and Benefits. We are a professionally
            qualified team consisting of CA, MBA, CS, and other experts having
            in-depth knowledge about Rules and Regulations of various
            Governments, Semi-Governments Agencies. We also have our own network
            of trusted partners who are highly skilled and trained by our in
            house team to guide the clients in the best possible manner.
          </p>

          <h1 className="d-flex justify-content-center ">
            <strong>VISION</strong>
          </h1>

          <p className="d-flex justify-content-center ">
            To be the leading global platform for businesses seeking to leverage
            Government Incentives.
          </p>

          <h1 className="d-flex justify-content-center ">
            <strong>MISSION</strong>
          </h1>

          <p className="d-flex justify-content-center ">
            Empower Businesses to discover, navigate, and capitalize on
            Government Incentives Effectively
          </p>
        </div>
      </section>
    </Base>
  );
};

export default AboutUs;
