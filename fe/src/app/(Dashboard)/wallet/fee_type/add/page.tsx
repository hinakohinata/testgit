"use client";
import { createExpenseAsync, getTypeNameAsync } from "@/redux/slices/expenseSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Button, FormLabel, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

import Select from "react-select";
const AddExpense = () => {
  const [values, setValues] = useState({
    type: "",
    amount: "",
    date: "",
  });
  const dispatch = useAppDispatch();
  const typeName = useAppSelector((state) => state.expenseSlice.typeName);
  useEffect(() => {
      dispatch(getTypeNameAsync());
  }, []);
  // handle change values
  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createExpenseAsync(values));
  };
  // Biến danh sách  cho react-select
  const typeNameOptions = Object.entries(typeName).map(([id, name]) => ({
    value: id,
    label: `${id} - ${name}`,
  }));
  const handleStudentChange = (selectedOption: any) => {
    setValues({
      ...values,
      type: selectedOption ? selectedOption.value : "",
    });
  };
  
  const customStyles = {
    menuList: (provided: any, state: any) => ({
      ...provided,
      maxHeight: "100px", // Bạn có thể điều chỉnh giá trị này cho phù hợp
      overflowY: "auto",
    }),
  };

  return (
    <div className="container">
      <form className="bg-white p-5 border"  style={{maxWidth: 800}} onSubmit={handleSubmit} method="POST">
       
          <Grid item xs={6}>
          
            <Box mt={2}>
              <FormLabel>Loại chi phí</FormLabel>
              <Select
                options={typeNameOptions}
                isClearable
                onChange={handleStudentChange}
                value={typeNameOptions.find((option) => option.value === values.type)}
                placeholder="Chọn loại chi phí..."
                styles={customStyles}
              />
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                label="Ngày chi"
                variant="outlined"
                type="date"
                id="date"
                name="date"
                required
                value={values.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box mt={2 }>
            <TextField fullWidth label="Số tiền" variant="outlined" id="amount" name="amount" value={values.amount} onChange={handleChange} />
            </Box>
          </Grid>

          

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button type="submit" variant="contained" color="primary" style={{ marginRight: "1rem" }}>
                Thêm mới
              </Button>
              {/* Đảm bảo rằng bạn đã cài đặt và import `Link` từ `next/link` nếu bạn muốn sử dụng `Link` ở đây. */}
              <Button variant="outlined" component={Link} href="/wallet/expense">
                Quay lại
              </Button>
            </Box>
          </Grid>
       
      </form>
    </div>
  );
};

export default AddExpense;
