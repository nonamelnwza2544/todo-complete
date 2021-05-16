import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";

const FormTodoList = (props) => {
  const [form, setForm] = useState({ header: "", detail: "" });
  const [enableButton, setEnableButton] = useState(true);

  useEffect(() => {
    setForm({ ...props.form });
  }, [props.form]);

  useEffect(() => {
    if (!form.header) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [form]);

  return (
    <form
      onSubmit={(e) => {
        props.onSubmit(e, form);
        setForm({ header: "", detail: "" });
      }}
    >
      <div className="p-grid p-justify-start">
        <div className="p-col">
          <span className="p-input-icon-left">
            <i className="pi pi-align-center" />
            <InputText
              value={form.header}
              onChange={(e) => {
                setForm({ ...form, header: e.target.value });
              }}
              style={{ width: 300 }}
              placeholder="Add Header Event"
            />
          </span>
        </div>
        <div className="p-col">
          <span className="p-input-icon-left">
            <i className="pi pi-align-center" />
            <InputText
              value={form.detail}
              onChange={(e) => {
                setForm({ ...form, detail: e.target.value });
              }}
              style={{ width: 300 }}
              placeholder="Add Detail Event"
            />
          </span>
        </div>

        <div className="p-col">
          <Button
            type="submit"
            label="Submit"
            loading={props.loading}
            disabled={enableButton}
            style={{ backgroundColor: "indianred", width: 300 }}
            className="p-button-rounded"
          />
        </div>
      </div>
    </form>
  );
};

export default FormTodoList;
