import React, { useEffect, useState } from "react";
//import './Forms.css';
//import { useForm } from "react-hook-form";
import { Box } from '@mui/system';
import { Alert, TextField } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import {postSystemConfigcreationRequest,getglprimaryRequest} from "../../Redux/Action/sysconfigcreation";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from '@sweetalert/with-react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const styleSelect = {
  control: base => ({
    ...base,
    border: 0,
    margin: "10px 0px 15px 10px",
    width:"310px",
    padding:"10px",
    //border: "5px solid black",
    // This line disable the blue border
    boxShadow: 'none',
    border: "1px solid lightgray",
    display: 'flex',
  })
};
// const styleSelect1 = {
//     control: base => ({
//       ...base,
//       border: 0,
//       padding:"10px",
//       margin: "10px 0px 15px 9px",
//       border: "1px solid lightgray",
//       width:"310px",
//     })
// };
// const styleSelect2 = {
// control: base => ({
//     ...base,
//     border: 0,
//     top:"-73px",
//     padding:"10px",
//     postion:"fixed",
//     margin: "0px 0px 1px 335px",
//     border: "1px solid lightgray",
//     width:"312px",
// })
// };
// const styleSelect3 = {
//     control: base => ({
//       ...base,
//       border: 0,
//       padding:"10px",
//       top:"-141px",
//       margin: "10px 0px 15px 663px",
//       border: "1px solid lightgray",
//       width:"310px",
//     })
// };
// const styleSelect4 = {
//     control: base => ({
//       ...base,
//       border: 0,
//       padding:"10px",
//       top:"-135px",
//       margin: "0px 0px 15px 9px",
//       border: "1px solid lightgray",
//       width:"310px",
//     })
// };
// const styleSelect5 = {
//     control: base => ({
//       ...base,
//       border: 0,
//       top:"-208px",
//       padding:"10px",
//       margin: "10px 0px 15px 335px",
//       border: "1px solid lightgray",
//       width:"310px",
//     })
// };
// const styleSelect6 = {
//     control: base => ({
//       ...base,
//       border: 0,
//       top:"-281px",
//       padding:"10px",
//       margin: "10px 0px 15px 663px",
//       border: "1px solid lightgray",
//       width:"310px",
//     })
// };
// const styleSelect7 = {
//     control: base => ({
//       ...base,
//       border: 0,
//       top:"-276px",
//       padding:"10px",
//       margin: "10px 0px 15px 9px",
//       border: "1px solid lightgray",
//       width:"310px",
//     })
// };
// const styleSelect8 = {
//     control: base => ({
//       ...base,
//       border: 0,
//       top:"-349px",
//       padding:"10px",
//       margin: "10px 0px 15px 335px",
//       border: "1px solid lightgray",
//       width:"310px",
//     })
// };
// const styleSelect9 = {
//     control: base => ({
//       ...base,
//       border: 0,
//       top:"-422px",
//       padding:"10px",
//       margin: "10px 0px 15px 663px",
//       border: "1px solid lightgray",
//       width:"310px",
//     })
// };


const useStyles = makeStyles({
    maindiv: {
        position: "relative",
        // backgroundColor:"orange",
        height:"100vh",
        width: "calc(90vw - 10px)",
        '& table': {
            '& tr': {
                '& td:nth-child(28)': {
                    display: 'none'
                },
                '& td:nth-child(29)': {
                    display: 'none'
                },
                '& td:nth-child(30)': {
                    display: 'none'
                }
            }
        }
    }, boxDiv: {
        display:"flex",
        justifyContent:"space-between",
    },
    uploaddiv: {
        display: "flex",
        alignItems: "center",
        marginTop: "50px",
        textAlign: "start",
        gap: 20,
    },
    GobackDiv: {
        cursor: "pointer",
    },
    textField: {
        marginRight: "10px !important",
    },
    dateField: {
        '& .MuiInput-input': {
            color: "rgba(102,102,102,1)",
        }
    },
});




