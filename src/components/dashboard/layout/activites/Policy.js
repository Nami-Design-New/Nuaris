import React, { useState } from "react";
import CancellationPolicy from "../shared/CancellationPolicy";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const Policy = ({ setForm }) => {
  const [loading, setLoading] = useState(false);

  const [weatherEditorState, setWeatherEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [rulesEditorState, setRulesEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [allowedItemsEditorState, setAllowedItemsEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const cancelationCountInitial = {
    cancel_before: "",
    percentage: "",
    type: "select"
  };
  const [formData, setFormData] = useState({
    cancellation_policy: [cancelationCountInitial]
  });

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Prices");
  };

  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Renting Policy & Cancellation Policy</h6>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Weather Restriction</label>
            <Editor
              editorState={weatherEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setWeatherEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Rules and instructions</label>
            <Editor
              editorState={rulesEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setRulesEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Allowed and not allowed items on board</label>
            <Editor
              editorState={allowedItemsEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setAllowedItemsEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <CancellationPolicy
          formData={formData}
          setFormData={setFormData}
          cancelationCountInitial={cancelationCountInitial}
        />
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            className="save_btn ms-auto"
            loading={loading}
            name="Save"
          />
        </div>
      </div>
    </form>
  );
};

export default Policy;
