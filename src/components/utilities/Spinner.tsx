type Prop = {
  className?: string;
};
const LoadingSpinner = ({ className }: Prop) => {
  return (
    <div className={` loading-spinner-container {${className}} `}>
      <div className={` loading-spinner`}></div>
    </div>
  );
};

export default LoadingSpinner;
