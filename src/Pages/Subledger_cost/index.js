import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/indexFI";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { getSubLedgerCostRequest } from "../../Redux/Action/subLedgerCost";
import {
  getClassDataRequest,
  getLocationDataRequest,
} from "../../Redux/Action/errorProcessing";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import RefreshIcon from '@mui/icons-material/Refresh';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from '@sweetalert/with-react';
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { components } from "react-select";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

//import "./index.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const animatedComponents = makeAnimated();
const styleSelect = {
  control: base => ({
    ...base,
    border: 0,
    //border: "5px solid black",
    // This line disable the blue border
    boxShadow: 'none',
    borderBottom: "1px solid black"
  })
};

const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 0px)",
    '& table':{
      '& tr':{
            '& td:nth-child(28)':{
                  display: 'none'
            },
            '& td:nth-child(29)':{
              display: 'none'
           },
           '& td:nth-child(30)':{
             display: 'none'
          }
      }
  }
},  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "100%",
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
  dateField:{
      '& .MuiInput-input': {
        color:  "rgba(102,102,102,1)",
      }
  },
 
});

const initialsearch = {
  HIER1: [],
  LOCATION: [],
  AMOUNT:"",
}

const initialItemData = {
  HIER1: [],
}


const SubLedgerCost = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [itemData, setItemData] = useState(initialItemData);
  const [locationData, setLocationData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [inputH1, setInputH1] = useState("");
  const [inputLoc,setInputLoc] = useState("");
  const [valH1,setValH1]=useState([]);
  const [valLoc,setValLoc]=useState([]);
  const [load, setLoad] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const SubLedgerCostClasses = useStyles();
  const SubLedgerCostData = useSelector(
    (state) => state.SubLedgerCostReducers
  );

  const SearchItemData = useSelector((state) => state.ErrorProcessingReducers);
  // //console.log("128",SubLedgerCostData);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'SubLedger Cost';
  },[]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const serializedata = (datatable) => {
     ////console.log("dt",datatable)
     ////console.log("ad",allData)
    
     let newTabledata = [];
     if(datatable.length > 0){
       datatable.map( item => {
           const reorder = {
            'ITEM': null,
            'ITEM_DESC': null,
            'LOCATION': null,
            'LOCATION_NAME': "",
            'ITEM_SOH': "",
            'UNIT_COST': "",
           }
                  
             let test = Object.assign(reorder,item);
             newTabledata.push(test); 
         
     })
     return newTabledata;
   } 
   setLoading(true);
   }

  useEffect(() => {
    if (inputValue && freeze === false) {
      const filteredTable = tabledata.filter(props => 
        Object
          .entries(inputValue)
          .every(([key,val]) => 
            !val.length ||
            props[key]?.toString().toLowerCase().includes(val?.toString().toLowerCase()))
      )
      setTabledata(filteredTable);
      // //console.log("filteredTable",filteredTable)
    }
  }, [inputValue]);

  // //console.log("infilter:",inputValue)
  // //console.log("tabledata:",tabledata)

  useEffect(() => {
    if (SubLedgerCostData.isError) {
      ////console.log("hello",SubLedgerCostData["messgae"])

      setIsError(true);
      console.log("chgscyu",SubLedgerCostData)
      swal(
        <div>     
          <p>{SubLedgerCostData["message"]}</p>
        </div>
      )
      SubLedgerCostData.isError=false;
    }else if(SubLedgerCostData.isSuccess){
     
      setIsSuccess(true);
      swal(
        <div>     
           <p>{SubLedgerCostData["message"]}</p>
        </div>
      )
    }else {
      ////console.log("hello1",SubLedgerCostData)
      setIsError(false)
      setTabledata("")
    }
  }, [SubLedgerCostData])

//   useEffect(() => { 
//     if(isSubmit){
//       setTimeout(() => {
//        // //console.log("194 SD", searchData)
//         dispatch(getSubLedgerCostRequest([searchData])) 
//       },1000)
//     }
// },[isSubmit]);

useEffect(() => {
  if(isSearch){
    dispatch(getSubLedgerCostRequest([searchData])) 
  }
},[isSearch])

