
"use client"
// import React, { useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// // import MyCarousel from '../components/Carousel';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { getRole, selectIsLoggedIn } from '@/redux/slices/userSlice';
// import { useSelector } from 'react-redux';
// import Header from '@/component/Header';
import { checkRole } from '../authen/checkRole';
// import AccountAll from '@/component/AccountAll';

// const RegisterPage = () => {
  
//   // checkRole(1);

//   return (
//     <main>
//       <AccountAll/>

//     </main>
//   );
// };

// export default RegisterPage;
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FileUploadForm() {
      checkRole(1);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
        console.log("selectedFile",selectedFile,file)
    };

    const handleUpload = () => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append('myFile', selectedFile);
        }
        console.log("selectedFile",selectedFile)
        // Call your API endpoint to upload the file
        fetch(API_URL+'backupUpload/import-from-excel', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Upload your Excel file
            </Typography>
            <input
                accept=".xlsx"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Choose File
                </Button>
            </label>
            <Button
                style={{ marginLeft: '10px' }}
                variant="contained"
                color="primary"
                onClick={handleUpload}
            >
                Upload
            </Button>
        </Box>
    );
}
