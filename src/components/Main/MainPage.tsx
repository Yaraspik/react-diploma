import Hits from "../Hits/Hits.tsx";
import Catalog from "../Catalog/Catalog.tsx";

const MainPage = () => {
  return (
    <>
      <Hits />
      <Catalog disabledSearch={true} />
    </>
  );
};

export default MainPage;
