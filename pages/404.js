import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import withAuth from "@layouts/partials/withAuth";

const notFound = ({ data }) => {
  return (
    <Base>
      <NotFound data={data} />
    </Base>
  );
};

export default withAuth(notFound);
