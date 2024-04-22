import React from "react";

const ThemeCutomization = () => {
  return (
    <div>
      <div className="bg_white_card">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="input-field">
              <label htmlFor="theme">Choose template for your Invoice</label>
              <div className="select_grid">
                <label htmlFor="design1">
                  <input type="radio" name="theme" id="design1" />
                  <div className="content">
                    <h6>Design 1</h6>
                  </div>
                </label>
                <label htmlFor="design2">
                  <input type="radio" name="theme" id="design2" />
                  <div className="content">
                    <h6>Design 2</h6>
                  </div>
                </label>
                <label htmlFor="design3">
                  <input type="radio" name="theme" id="design3" />
                  <div className="content">
                    <h6>Design 3</h6>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="input-field">
              <label htmlFor="logo">logo position</label>
              <div className="select_grid">
                <label htmlFor="left">
                  <input type="radio" name="logo" id="left" />
                  <div className="content">
                    <h6>Left</h6>
                  </div>
                </label>
                <label htmlFor="center">
                  <input type="radio" name="logo" id="center" />
                  <div className="content">
                    <h6>Center</h6>
                  </div>
                </label>
                <label htmlFor="right">
                  <input type="radio" name="logo" id="right" />
                  <div className="content">
                    <h6>Right</h6>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCutomization;
