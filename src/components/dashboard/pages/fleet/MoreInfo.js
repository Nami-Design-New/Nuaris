import React from "react";
import CheckItems from "../../../ui/form-elements/CheckItems";

const MoreInfo = () => {
  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form-ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Amenities & Inclusions</h6>
              <p className="topography">
                (max 6 Feature will be Display on Link display)
              </p>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card">
        <form className="form-ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Navigation and Safety</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card">
        <form className="form-ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Salons and Cabins</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card">
        <form className="form-ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Entertainment</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card">
        <form className="form-ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Complimentary Inclusions</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg_white_card">
        <form className="form-ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Connectivity</h6>
              <div className="elements">
                {Array(20)
                  .fill(0)
                  .map((i) => (
                    <CheckItems key={i} label="Test" name={i} />
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MoreInfo;