const initialData = {
    STCK_LDGR_APPL:"",
    SOH_IMPACT:"",
    COST_USED:"",
    PERIOD_INVT_TRAN:"",
    INJECT_PERIOD:"",
    OVERRIDE_ACCUMULATE:"",
    HIER_LEVEL:"",
    FIN_APPL:"",
    TRN_NAME:"",
    TRN_TYPE:"",
    AREF:"",
    ACCT_REFERENCE:"",
}
const STCK_LDGR_APPL_VAL=[
    {value:"Y"},
    {value:"N"},
  ];
const SOH_IMPACT_VAL=[
    {label:"A (ADD)",value:"A"},
    {label:"R (REDUCE)",value:"R"},
    {label:"N (NO IMPACT)",value:"N"}
  ];

  const COST_USED_VAL=[
    {label:"S (STANDARD)",value:"S"},
    {label:"T (TRANSACTION)",value:"T"}
  ];
  const PERIOD_INVT_TRAN_VAL=[
    {value:"Y"},
    {value:"N"},
  ];
  const INJECT_PERIOD_VAL=[
    {label:"D (DAILY)",value:"D"},
    {label:"W (WEEKLY)",value:"W"},
    {label:"M (MONTHLY)",value:"M"},
    {label:"S (FINANCE STAGE)",value:"S"}
  ];
  const OVERRIDE_ACCUMULATE_VAL=[
    {label:"O (OVERRIDE)",value:"O"},
    {label:"A (ACCUMULATE)",value:"A"}
  ];
  const HIER_LEVEL_VAL=[
    {value:"SKU"},
    {value:"HIER1"},
    {value:"HIER2"},{value:"HIER3"},
  ];
  const FIN_APPL_VAL=[
    {value:"Y"},
    {value:"N"},
  ];

