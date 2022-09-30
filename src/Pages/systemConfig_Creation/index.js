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
import Select from '@mui/material/Select';
import makeAnimated from 'react-select/animated';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { green } from "@mui/material/colors";

// const animatedComponents = makeAnimated();
// const styleSelect = {
//   control: base => ({
//     ...base,
//     border: 0,
//     margin: "10px",
//     width:"310px",
//     padding:"10px",
//     //border: "5px solid black",
//     // This line disable the blue border
//     boxShadow: 'none',
//     border: "1px solid lightgray",
//     display: 'flex',
//   })
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
    {value:"Y",val:"Y (YES)"},
    {value:"N",val:"N (NO)"},
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
    {value:"Y",label:"Y (YES)"},
    {value:"N",label:"N (NO)"},
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
    {value:"Y",label:"Y (YES)"},
    {value:"N",label:"N (NO)"},
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
    const [isValid1, setIsValid1] = useState(false);
    const [isValid2, setIsValid2] = useState(false);
    const [isValidType, setIsValid1Type] = useState(false);
    const [isValidTN, setIsValidTN] = useState(false);
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
        // console.log("ROW", searchData);
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
              if(value==="" && key!=="ACCT_REFERENCE"){
                setIsValid(true)
                setIsValid1(true)
                setIsValid2(true)
                setIsValidTN(true)
                check=1;
                break;
              }
              if(key=="AREF" ){
                if(isNaN(value) || String(Math.abs(value)).charAt(0) !== value || parseInt(value)===0){
                    check=3;
                    setIsValid1(false)
                    setIsValid2(true)
                    setIsValid1Type(true)
                    break;
                  }
                  
              }
              //console.log("test",!(/^[A-Za-z]*$/.test(value)))
              if(key=="TRN_TYPE" && (value.length > 3 ||value.length < 3)){
                setIsValid1(true)
                setIsValid2(false)
                setIsValid1Type(true)
                    check=2;
                    break;
              }
              
            }
        })
        if (check===1){
            // swal(
            // <div>     
            //     <p>{"All Fields Required* "}</p>
            // </div>
            // )
            setSendData(initialData)
        }
        if (check===2){
            swal(
            <div>     
                <p>{"TRN TYPE length should be 3"}</p>
            </div>
            )
            setIsValid1(true)
            setSearchData((prev) => {
              return {
                ...prev,
                // TRN_TYPE : "",
              };
            });
            setSendData(initialData)
        }
        if (check===3){
          swal(
          <div>     
              <p>{"AREF between 1 - 9"}</p>
          </div>
          )
          setIsValid2(true)
          setSearchData((prev) => {
            return {
              ...prev,
              // AREF : "",
            };
          });
          setSendData(initialData)
      }
        if (check===0) {
            // console.log("11222")
              dispatch(postSystemConfigcreationRequest([searchData]));
            setSendData(initialData)  
            // setSearchData(initialData)
            //     setOpen(true);
            setLoading(true); 
            //     initialsearch.PRIMARY_ACCOUNT = [];
                // setTimeout(() => window.location.reload(), 1000)
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
          if(SystemConfigCreationData["message"]==="Transaction name already exists!"){
            console.log("123345")
            setIsValidTN(true)
            setIsValid1Type(true)
            setIsValid1(false)
            setIsValid2(false)
          } 
          
          if(SystemConfigCreationData["message"]==="Data Inserted"){
            setSearchData(initialData)
            // setTimeout(() => window.location.reload(),1000)
          }
          if(SystemConfigCreationData["message"]==="Transaction combination already exists!"){
            //console.log("123")
              setIsValid1(true)
              setIsValid2(true)
              setIsValidTN(false)
              setIsValid1Type(true)
             
          } 
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
    // console.log("primary",primary)
    const handleCancel = () => {
        setOpen(false)
    }
    const handleClose = () => {
        //setIsValidExcel(true);
        setOpen(false);
    };
const handleClickOpen = () => {
    var check=0;
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
        //console.log("hello ",val)
          if(val){
        setSearchData((prev) => {
            return {
              ...prev,
              STCK_LDGR_APPL : val.target.value,
            };
          });
        }else{
          setSearchData((prev) => {
              return {
                ...prev,
                STCK_LDGR_APPL : "",
              };
            });
      }
    }
console.log("ser",searchData)
    const select_SOH_IMPACT  = (val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              SOH_IMPACT : val.target.value,
            };
          });
        }else{
          setSearchData((prev) => {
              return {
                ...prev,
                SOH_IMPACT : "",
              };
            });
      }
    }
    const select_COST_USED  = (val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              COST_USED : val.target.value,
            };
          });
        }else{
          setSearchData((prev) => {
              return {
                ...prev,
                COST_USED : "",
              };
            });
      }
    }
    const select_PERIOD_INVT_TRAN  = (val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              PERIOD_INVT_TRAN : val.target.value,
            };
          });
        }else{
          setSearchData((prev) => {
              return {
                ...prev,
                PERIOD_INVT_TRAN : "",
              };
            });
      }
    }
    const select_INJECT_PERIOD  = (val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              INJECT_PERIOD : val.target.value,
            };
          });
        }else{
          setSearchData((prev) => {
              return {
                ...prev,
                INJECT_PERIOD : "",
              };
            });
      }
    }
    const select_OVER_ACC = (val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              OVERRIDE_ACCUMULATE : val.target.value,
            };
          });
        }else{
          setSearchData((prev) => {
              return {
                ...prev,
                OVERRIDE_ACCUMULATE : "",
              };
            });
      }
    }
    const select_HIER_LEVEL = (val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              HIER_LEVEL : val.target.value,
            };
          });
        }else{
          setSearchData((prev) => {
              return {
                ...prev,
                HIER_LEVEL : "",
              };
            });
      }
    }
    const select_FIN_APPL = (val) => {
        //console.log(val)
        console.log("value,e",val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              FIN_APPL : val.target.value,
            };
          });
        }else{
          setSearchData((prev) => {
              return {
                ...prev,
                FIN_APPL : "",
              };
            });
      }
    }

    
    const selectACCT_REFERENCE = (val) => {
        // console.log("value,e",e,val)
        if(val){
        setSearchData((prev) => {
            return {
              ...prev,
              ACCT_REFERENCE : val.PRIMARY_ACCOUNT,
            };
          });
        }
        else{
            setSearchData((prev) => {
                return {
                  ...prev,
                  ACCT_REFERENCE : "",
                };
              });
        }
    }
    // console.log("sdsf",searchData)
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
                  <div sx={{display: "flex",flexDirection: "column"}}>
                    <Grid id="top-row" container spacing={0} >
                        <Box sx={{'& .MuiTextField-root': { m: 0, width: '35ch',margin:"20px 0px 0px 20px"}}}>
                        <TextField 
                                error={(isValidTN &&  !searchData.TRN_TYPE) ||(isValidTN && isValidType)}
                                helperText={isValidTN? searchData.TRN_TYPE?isValidType?<font size="2"
                                face="Arial"
                                color="#b22222">*Required
                                </font>:null:<font size="2"
                                face="Arial"
                                color="#b22222">*Required
                                </font> : null}
                                
                                name="TRN_NAME"
                                label="TRN NAME"
                                id="TRN NAME"
                                onChange={onChange}
                                value={searchData.TRN_NAME}
                                required
                            /></Box>
                            {/* </Grid> */}

                            {/* <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 0, width: '35ch',margin:"20px 0px 0px 20px"}}}>
                            <TextField
                                error={(isValid1 &&  !searchData.TRN_TYPE) ||(isValid1 && isValidType)}
                                helperText={isValid1? searchData.TRN_TYPE?isValidType?<font size="2"
                                face="Arial"
                                color="#b22222">*Required
                                </font>:null:<font size="2"
                                face="Arial"
                                color="#b22222">*Required
                                </font> : null}
                                
                                name="TRN_TYPE"
                                label="TRN TYPE"
                                id="TRN TYPE"
                                onChange={onChange}
                                value={searchData.TRN_TYPE}
                                required
                            /></Box>
                            {/* </Grid> */}

                            {/* <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 0, width: '35ch',margin:"20px 0px 0px 20px"}}}>
                            <TextField
                                error={(isValid2 && !searchData.AREF) ||(isValid2 && isValidType)}
                                helperText={isValid2? searchData.AREF?isValidType?<font size="2"
                                face="Arial"
                                color="#b22222">*Required
                                </font>:null:<font size="2"
                                face="Arial"
                                color="#b22222">*Required
                                </font> : null}
                                
                                name="AREF"
                                label="AREF"
                                id="AREF"
                                onChange={onChange}
                                value={searchData.AREF}
                                required
                            /></Box>
                            
                            {/* </Grid> */}
                            {/* <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}>
                        <FormControl>
                        {isValid? searchData.STCK_LDGR_APPL?<InputLabel sx={{margin:"20px 0px 0px 20px"}}>STCK_LDGR_APPL *
                        </InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px",color:"#b22222"}}>STCK_LDGR_APPL *
                        </InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px"}}>STCK_LDGR_APPL *
                        </InputLabel>}
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label=" STCK_LDGR_APPL"
                            value={searchData.STCK_LDGR_APPL}
                            options={STCK_LDGR_APPL_VAL.value}
                            getOptionValue={(option) => option.STCK_LDGR_APPL_VAL.value}
                            onChange={select_STCK_LDGR_APPL}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            error={isValid && !searchData.STCK_LDGR_APPL}
                            // helperText={isValid? "*Required" : null}
                            required
                            >
                            {STCK_LDGR_APPL_VAL.map((make, index) => (
                                // console.log("make:",make,"index:",index),
                                <MenuItem key={index} value={make.value}>{make.val}</MenuItem>
                            ))}
                            </Select>
                            {isValid? searchData.STCK_LDGR_APPL?true:<font size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false }
                             </FormControl>
                             </Box>


                             {/* </Grid>
                            <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}>
                            <FormControl>
                            {isValid? searchData.SOH_IMPACT?<InputLabel sx={{margin:"20px 0px 0px 20px"}}>SOH IMPACT *
                            </InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px",color:"#b22222"}}>SOH IMPACT *
                            </InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px"}}>SOH IMPACT *
                            </InputLabel>}
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label="SOH IMPACT"
                            value={searchData.SOH_IMPACT}
                            getOptionValue={option => option.SOH_IMPACT_VAL.value}
                            onChange={select_SOH_IMPACT}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            error={isValid && !searchData.SOH_IMPACT}
                            // helperText={isValid? "*Required" : null}
                            required
                            >
                            {SOH_IMPACT_VAL.map((make, index) => (
                                    // console.log("make:",make,"index:",index),
                                    <MenuItem key={index} value={make.value}>{make.label}</MenuItem>
                                ))}
                            </Select>
                            {isValid? searchData.SOH_IMPACT?true:<font size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false }
                             </FormControl>
                             </Box>

                             {/* </Grid>
                            <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}>
                             <FormControl>
                             {isValid? searchData.COST_USED?<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            COST USED *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px",color:"#b22222"}}>
                            COST USED *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            COST USED *</InputLabel>}
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label="COST USED"
                            value={searchData.COST_USED}
                            getOptionValue={option => option.COST_USED_VAL.value}
                            onChange={select_COST_USED}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            error={isValid && !searchData.COST_USED}
                            // helperText={isValid? "*Required" : null}
                            required
                            >
                            {COST_USED_VAL.map((make, index) => (
                                    // console.log("make:",make,"index:",index),
                                    <MenuItem key={index} value={make.value}>{make.label}</MenuItem>
                                ))}
                            </Select>
                            {isValid? searchData.COST_USED?true:<font size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false }
                             </FormControl>
                             </Box>

                             {/* </Grid>
                            <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}>
                             <FormControl>
                             {isValid? searchData.PERIOD_INVT_TRAN?<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            PERIOD INVT TRAN *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px",color:"#b22222"}}>
                            PERIOD INVT TRAN *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            PERIOD INVT TRAN *</InputLabel>}
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label="PERIOD INVT TRAN"
                            value={searchData.PERIOD_INVT_TRAN}
                            getOptionValue={option => option.PERIOD_INVT_TRAN_VAL.value}
                            onChange={select_PERIOD_INVT_TRAN}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            error={isValid && !searchData.PERIOD_INVT_TRAN}
                            // helperText={isValid? "*Required" : null}
                            required
                            >
                            {PERIOD_INVT_TRAN_VAL.map((make, index) => (
                                    // console.log("make:",make,"index:",index),
                                    <MenuItem key={index} value={make.value}>{make.label}</MenuItem>
                                ))}
                            </Select>
                            {isValid? searchData.PERIOD_INVT_TRAN?true:<font size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false }
                             </FormControl>
                             </Box>

                             {/* </Grid>
                            <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}>
                             <FormControl>
                             {isValid? searchData.INJECT_PERIOD?<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            INJECT PERIOD *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px",color:"#b22222"}}>
                            INJECT PERIOD *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            INJECT PERIOD *</InputLabel>}
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label="INJECT PERIOD"
                            value={searchData.INJECT_PERIOD}
                            getOptionValue={option => option.INJECT_PERIOD_VAL.value}
                            onChange={select_INJECT_PERIOD}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            error={isValid && !searchData.INJECT_PERIOD}
                            // helperText={isValid? "*Required" : null}
                            required
                            >
                            {INJECT_PERIOD_VAL.map((make, index) => (
                                    // console.log("make:",make,"index:",index),
                                    <MenuItem key={index} value={make.value}>{make.label}</MenuItem>
                                ))}
                            </Select>
                            {isValid? searchData.INJECT_PERIOD?true:<font size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false }
                             </FormControl>
                             </Box>

                             {/* </Grid>
                            <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}>
                             <FormControl>
                             {isValid? searchData.OVERRIDE_ACCUMULATE?<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            OVERRIDE ACCUMULATE *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px",color:"#b22222"}}>
                            OVERRIDE ACCUMULATE *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            OVERRIDE ACCUMULATE *</InputLabel>}
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label="OVERRIDE ACCUMULATE"
                            value={searchData.OVERRIDE_ACCUMULATE}
                            getOptionValue={option => option.OVERRIDE_ACCUMULATE_VAL.value}
                            onChange={select_OVER_ACC}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            error={isValid && !searchData.OVERRIDE_ACCUMULATE}
                            // helperText={isValid? "*Required" : null}
                            required
                            >
                            {OVERRIDE_ACCUMULATE_VAL.map((make, index) => (
                                    // console.log("make:",make,"index:",index),
                                    <MenuItem key={index} value={make.value}>{make.label}</MenuItem>
                                ))}
                            </Select>
                            {isValid? searchData.OVERRIDE_ACCUMULATE?true:<font size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false }
                             </FormControl>
                             </Box>

                             {/* </Grid>
                            <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}>
                             <FormControl>
                            {isValid? searchData.HIER_LEVEL?<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            HIER LEVEL *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px",color:"#b22222"}}>
                            HIER LEVEL *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            HIER LEVEL *</InputLabel>}
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label="HIER LEVEL"
                            value={searchData.HIER_LEVEL}
                            getOptionValue={option => option.HIER_LEVEL_VAL.value}
                            onChange={select_HIER_LEVEL}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            error={isValid && !searchData.HIER_LEVEL}
                            // helperText={isValid? searchData.HIER_LEVEL?true:"*Required" : null}
                            required
                            >
                            {HIER_LEVEL_VAL.map((make, index) => (
                                    // console.log("make:",make,"index:",index),
                                    <MenuItem key={index} value={make.value}>{make.value}</MenuItem>
                                ))}
                            </Select>
                            {isValid? searchData.HIER_LEVEL?true:<font size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false }
                             </FormControl> </Box>

                             {/* </Grid>
                            <Grid item xs={3.5}> */}
                            
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}>
                             <FormControl>
                             {isValid? searchData.FIN_APPL?<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            FIN APPL *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px",color:"#b22222"}}>
                            FIN APPL *</InputLabel>:<InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            FIN APPL *</InputLabel>}
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label="FIN APPL"
                            value={searchData.FIN_APPL}
                            getOptionValue={option => option.FIN_APPL_VAL.value}
                            onChange={select_FIN_APPL}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            error={isValid && !searchData.FIN_APPL}
                            // helperText={isValid? "*Required" : null}
                            required
                            >
                            {FIN_APPL_VAL.map((make, index) => (
                                    // console.log("make:",make,"index:",index),
                                    <MenuItem key={index} value={make.value}>{make.label}</MenuItem>
                                ))}
                            </Select>
                            {isValid? searchData.FIN_APPL?true:<font size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false }
                             </FormControl>
                             </Box>

                             {/* </Grid>
                            <Grid item xs={3.5}> */}
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: '35ch'}}}> 
                             <FormControl>
                             <InputLabel sx={{margin:"20px 0px 0px 20px"}}>
                            ACCT REFERENCE</InputLabel>
                            <Select 
                            // labelId="demo-simple-select-standard-label"
                            label="ACCT REFERENCE"
                            value={searchData.PRIMARY_ACCOUNT}
                            getOptionValue={option => option.PRIMARY_ACCOUNT}
                            onChange={selectACCT_REFERENCE}
                            sx={{width: "311px",margin:"20px 0px 0px 20px"}}
                            // error={isValid && !searchData.PRIMARY_ACCOUNT}
                            // helperText={isValid? "*Required" : null}
                            MenuProps={{
                                style: {
                                maxHeight: 180,
                                   },
                             }}
                            // required
                            >
                            {primary.map((make, index) => (
                                    // console.log("make:",make,"index:",index),
                                    <MenuItem key={index} value={make.PRIMARY_ACCOUNT}>{make.PRIMARY_ACCOUNT}</MenuItem>
                                ))}
                            </Select>
                            {/* {isValid? searchData.PRIMARY_ACCOUNT?true:<font 
                            size="2"
                            face="Arial"
                            color="#b22222">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Required
                            </font>:false } */}
                             </FormControl>
                            
                            <Grid item xs={6}>
                                <Box display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end" className={GLCreateClasses.boxDiv}>
                                </Box>
                            </Grid>
                    </Box></Grid>
                    {/* </Grid> */}
                    </div>
                    {/* </Box> */}
                </div>
            </div>
        </Box>
    );
};

export default SystemConfigCreation;