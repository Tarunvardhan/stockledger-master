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
      // backgroundColor:"lightblue",
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

  const STCK_LDGR_APPL_VAL1=[
    {label:"Y",value:"YES"},
    {label:"N",value:"NO"},
  ];

const SOH_IMPACT_VAL=[
    {label:"A",value:"ADD"},
    {label:"R",value:"REDUCE"},
    {label:"N",value:"NO IMPACT"}
  ];

  const COST_USED_VAL=[
    {label:"S",value:"STANDARD"},
    {label:"T",value:"TRANSACTION"}
  ];
  const PERIOD_INVT_TRAN_VAL=[
    {label:"Y",value:"YES"},
    {label:"N",value:"NO"},
  ];
  const INJECT_PERIOD_VAL=[
    {label:"D",value:"DAILY"},
    {label:"W",value:"WEEKLY"},
    {label:"M",value:"MONTHLY"},
    {label:"S",value:"FINANCE STAGE"}
  ];
  const OVERRIDE_ACCUMULATE_VAL=[
    {label:"O",value:"OVERRIDE"},
    {label:"A",value:"ACCUMULATE"}
  ];
  const HIER_LEVEL_VAL=[
    {label:"SKU"},
    {label:"HIER1"},
    {label:"HIER2"},{label:"HIER3"},
  ];
  const FIN_APPL_VAL=[
    {label:"Y",value:"YES"},
    {label:"N",value:"NO"},
  ];