useEffect(() => {
  setLoading(true);
  dispatch(getClassDataRequest([{}]));
  dispatch(getLocationDataRequest([{}]));

}, [""]);


  useEffect(() => {
        if(SubLedgerCostData?.data?.Data && Array.isArray(SubLedgerCostData?.data?.Data)){
          ////console.log("rtd",SubLedgerCostData)
          setTabledata(serializedata(SubLedgerCostData?.data?.Data));
          setAllData(serializedata(SubLedgerCostData?.data?.Data));
          setLoading(false);
          setSubmit(false);
          setSearch(false);
          ////console.log("rtd",SubLedgerCostData)
          ////console.log("rt",allData)
        }
      
        else {
          setSearch(false)
        }
        
  },[SubLedgerCostData?.data])

  useEffect(() => {
    if (
      SearchItemData?.data?.itemData &&
      Array.isArray(SearchItemData?.data?.itemData)
    ) {
      setItemData(SearchItemData?.data?.itemData);
      setLoading(false);
    } else if (
      SearchItemData?.data?.locationData &&
      Array.isArray(SearchItemData?.data?.locationData)
    ) {
      setLocationData(SearchItemData?.data?.locationData);
      setLoading(false);
    } else {
      setSearch(false);
    }
  }, [SearchItemData?.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
    }));
      setTabledata(allData);
    } else {
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
    }));
    }
  };

const handleSubmit = (event) => {
  var check=0;
  if( inputH1.length>0){
    for(var i = 0; i < UniqDept.length; i++) {
      check=1
      if ((UniqDept[i].HIER1).toUpperCase() === inputH1.toUpperCase()) {
          handleHier1(0,UniqDept[i])
          setInputH1("");
          check=2;
          break;
      }
    } 
  }if ( inputLoc.length>0 && (check===0 || check===2)){
    if(locationData.length>0){      
      for(var i = 0; i < locationData.length; i++) {  
        if (locationData[i].LOCATION=== parseInt(inputLoc)) {
            selectLocation(0,locationData[i]);
            setInputLoc("");
            check=2;
            break;
        }else{
          check=1; }
      }
    }
    else{
      check=1;
    }
  }
  if (check===1){
    swal(
      <div>     
        <p>{"No Data Found"}</p>
      </div>
    )
    event.preventDefault();
    setState({ ...state, 'right': open });
    setLoad(1)
  }else{ 
      setLoad(0);
      event.preventDefault();
      setSearch(true);
      setState({ ...state, 'right': open });
    }
}

const onChange = (e) => {
  setSearchData((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value,
    };
  });
};

const handleMsgClose = () => {
  setIsError(false)
  setIsSuccess(false)
}
const handleSearchColumn = (e) => {
  ////console.log("Handle Search Column",e);

  //console.log(inputValue);
  setFreeze(true);

}

