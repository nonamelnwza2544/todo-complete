import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import FormTodoList from "./FormAddTodo";
import { Dialog } from "primereact/dialog";

const CardTodo = () => {
  const url = "https://todo-list-35a8b-default-rtdb.firebaseio.com/Todo";
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [listTodo, setListTodo] = useState({});
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [form, setForm] = useState({});
  const [id, setId] = useState("");

  // ทำตอนแรกสุด
  useEffect(() => {
    GetTodo();
  }, []);

  // คอนเฟิมว่าจะลบนะ
  const confirmDelete = (key) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        deleteTodo(key);
      },
    });
  };

  // ลบข้อมูล
  const deleteTodo = async (key) => {
    setLoading(true);
    try {
      const request = await axios.delete(`${url}/${key}.json`);
      const response = await request;
      if (response.status === 200) {
        showToast("success", "Success", "insert Success");
      }
      GetTodo();
    } catch (error) {
      showToast("error", "Error", "insert Error");
    }
    // console.log(form);
    setLoading(false);
  };

  // ตัวแปรเอาไว้โชว์ card บนหน้าจอ
  const ListCardTodo = Object.keys(listTodo).map((key) => {
    return (
      <div key={key} className="p-col-align-start p-col-12 p-sm-12 p-lg-4">
        <Card
          className="card-todo-List"
          title={listTodo[key].header}
          subTitle={listTodo[key].detail}
          style={{
            margin: 10,
            height: 200,
            alignItems: "center",
          }}
        >
          <span className="button-in-card">
            <br />
            <Button
              onClick={() => {
                setForm(listTodo[key]);
                setId(key);
                setIsShowDialog(true);
              }}
              className="edit-button"
              icon="pi pi-pencil"
            />
            <Button
              onClick={() => {
                confirmDelete(key);
              }}
              icon="pi pi-times"
              className="del-button "
            />
          </span>
        </Card>
      </div>
    );
  });

  // ฟังชั่น โชว์ toast นะ
  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  // get ข้อมูลนะ
  const GetTodo = async () => {
    setLoading(true);
    try {
      const request = await axios.get(`${url}.json`);
      const response = await request;
      console.log(response);
      if (response.status === 200) {
        setListTodo(response.data);
      }
    } catch (error) {
      showToast("error", "Error", "insert Error");
    }
    // console.log(form);
    setLoading(false);
  };

  // ฟังชั่น Add ข้อมูลนะ
  const SubmitAddTodo = async (e, form) => {
    e.preventDefault();
    setLoading(true);
    try {
      const request = await axios.post(`${url}.json`, form);
      const response = await request;
      if (response.status === 200) {
        showToast("success", "Success", "insert Success");
      }
      GetTodo();
    } catch (error) {
      showToast("error", "Error", "insert Error");
    }
    // console.log(form);
    setLoading(false);
  };

  // ฟังชั่น Edit ข้อมูลนะ
  const SubmitEditTodo = async (e, form) => {
    e.preventDefault();
    setLoading(true);
    try {
      const request = await axios.put(`${url}/${id}.json`, form);
      const response = await request;
      if (response.status === 200) {
        showToast("success", "Success", "insert Success");
      }
      GetTodo();
    } catch (error) {
      showToast("error", "Error", "insert Error");
    }
    // console.log(form);
    setIsShowDialog(false);
    setLoading(false);
  };

  const header = (
    <div className="container">
      <h1 className="centered">Todo List!</h1>
    </div>
  );
  return (
    <div className="p-grid" style={{ margin: 50 }}>
      <Toast ref={toast} />
      <Dialog
        header="Header"
        visible={isShowDialog}
        style={{ width: 500 }}
        onHide={() => {
          setIsShowDialog(false);
        }}
      >
        <div className="p-grid" style={{ margin: 50 }}>
          <center>
            <FormTodoList
              className="p-col"
              //props.form
              form={form}
              onSubmit={SubmitEditTodo}
              loading={loading}
            />
          </center>
        </div>
      </Dialog>
      <Card
        className="p-col-4"
        subTitle="Add Your todo list"
        style={{ width: "25em", alignItems: "center", height: "fit-content" }}
        header={header}
      >
        <FormTodoList loading={loading} onSubmit={SubmitAddTodo} />
      </Card>
      <div className="p-col-8 p-md-6 p-sm-12 p-lg-8">
        <div className="p-grid p-align-start">{ListCardTodo}</div>
      </div>
    </div>
  );
};

export default CardTodo;
