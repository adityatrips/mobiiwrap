import ReactLoading from "react-loading";

const CustomLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-nav-full">
      <ReactLoading type="spin" color="#666" height={50} width={50} />
    </div>
  );
};

export default CustomLoading;
