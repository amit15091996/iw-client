import "./spinner.css";
const Spinner = (props) => {

  // console.log({show});
  return props.show && (
    <div>
      <span className="loader"></span>
    </div>
  )
}; 

export default Spinner;