////console.log("valus:", sendGLData)
const SystemConfigCreation = () => {
    // we're using react-hook-form library 
    //const { register, handleSubmit } = useForm();
    
    const [primary, setPrimary] = useState([{}]);
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
    //       ////console.log("state",state);
    //   }
    const handleSubmit = () => {
        var check=0;
        // //console.log("ta", searchData)
        //console.log("ROW", searchData);
        searchData.TRN_NAME.length <= 0 ? setValidateTRN_NAME(true) :
        setValidateTRN_NAME(false);
        searchData.TRN_TYPE.length <= 0 ? setValidateTRN_TYPE(true) :
        setValidateTRN_TYPE(false);
        searchData.AREF.length <= 0 ? setValidateAREF(true) :
        setValidateAREF(false);
        const arr=[searchData]
        arr.filter((val) => {
            //console.log("val",val)
            for (const [key, value] of Object.entries(val)) {
              if(value==="" && key!=="ACCT_REFERENCE"){
                setIsValid(true)
                setIsValid1(true)
                setIsValid2(true)
                check=1;
                break;
              }
              if(key=="AREF" ){
                if(isNaN(value) || String(Math.abs(value)).charAt(0) !== value){
                    check=3;
                    break;
                  }
              }
              if(key=="TRN_TYPE" && (value.length > 3 ||value.length < 3 ) ){
                //console.log(343434)
                    check=2;
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
            //console.log("11222")
              dispatch(postSystemConfigcreationRequest([searchData]));
            setSendData(initialData) 
            //setSearchData(initialData)
            //console.log("sdght",SystemConfigCreationData)
            //setLoading(window.location.reload(),3000); 
            //     setOpen(true);
            //     setLoading(true); 
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
          //console.log(2456)
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
          if(SystemConfigCreationData["message"]==="Transaction combination already exists!"){
            //console.log("123")
              setIsValid1(true)
              setIsValid2(true)
              setIsValid1Type(true)
              // setSearchData((prev) => {
              //   return {
              //     ...prev,
              //     TRN_TYPE:"",
              //     AREF : "",
              //   };
              // });
          } 
          if(SystemConfigCreationData["message"]==="Data Inserted"){
            setSearchData(initialData)
            setTimeout(() => window.location.reload(),1000)
          }
          SystemConfigCreationData.isSuccess=false;
          setLoading(true);
        }
      }, [SystemConfigCreationData])
    

    const onChange = (sendData) => {
       // //console.log("at", sendData.target.name,sendData.target.value)
        setSearchData((prev) => {
            return {
                ...prev,
                [sendData.target.name]: sendData.target.value,
            };
        });
    }
    const onSubmit = (data) => {
        ////console.log("kty", data);
    };

//console.log("searchdata",searchData)

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
    // //console.log("primary",primary)
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

    const select_STCK_LDGR_APPL  = (e,val) => {
        //console.log("hello ",val)
          if(val){
        setSearchData((prev) => {
            return {
              ...prev,
              STCK_LDGR_APPL : val.label,
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

    const select_SOH_IMPACT  = (e,val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              SOH_IMPACT : val.label,
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
    const select_COST_USED  = (e,val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              COST_USED : val.label,
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
    const select_PERIOD_INVT_TRAN  = (e,val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              PERIOD_INVT_TRAN : val.label,
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
    const select_INJECT_PERIOD  = (e,val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              INJECT_PERIOD : val.label,
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
    const select_OVER_ACC = (e,val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              OVERRIDE_ACCUMULATE : val.label,
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
    const select_HIER_LEVEL = (e,val) => {
        //console.log(val)
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              HIER_LEVEL : val.label,
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
    const select_FIN_APPL = (e,val) => {
        //console.log(val)
       
        if (val){
        setSearchData((prev) => {
            return {
              ...prev,
              FIN_APPL : val.label,
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

    
    const selectACCT_REFERENCE = (e,val) => {
        //console.log(val)
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
    const Pop = props => {
  const { anchorEl, style, ...rest } = props
  const bound = anchorEl.getBoundingClientRect()
  return <div {...rest} style={{
    position: 'absolute',
    //zIndex: 9999,
    width: bound.width, margin:"-5px 1px 10px 660px"
  }} />
}
    //console.log("sdsf",searchData)
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
                            '& .MuiTextField-root': { m: 1.2, width: '35ch'},
                            // backgroundColor:"yellow",
                            height:"100vh",
                            position:"fixed"
                        }}
                        autoComplete="off"
                        >
                        
                        {/* <form sx={{backgroundColor:"red"}}> */}
                        <TextField 
                                variant="standard"
                                // sx={{ width: 250, margin:"0px 1px 10px 2px",position:"fixed"}}
                                name="TRN_NAME"
                                label="TRN NAME"
                                id="TRN NAME"
                                onChange={onChange}
                                required
                                error={isValid && !searchData.TRN_NAME}
                              helperText={isValid? searchData.TRN_NAME?true:"*Required" : null}
                            />
                            <TextField
                                variant="standard"
                                // sx={{ width: 250, margin:"80px 30px 10px 430px",position:"fixed"}}
                                error={(isValid1 &&  !searchData.TRN_TYPE) ||(isValid1 && isValidType)}
                                helperText={isValid1? searchData.TRN_TYPE?isValidType?"*Required":null:"*Required" : null}
                                name="TRN_TYPE"
                                label="TRN TYPE"
                                id="TRN TYPE"
                                onChange={onChange}
                                setTFValue={searchData.TRN_TYPE}
                                required
                            />
                            <TextField
                                variant="standard"
                                //  sx={{ width: 250, margin:"0px 1px 10px 660px",position:"fixed"}}
                                error={(isValid2 && !searchData.AREF) ||(isValid1 && isValidType)}
                              helperText={isValid2? searchData.AREF?true:"*Required" : null}
                                name="AREF"
                                label="AREF"
                                id="AREF"
                                onChange={onChange}
                                required
                            />


                            <Autocomplete      
                            size="small"
                            id="clear-on-escape"
                            clearOnEscape
                            options={STCK_LDGR_APPL_VAL1}
                            getOptionLabel={(option) =>
                              `${option.label.toString()} (${option.value.toString()})`
                            }
                            //value={(searchData?.DEPT.length > 0)?searchData?.DEPT:[]}
                            sx={{ width: 250, margin:"15px 1px 10px 2px",position:"fixed"}}
                            onChange={select_STCK_LDGR_APPL} 
                            renderInput={(params) => 
                            <TextField {...params} label="STCK_LDGR_APPL" 
                            variant="standard" 
                            error={isValid && !searchData.STCK_LDGR_APPL}
                            helperText={isValid? searchData.STCK_LDGR_APPL?true:"*Required" : null}
                            required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '160px',
                                }
                              }
                            }
                            />

                          <Autocomplete
                            size="small"
                            id="clear-on-escape"
                            options={SOH_IMPACT_VAL}
                            getOptionLabel={(option) =>
                              `${option.label.toString()} (${option.value.toString()})`
                            }
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                  {option.label} ({option.value})
                                </Box>
                              )}
                              sx={{ width: 250, margin:"15px 3px 10px 330px" ,position:"absolute" }}
                            //sx={{ width: 250, margin:"-61px 1px 10px 335px" ,position:"fixed" }}
                            onChange={select_SOH_IMPACT} 
                            renderInput={(params) => 
                            <TextField {...params} label="SOH IMPACT"
                            variant="standard" 
                            
                            error={isValid && !searchData.SOH_IMPACT}
                            helperText={isValid? searchData.SOH_IMPACT?true:"*Required" : null}
                            required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '160px',
                                }
                              }
                            }
                            />


                            <Autocomplete
                            
                            size="small"
                            id="clear-on-escape"
                            options={COST_USED_VAL}
                            getOptionLabel={(option) =>
                              `${option.label.toString()} (${option.value.toString()})`
                            }
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                  {option.label} ({option.value})
                                </Box>
                              )}
                              
                              sx={{ width: 250, margin:"15px 1px 0px 660px" ,position:"absolute" }}
                            onChange={select_COST_USED} 
                            renderInput={(params) => 
                            <TextField {...params} label="COST USED"
                            variant="standard" 
                            error={isValid && !searchData.COST_USED}
                            helperText={isValid? searchData.COST_USED?true:"*Required" : null}
                            required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '160px',
                                }
                              }
                            }
                            />

                          <Autocomplete
                            
                            size="small"
                            id="clear-on-escape"
                            options={PERIOD_INVT_TRAN_VAL}
                            getOptionLabel={(option) =>
                              `${option.label.toString()} (${option.value.toString()})`
                            }
                            sx={{ width: 250, margin:"95px 1px 10px 2px",position:"fixed",border:"1px"}}
                            onChange={select_PERIOD_INVT_TRAN} 
                            renderInput={(params) => 
                            <TextField {...params} label="PERIOD INVT TRAN"
                            variant="standard" 
                            error={isValid && !searchData.PERIOD_INVT_TRAN}
                            helperText={isValid? searchData.PERIOD_INVT_TRAN?true:"*Required" : null}
                            required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '160px',
                                }
                              }
                            }
                            />



                            <Autocomplete
                            
                            size="small"
                            id="clear-on-escape"
                            options={INJECT_PERIOD_VAL}
                            getOptionLabel={(option) =>
                              `${option.label.toString()} (${option.value.toString()})`
                            }
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                  {option.label} ({option.value})
                                </Box>
                              )}
                            sx={{ width: 250, margin:"95px 3px 10px 330px", position:"absolute" }}
                            onChange={select_INJECT_PERIOD} 
                            renderInput={(params) => 
                            <TextField {...params} label="INJECT PERIOD"
                            variant="standard" 
                            error={isValid && !searchData.INJECT_PERIOD}
                            helperText={isValid? searchData.INJECT_PERIOD?true:"*Required" : null}
                            required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '160px',
                                }
                              }
                            }
                            />

                            <Autocomplete
                            
                            size="small"
                            id="clear-on-escape"
                            options={OVERRIDE_ACCUMULATE_VAL}
                            getOptionLabel={(option) =>
                              `${option.label.toString()} (${option.value.toString()})`
                            }
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                  {option.label} ({option.value})
                                </Box>
                              )}
                            sx={{ width: 250, margin:"95px 1px 10px 660px", position:"absolute"}}
                            onChange={select_OVER_ACC} 
                            renderInput={(params) => 
                            <TextField {...params} label="OVERRIDE ACCUMULATE"
                            variant="standard" 
                            error={isValid && !searchData.OVERRIDE_ACCUMULATE}
                            helperText={isValid? searchData.OVERRIDE_ACCUMULATE?true:"*Required" : null}
                            required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '160px',
                                }
                              }
                            }
                            />


                            <Autocomplete
                            
                            size="small"
                            id="clear-on-escape"
                            options={HIER_LEVEL_VAL}
                            sx={{ width: 250 , margin:"175px 1px 10px 2px",position:"fixed"}}
                            onChange={select_HIER_LEVEL} 
                            renderInput={(params) => 
                            <TextField {...params} label="HIER LEVEL"
                            variant="standard" 
                            error={isValid && !searchData.HIER_LEVEL}
                            helperText={isValid? searchData.HIER_LEVEL?true:"*Required" : null}
                            required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '160px',
                                }
                              }
                            }
                            />

                             <Autocomplete
                            size="small"
                            id="clear-on-escape"
                            options={FIN_APPL_VAL}
                            getOptionLabel={(option) =>
                              `${option.label.toString()} (${option.value.toString()})`
                            }
                            sx={{ width: 250, margin:"175px 3px 10px 330px" ,position:"absolute" }}
                            onChange={select_FIN_APPL} 
                            renderInput={(params) => 
                            <TextField {...params} label="FIN APPL"
                            variant="standard" 
                            error={isValid && !searchData.FIN_APPL}
                            helperText={isValid? searchData.FIN_APPL?true:"*Required" : null}
                            required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '160px',
                                }
                              }
                            }
                            />

                             <Autocomplete
                            size="small"
                            options={primary}
                              getOptionLabel={(option) =>  option.PRIMARY_ACCOUNT.toString()}
                            
                            sx={{ width: 310, margin:"175px 3px 10px 660px" ,position: 'absolute'}}
                            onChange={selectACCT_REFERENCE} 
                            renderInput={(params) => 
                            <TextField {...params} label="ACCT REFERENCE"
                            variant="standard" 
                            size="small"
                            error={isValid && !searchData.ACCT_REFERENCE}
                            helperText={isValid? searchData.ACCT_REFERENCE?true:"*Required" : null}
                            // required
                            />}
                            ListboxProps={
                              {
                                style:{
                                    maxHeight: '120px',
                                }
                              }
                            }
                            />
                            
                           
                            <Grid item xs={6}>
                                <Box display="flex"
                                // backgroundColor="lightgreen"
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