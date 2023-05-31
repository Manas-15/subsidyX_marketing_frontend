import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";

const notFound = ({ data }) => {
  return (
    <Base>
      <NotFound data={data} />
    </Base>
  );
};

export default notFound;
