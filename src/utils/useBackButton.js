import { useNavigate } from "react-router-dom";
const useBackButton = () => {
  const navigate = useNavigate();
  return (
    <button className="globalBackButton" onClick={() => navigate(-1)}>
      <i className="fas fa-chevron-left" title="Go Back"></i>
    </button>
  );
};

export default useBackButton;
