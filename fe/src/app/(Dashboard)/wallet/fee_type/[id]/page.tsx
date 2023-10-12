"use client";
import { getExpense, getExpenseList, getExpenseListAsync, updateExpenseAsync } from "@/redux/slices/expenseSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography, Box, FormControl, FormLabel } from "@mui/material";
import Select from "react-select";
const UpdateExpense = ({ params }: { params: { id: string } }) => {
  const expenseId = params.id;
  const expenseList = useAppSelector(getExpenseList);
  const expenseFromList = expenseList.find((expense) => String(expense.id) === String(expenseId));
  const typeName = useAppSelector((state) => state.expenseSlice.typeName);

  const [expense, setExpense] = useState(
    expenseFromList || {
      type: "",
      amount: "",
      date: "",
      id: expenseId,
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getExpenseListAsync());
  }, [expenseId, dispatch]);

  useEffect(() => {
    if (expenseList.length > 0) {
      const expenseFromList = expenseList.find((expense) => expense.id === expenseId);
      if (expenseFromList) {
        setExpense(expenseFromList);
      }
    }
  }, [expenseList, expenseId]);

  const handleChange = (e: any) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateExpenseAsync(expense));
  };

  const typeNameOptions = Object.entries(typeName).map(([id, name]) => ({
    value: id,
    label: `${id} - ${name}`,
  }));
  
  const handleStudentChange = (selectedOption: any) => {
    setExpense({
      ...expense,
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
    <div>
      <div className="container p-0">
        <form onSubmit={handleSubmit}>
          <Box mb={2} fontWeight="bold">
            <Typography>
              ID : <span style={{ color: "red" }}>{expenseId}</span>
            </Typography>
          </Box>

          <Grid item xs={6}>
          
            <Box mt={2}>
              <FormLabel>Loại chi phí</FormLabel>
              <Select
                options={typeNameOptions}
                isClearable
                onChange={handleStudentChange}
                value={typeNameOptions.find((option) => option.value === expense.type)}
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
                value={expense.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box mt={2 }>
            <TextField fullWidth label="Số tiền" variant="outlined" id="amount" name="amount" value={expense.amount} onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button type="submit" variant="contained" color="primary" style={{ marginRight: "1rem" }}>
                  Cập nhật
                </Button>
                <Button variant="outlined" component={Link} href="/wallet/expense">
                  Quay lại
                </Button>
              </Box>
            </Grid>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