const onReset = (event) => {
  initialsearch.HIER1 = [];
  initialsearch.LOCATION = [];
  setSearchData(initialsearch);
  setSearch(false);
  setLoad(0);
  setInputH1("");
  setInputLoc("");
  setValH1([]);
  setValLoc([]);
  setTabledata("");
  setInputValue("");
  setAllData("");
};
const handleHier1=(e,value) =>
  {
    let selectedDept = [];
    if (value.option) {     
        valH1.push(value.option)
        // if (value.option.HIER1===input){ 
        //   setInput("");
        // }
        if ((value.option.HIER1).includes(inputH1)){
          setInputH1("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valH1.length;i++)
      {
        if(valH1[i]["HIER1"]===value.removedValue.HIER1){
          index=i;
          break;
        }
      }
     valH1.splice(index,1);
    }else if(value.action==="clear"){ 
        valH1.splice(0,valH1.length);
    }
//manual input handle input and filter itemdata
  if(e===0){
    valH1.push(value);}
  //Filtering HIER2 based on HIER1
 if (valH1.length >0) {
      // const filterClass = itemData.filter((item) => {      
      //   return (valH1).some((val) => {
      //     return item.HIER1 === val.HIER1;
      //   });     
      // });
      // let UniqClass =
      //     filterClass.length > 0
      //       ? [
      //           ...new Map(
      //             filterClass.map((item) => [item["HIER2"], item])
      //           ).values(),
      //         ]
      //       : []; 
      //       setFilterClass(UniqClass);
            valH1.map((item) => {
              selectedDept.push(item.HIER1);
            });
            setSearchData((prev) => {
              return {
                ...prev,
                HIER1: selectedDept,
              };
              
            });     
     
    }else {
      //setFilterClass([])
      setSearchData((prev) => {
        return {
          ...prev,
          HIER1: []
        };
      });
    }
}
const selectLocation = (event, value) => {
  let selectedLocation = [];
  if (value.option) {     
        valLoc.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   //console.log(1234)
        //   setInputLoc("");
        // }
        if (String(value.option.LOCATION).includes(inputLoc)){
          setInputLoc("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valLoc.length;i++)
      {
        if(valLoc[i]["LOCATION"]===value.removedValue.LOCATION){
          index=i;
          break;
        }
      }
      valLoc.splice(index,1);
    }else if(value.action==="clear"){ 
      valLoc.splice(0,valLoc.length);
    }
    if(event===0){
      valLoc.push(value)
    }
  if(valLoc.length > 0 && typeof valLoc[0]['LOCATION'] !== "undefined"){
    valLoc.map(
      (item) => {
        selectedLocation.push(item.LOCATION);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        LOCATION : selectedLocation,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid LOCATION"}</p>
          </div>
        )  
  }else {
    initialsearch.LOCATION = "";
    setSearchData((prev) => {
      return {
        ...prev,
        LOCATION : [],
      };
    });
  }
 }

 let UniqDept =
 itemData.length > 0
   ? [...new Map(itemData.map((item) => [item["HIER1"], item])).values()]
   : [];

   const searchPanel = () => (
    <Box
      sx={{ width: 350, marginTop: "80px" }}
      role="presentation"
      component="form"
      onSubmit={handleSubmit}
    >
      {" "}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Stack spacing={2} sx={{ width: 250 }}>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
                getOptionValue={option => option.HIER1}
                options={UniqDept.length > 0 ? UniqDept : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  // only set the input when the action that caused the
                  // change equals to "input-change" and ignore the other
                  // ones like: "set-value", "input-blur", and "menu-close"
                  if (action.action === "input-change") setInputH1(value); // <---
                }}
                inputValue={inputH1}
                onChange={handleHier1}
                placeholder={"Choose HIER1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true}
               value={UniqDept.filter(obj => searchData?.HIER1.includes(obj.HIER1))} 
                />
          <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.LOCATION.toString()}-(${option.LOCATION_NAME.toString()})`}
                getOptionValue={option => option.LOCATION}
                options={locationData.length > 0 ? locationData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputLoc(value);
                }}
                inputValue={inputLoc}                
                onChange={selectLocation}
                placeholder={"Choose a Location"}
                styles={styleSelect}
                components={animatedComponents} 
                value={locationData.filter(obj => searchData?.LOCATION.includes(obj.LOCATION))}  
                isMulti 
                />
            <TextField
            className={SubLedgerCostClasses.textField}
            //disabled
            margin="normal"
            size="small"
            variant="standard"
            name="AMOUNT"
            label="AMOUNT ALLOCATED"
            type="text"
            sx={{ width: 250 }}
            onChange={onChange}
            value={searchData.user}
            //default_user={JSON.parse(localStorage.getItem("userData"))?.username}
          />
     <div>
            <Button
              className={SubLedgerCostClasses.textField}
              type="submit"
              variant="contained"
              sx={{ width: "120px" }}
              // startIcon={<SearchIcon />}
            >
              Allocate
            </Button>
            <Button
              variant="contained"
              sx={{ width: "120px" }}
              onClick={onReset}
              startIcon={<RestartAltIcon />}
            >
              Reset
            </Button>
          </div>
        </Stack>
      </Grid>
    </Box>
  );

  return (
    <Box className={SubLedgerCostClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={SubLedgerCostClasses.boxDiv}>
            <div className={SubLedgerCostClasses.uploaddiv}>
              <h4>SubLedger Cost</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
        <Box display="flex"
              justifyContent="flex-end"
              alignItems="flex-end" className={SubLedgerCostClasses.boxDiv}>
            <div className={SubLedgerCostClasses.uploaddiv}>
            <Button
                disableRipple
                variant="contained"
                sx={{ marginTop: "15px", textAlign: "right" }}
                onClick={toggleDrawer("right", true)}
                // startIcon={<SearchIcon />}
              >
                Allocate
              </Button>
              <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                transitionDuration={700}
              >
                {searchPanel("right")}
              </Drawer>
       </div>
          </Box>
        </Grid>
      </Grid>

      {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
        tabledata &&
        <Table
          tableData={tabledata}
          //handleDelete={handleDelete}
          handleSearchClick={handleSearchColumn}
          //handleCopyDown={handleCopyDown}
          freeze={freeze}
          handleSearch={handleChange}
          searchText={inputValue}
          handleEdit={true}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          headCells={headCells}
          setTabledata={setTabledata}
          allData={allData}
          pageName="subledgercost"
        />
      )}

      {/* <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError || isSuccess} autoHideDuration={3000} onClose={handleMsgClose} sx={{height: "100%"
            }} anchorOrigin={{
          vertical: "top",
          horizontal: "center"          
        }}>
      
          <Alert
            onClose={handleMsgClose}
            severity={SubLedgerCostData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          { SubLedgerCostData?.message}
          </Alert>
          </Snackbar>
      </Stack> */}
    </Box>
  );
};

export default SubLedgerCost;
