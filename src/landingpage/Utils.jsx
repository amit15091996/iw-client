import { useNavigate } from 'react-router-dom';
import './utils.css';

const Utils = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="card">
      <div className="header">
        <div className="image">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
            <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#000000"
                d="M20 7L9.00004 18L3.99994 13"
              ></path>
            </g>
          </svg>
        </div>
        <div className="content">
          <span className="title">Success</span>
          <p className="message">Please check your email to reset your password.</p>
        </div>
        <div className="actions">
          <button type="button" className="history" onClick={redirectToLogin}>
            BACK TO LOGIN ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Utils;