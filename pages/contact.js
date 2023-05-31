import config from "@config/config.json";
import Base from "@layouts/Baseof";
const Contact = ({ data }) => {
  return (
    <Base
      title={"title"}
      description={"dgfdfsdfsffsfd"}
      meta_title={"meta_title"}
      image={"image"}
      noindex={"noindex"}
      canonical={"canonical"}
    >
      <section className="section bg-inner">
        <div className="container">
          <div className="section row pb-0">
            <div className="col-12 inner-section">
              <div className="row">
                <div className="col-md-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777315.094822953!2d68.68432052415811!3d22.399488637279987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959051f5f0ef795%3A0x861bd887ed54522e!2sGujarat!5e0!3m2!1sen!2sin!4v1684931772798!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="col-md-6">
                  <form method="post">
                    <h3>Drop Us a Message</h3>
                    <div className="row pt-3">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="txtName"
                            className="form-control"
                            placeholder="Your Name *"
                            value=""
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="txtEmail"
                            className="form-control"
                            placeholder="Your Email *"
                            value=""
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            required
                            type="text"
                            name="txtPhone"
                            className="form-control"
                            placeholder="Your Phone Number *"
                            value=""
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            rows="5"
                            name="txtMsg"
                            className="form-control"
                            placeholder="Your Message"
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            name="btnSubmit"
                            className="btn btn-primary up_sld_btn"
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div classNameName="content col-12 md:col-6 lg:col-5"></div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Contact;