//console.log("valus:", sendGLData)
const SystemConfigCreation = () => {
    // we're using react-hook-form library 
    //const { register, handleSubmit } = useForm();
    
    const [primary, setPrimary] = useState([{}]);
    const [load, setLoad] = useState(0);
    //const [itemData, setItemData] = useState(initialItemData);
    const [filterClass, setFilterClass] = useState([]);
    const [searchData, setSearchData] = useState(initialData);
    const [origItemData, setOrigItemData] = useState({});
    const [sendData, setSendData] = useState(initialData);
    const [isSubmit, setSubmit] = useState(false);
    const dispatch = useDispatch();
    const [isSearch, setSearch] = useState(false);
    const GLCreateClasses = useStyles();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [valCurr,setValCurr]=useState([]);
    const [isValid, setIsValid] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const SystemConfigCreationData = useSelector(
        (state) => state.sysconfigcreationReducers
    );
    const [validateTRN_NAME, setValidateTRN_NAME] = useState(false)
    const [validateTRN_TYPE, setValidateTRN_TYPE] = useState(false)
    const [validateAREF, setValidateAREF] = useState(false)

    useEffect(() => {
        document.title = 'System Config Creation';
      },[]);

    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //       setSearch(true);
    //       setState({ ...state, 'right': open });
    //       //console.log("state",state);
    //   }
    const handleSubmit = () => {
        var check=0;
        // console.log("ta", searchData)
        console.log("ROW", searchData);
        searchData.TRN_NAME.length <= 0 ? setValidateTRN_NAME(true) :
        setValidateTRN_NAME(false);
        searchData.TRN_TYPE.length <= 0 ? setValidateTRN_TYPE(true) :
        setValidateTRN_TYPE(false);
        searchData.AREF.length <= 0 ? setValidateAREF(true) :
        setValidateAREF(false);
        const arr=[searchData]
        arr.filter((val) => {
            console.log("val",val)
            for (const [key, value] of Object.entries(val)) {
              if(value===""){
                setIsValid(true)
                check=1;
                break;
              }
              if(key=="AREF" ){
                if(isNaN(value) || String(Math.abs(value)).charAt(0) !== value){
                    check=1;
                    break;
                  }
              }
              if(key=="TRN_TYPE" && (value.length > 3 ||value.length < 3 ) ){
                console.log(343434)
                    check=1;
                    break;
              }
            }
        })
        if (check===1){
            swal(
            <div>     
                <p>{"All Fields Required* "}</p>
            </div>
            )
            setSendData(initialData)
        }
        if (check===0) {
            console.log("11222")
              dispatch(postSystemConfigcreationRequest([searchData]));
            setSendData(initialData)  
            //     setOpen(true);
            //     setLoading(true); 
            //     initialsearch.PRIMARY_ACCOUNT = [];
                setTimeout(() => window.location.reload(), 1000)
            // }

            //setSubmit(true);
            //seteditRows([]);
        } else {
            setOpen(true);
            setLoading(false);
        }

        setOpen(false);
        setLoading(true);
    };
   
    useEffect(() => {
        if(isSearch){
          dispatch(postSystemConfigcreationRequest([searchData])) 
          setSearch(false)
        }
      },[isSearch])

    //const Forms = () => {
    // we're using react-hook-form library 
    //const { register, handleSubmit } = useForm();
    useEffect(() => {
        if (SystemConfigCreationData.isError && SystemConfigCreationData.message) {
            swal(
              <div>     
                <p>{SystemConfigCreationData["message"]}</p>
              </div>
            )  
            SystemConfigCreationData.isError=false;
        }else if(SystemConfigCreationData.isSuccess && SystemConfigCreationData.message){
          swal(
            <div>     
               <p>{SystemConfigCreationData["message"]}</p>
            </div>
          )
          SystemConfigCreationData.isSuccess=false;
          setLoading(true);
        }
      }, [SystemConfigCreationData])
    

    const onChange = (sendData) => {
       // console.log("at", sendData.target.name,sendData.target.value)
        setSearchData((prev) => {
            return {
                ...prev,
                [sendData.target.name]: sendData.target.value,
            };
        });
    }
    const onSubmit = (data) => {
        //console.log("kty", data);
    };


    useEffect(() => {
        dispatch(getglprimaryRequest([{}]))
        
         }, [""])
         useEffect(() => {
            if (SystemConfigCreationData?.data?.primary && Array.isArray(SystemConfigCreationData?.data?.primary)) {
            
              setPrimary(SystemConfigCreationData?.data?.primary)
              setLoading(false);
              setSubmit(false);
              setSearch(false);
            }} ,[SystemConfigCreationData?.data]);
    console.log("primary",primary)
    const handleCancel = () => {
        setOpen(false)
    }
    const handleClose = () => {
        //setIsValidExcel(true);
        setOpen(false);
    };
const handleClickOpen = () => {
    var check=0;
    // if( inputCurr.length>0){
    //     for(var i = 0; i < itemData.length; i++) {
    //     check=1
    //     if ((itemData[i].CURRENCY).toUpperCase() === inputCurr.toUpperCase()) {
    //         selectCurrency(0,itemData[i])
    //         setInputCurr("");
    //         check=2;
    //         break;
    //     }
    //     } 
    // }
    if (check===1){
        swal(
        <div>     
            <p>{"No Data Found"}</p>
        </div>
        )
    }
    setOpen(true);
    };

    const select_STCK_LDGR_APPL  = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              STCK_LDGR_APPL : val.value,
            };
          });
    }
    const select_SOH_IMPACT  = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              SOH_IMPACT : val.value,
            };
          });
    }
    const select_COST_USED  = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              COST_USED : val.value,
            };
          });
    }
    const select_PERIOD_INVT_TRAN  = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              PERIOD_INVT_TRAN : val.value,
            };
          });
    }
    const select_INJECT_PERIOD  = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              INJECT_PERIOD : val.value,
            };
          });
    }
    const select_OVER_ACC = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              OVERRIDE_ACCUMULATE : val.value,
            };
          });
    }
    const select_HIER_LEVEL = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              HIER_LEVEL : val.value,
            };
          });
    }
    const select_FIN_APPL = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              FIN_APPL : val.value,
            };
          });
    }
    
    const selectACCT_REFERENCE = (val) => {
        console.log(val)
        setSearchData((prev) => {
            return {
              ...prev,
              ACCT_REFERENCE : val.PRIMARY_ACCOUNT,
            };
          });
    }
    console.log("sdsf",searchData)
    return (
        <Box className={GLCreateClasses.maindiv}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <Box className={GLCreateClasses.boxDiv}>
                        <div className={GLCreateClasses.uploaddiv}>
                            <h4>System Config Creation</h4>
                        </div>
                        <div className={GLCreateClasses.uploaddiv}>
                            {/* <div style={{ marginLeft: '16px', padding: '16px' }}> */}
                            <Button variant="contained" sx={{ marginTop: '15px', textAlign: 'right' }} onClick={handleClickOpen} startIcon={<SendIcon />}>
                                Submit
                            </Button>
                        </div>
                    </Box>
                </Grid>
                <div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                        className={GLCreateClasses.popUp}
                        PaperProps={{
                            style: {
                                backgroundColor: '#D3D3D3',
                                borderRadius: '20px',
                            },
                        }}
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {"Do you want to submit this Account!"}
                        </DialogTitle>
                        <DialogContent>                            
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCancel}>
                                NO
                            </Button>
                            <Button onClick={handleSubmit} autoFocus>
                                YES
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Grid>
            <div className="container">
                {/* <h4 className="title">GL Account</h4> */}
                <div className="form-container">
                    <Box 
                    sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch',margin:"0px 0px 15px 10px"},
                            //display:"flex",
                            height:"100vh",
                        }}
                        autoComplete="off"
                        >
                        {/* <form sx={{backgroundColor:"red"}}> */}
                        <div>
                        <TextField 
                                error={validateTRN_NAME}
                                helperText={validateTRN_NAME === true ? "*Required" : null}
                                name="TRN_NAME"
                                label="TRN NAME"
                                id="TRN NAME"
                                onChange={onChange}
                                required
                            /><br></br>
                            <TextField
                                error={validateTRN_TYPE}
                                helperText={validateTRN_TYPE === true ? "*Required" : null}
                                name="TRN_TYPE"
                                label="TRN TYPE"
                                id="TRN TYPE"
                                onChange={onChange}
                                required
                            /><br></br>
                            <TextField
                                error={validateAREF}
                                helperText={validateAREF === true ? "*Required" : null}
                                name="AREF"
                                label="AREF"
                                id="AREF"
                                onChange={onChange}
                                required
                            /><br></br>
                        </div>
                            {/* <p style={{margin:"10px 100px 100px 10px",backgroundColor:"blue",display:"inline"}}>STCK_LDGR_APPL</p>
                            <p style={{margin:"10px 10px 0px 80px",display:"inline",backgroundColor:"green"}}>SOH IMPACT</p> */}
                            <div style={{width: '310px'}} >
                            {/* <p style={{margin:"10px 100px 100px 10px",backgroundColor:"blue",display:"inline"}}>STCK_LDGR_APPL</p> */}
                            {searchData.STCK_LDGR_APPL?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;STCK_LDGR_APPL
                            </font>:false}
                            <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option => option.value}
                            getOptionValue={option => option.value}
                            options={STCK_LDGR_APPL_VAL}
                            isSearchable={true}
                            // onInputChange={(value, action) => {
                            //   if (action.action === "input-change") setInputErr(value);
                            // }}
                            // inputValue={inputErr}
                            onChange={select_STCK_LDGR_APPL}
                            placeholder={"STCK_LDGR_APPL"}
                            styles={styleSelect}
                            theme={isValid?theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#b22222',  // Placeholder color //slategrey
                                },
                            }):false}
                            required
                             />
                             {isValid? searchData.STCK_LDGR_APPL?true:<font size="2"
                             face="Arial"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                             </div>


                            <div style={{width: '310px'}} >
                            {/* <p style={{top:"-150",margin:"100px 10px 0px 300px",display:"inline",backgroundColor:"green"}}>SOH IMPACT</p> */}
                            {/* <h6 style={{top:"-173px",margin:"0px 0px 10px 390px"}}>SOH IMPACT</h6> */}
                            {searchData.SOH_IMPACT?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;SOH IMPACT
                            </font>:false}
                            <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option => option.label}
                            getOptionValue={option => option.value}
                            options={SOH_IMPACT_VAL}
                            isSearchable={true}
                            // onInputChange={(value, action) => {
                            //   if (action.action === "input-change") setInputErr(value);
                            // }}
                            // inputValue={inputErr}
                            onChange={select_SOH_IMPACT}
                            placeholder={"SOH IMPACT"}
                            styles={styleSelect}
                            theme={isValid?theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#b22222',  // Placeholder color //slategrey
                                },
                            }):false}
                            required
                             />
                             {isValid? searchData.SOH_IMPACT?true:<font size="2"
                             face="Arial"
                             padding="0px"
                             margin="20px 0px 0px 0px"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                             </div>


                            <div style={{width: '310px'}} >
                            {searchData.COST_USED?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;COST USED
                            </font>:false}
                            <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option => option.label}
                            getOptionValue={option => option.value}
                            options={COST_USED_VAL}
                            isSearchable={true}
                            // onInputChange={(value, action) => {
                            //   if (action.action === "input-change") setInputErr(value);
                            // }}
                            // inputValue={inputErr}
                            onChange={select_COST_USED}
                            placeholder={"COST USED"}
                            styles={styleSelect}
                            theme={isValid?theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#b22222',  // Placeholder color //slategrey
                                },
                            }):false}
                            required
                             />
                             {isValid? searchData.COST_USED?true:<font size="2"
                             face="Arial"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                             </div>


                            
                            <div style={{width: '310px'}} >
                            {searchData.PERIOD_INVT_TRAN?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;PERIOD INVT TRAN
                            </font>:false}
                            <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option => option.value}
                            getOptionValue={option => option.value}
                            options={PERIOD_INVT_TRAN_VAL}
                            isSearchable={true}
                            // onInputChange={(value, action) => {
                            //   if (action.action === "input-change") setInputErr(value);
                            // }}
                            // inputValue={inputErr}
                            onChange={select_PERIOD_INVT_TRAN}
                            placeholder={"PERIOD INVT TRAN"}
                            styles={styleSelect}
                            theme={isValid?theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#b22222',  // Placeholder color //slategrey
                                },
                            }):false}
                            required
                             />
                             {isValid? searchData.PERIOD_INVT_TRAN?true:<font size="2"
                             face="Arial"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                             </div>


                            <div style={{width: '310px'}} >
                            {searchData.INJECT_PERIOD?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;INJECT PERIOD
                            </font>:false}
                        <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option => option.label}
                            getOptionValue={option => option.value}
                            options={INJECT_PERIOD_VAL}
                            isSearchable={true}
                            // onInputChange={(value, action) => {
                            //   if (action.action === "input-change") setInputErr(value);
                            // }}
                            // inputValue={inputErr}
                            onChange={select_INJECT_PERIOD}
                            placeholder={"INJECT PERIOD"}
                            styles={styleSelect}
                            theme={isValid?theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#b22222',  // Placeholder color //slategrey
                                },
                            }):false}
                            required
                             />
                             {isValid? searchData.INJECT_PERIOD?true:<font size="2"
                             face="Arial"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                             </div>


                            <div style={{width: '310px'}} >
                            {searchData.OVERRIDE_ACCUMULATE?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;OVERRIDE ACCUMULATE
                            </font>:false}
                        <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option => option.label}
                            getOptionValue={option => option.value}
                            options={OVERRIDE_ACCUMULATE_VAL}
                            isSearchable={true}
                            // onInputChange={(value, action) => {
                            //   if (action.action === "input-change") setInputErr(value);
                            // }}
                            // inputValue={inputErr}
                            onChange={select_OVER_ACC}
                            placeholder={"OVERRIDE ACCUMULATE"}
                            styles={styleSelect}
                            theme={isValid?theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#b22222',  // Placeholder color //slategrey
                                },
                            }):false}
                            required
                             />
                             {isValid? searchData.OVERRIDE_ACCUMULATE?true:<font size="2"
                             face="Arial"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                             </div>


                            <div style={{width: '310px'}} >
                            {searchData.HIER_LEVEL?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;HIER LEVEL
                            </font>:false}
                        <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option => option.value}
                            getOptionValue={option => option.value}
                            options={HIER_LEVEL_VAL}
                            isSearchable={true}
                            // onInputChange={(value, action) => {
                            //   if (action.action === "input-change") setInputErr(value);
                            // }}
                            // inputValue={inputErr}
                            onChange={select_HIER_LEVEL}
                            placeholder={"HIER LEVEL"}
                            styles={styleSelect}
                            theme={isValid?theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#b22222',  // Placeholder color //slategrey
                                },
                            }):false}
                            required
                             />
                             {isValid? searchData.HIER_LEVEL?true:<font size="2"
                             face="Arial"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                             </div>


                            <div style={{width: '310px'}} >
                            {searchData.FIN_APPL?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;FIN APPL
                            </font>:false}
                        <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option => option.value}
                            getOptionValue={option => option.value}
                            options={FIN_APPL_VAL}
                            isSearchable={true}
                            // onInputChange={(value, action) => {
                            //   if (action.action === "input-change") setInputErr(value);
                            // }}
                            // inputValue={inputErr}
                            onChange={select_FIN_APPL}
                            placeholder={"FIN APPL"}
                            styles={styleSelect}
                            theme={isValid?theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#b22222',  // Placeholder color //slategrey
                                },
                            }):false}
                            required
                             />
                             {isValid? searchData.FIN_APPL?true:<font size="2"
                             face="Arial"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                             </div>
                             

                            <div style={{width: '310px'}} >
                            {searchData.ACCT_REFERENCE?<font size="2"
                                face="Arial"
                                color="#1e90ff">&nbsp;&nbsp;&nbsp;&nbsp;ACCT REFERENCE
                            </font>:false}
                        <Select 
                            menuPosition={'fixed'}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            getOptionLabel={option =>
                                option.PRIMARY_ACCOUNT}
                            getOptionValue={option => option.PRIMARY_ACCOUNT}
                            options={primary}
                            isSearchable={true}
                            //onInputChange={(value, action) => {
                            // if (action.action === "input-change") setInputLoc(value);
                            // }}
                            // inputValue={inputLoc}
                             onChange={selectACCT_REFERENCE}
                            placeholder={"ACCT REFERENCE"}
                            styles={styleSelect}
                            //components={animatedComponents} 
                           // value={locationData.filter(obj => searchData?.LOCATION.includes(obj.LOCATION)) || searchData.LOCATION}  
                           // isMulti 
                           theme={isValid?theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                neutral50: '#b22222',  // Placeholder color //slategrey
                            },
                        }):false}
                        required
                         />
                         {isValid? searchData.ACCT_REFERENCE?true:<font size="2"
                             face="Arial"
                             color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;*Required
                         </font>:false}
                         </div>
                            
           

                            <Grid item xs={6}>
                                <Box display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end" className={GLCreateClasses.boxDiv}>
                                </Box>
                            </Grid>


                            {/* <Button variant="contained" sx={{marginTop: '15px'}} type="Submit"    startIcon={<SendIcon />}>Submit</Button> */}
                            {/* </div> */}
                        {/* </form> */}
                    </Box>
                </div>
            </div>
        </Box>
    );
};

export default SystemConfigCreation;