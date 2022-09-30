import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CommonTableRev from "./commonTable/indexRev";
import TableToolbar from "./Toolbar/index";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

function descendingComparator(a, b, orderBy) {
  let c,d;
  if(orderBy == "LOCATION_NAME"){
      c=b[orderBy].slice(b[orderBy].indexOf("-")+1);
       d = a[orderBy].slice(a[orderBy].indexOf("-")+1);
       c = isNaN(c)?c:parseInt(c);
       d = isNaN(d)?d:parseInt(d);
      }else if(orderBy == "TRAN_SEQ_NO"){
        c =(b[orderBy]);
        d =(a[orderBy]); 
  }else {
  
     c = isNaN(b[orderBy])?b[orderBy]:parseInt(b[orderBy]);
     d = isNaN(a[orderBy])?a[orderBy]:parseInt(a[orderBy]);
} 
  if(c==="NULL" || d==="NULL")
  {
    if(c==="NULL" && d !=="NULL"){
      return -1
    }
    else if (d==="NULL" && c !=="NULL"){
      return 1
    }
    else{
      return 1
    }
  }
  else{
  if (c < d) {
    return -1;
  }
  if (c > d) {
    return 1;
  }
}
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable({
  tableData,
  handleSearch,
  searchText,
  handleEdit,
  seteditRows,
  editRows,
  setUpdateRow,
  headCells,
  setTabledata,
  pageName,
  allData,
  cancelReverse,
  handleClickOpen,
  valueSelect,
  setValueSelect,
  handleSearchClick,
  freeze,
  handleCopyDown,
  setDeleteId,
  setAllData,
  setInputValue,
  setSearched,
  setTabledataclone,
  tabledataclone,
  inputValue,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const[allSelectObject,setallSelectObject]=React.useState({});
  const[selectPageNo,setallSelectPageNo]=React.useState([]);
  const[singleSPageNo,setSingleSPageNo]=React.useState([]);
  const[rowsc,setselectedrows]=React.useState(0);
  const[s_object,sets_object]=React.useState({});
  const[uncheck,setuncheck]=React.useState(false);
  const handleRequestSort = (event, property) => {
    const isAsc = (orderBy === property && order === "asc");
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    // console.log("event",event,event.target)   
    // console.log(selectPageNo.includes(page),",event.target",event.target.checked)
    let stageData = [...tableData];
    if (event.target.checked && !(selectPageNo.includes(page))) {
        const newallselect=[];
        const newSelecteds = stableSort(stageData, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((value) => {  return value['SR_NO']?value['SR_NO']:value['TRAN_SEQ_NO'];});        
        allSelectObject[page]=newSelecteds;  

        for(const key in allSelectObject){
            newallselect.push(...(allSelectObject[key]))}
        setallSelectPageNo(oldArray => [...oldArray, page]);
        setSelected(oldArray => [...oldArray,...newSelecteds]);
        // seteditRows(newSelecteds);
        setselectedrows(rowsc+allSelectObject[page].length);
        
        if ( Object.keys(s_object).length > 0 && s_object.hasOwnProperty(page)){
          for(var i=0;i<s_object[page].length;i++)
          {const index = selected.indexOf(s_object[page][i]);
            if (index > -1) { 
              selected.splice(index, 1);
            }
          }
          delete s_object[page]
        
        }
        return;
    }else if(selectPageNo.includes(page)){
        console.log(23232,selected,(Object.keys(s_object)).length >1)        
        const index = selectPageNo.indexOf(page);
        const Rindex=selected;
        setselectedrows(rowsc-allSelectObject[page].length);
        if((selectPageNo.length>1) || (Object.keys(s_object)).length > 1 || !(s_object.hasOwnProperty(page))){          
          const unselectedarray=allSelectObject[page] ; 
          console.log("unselectedarray",unselectedarray)
          if (s_object.hasOwnProperty(page) && uncheck){
            setuncheck(false)
            if(s_object[page].length>0){
              for (var i= 0; i < s_object[page].length; i++) {
                const rem=unselectedarray.indexOf(s_object[page][i]);
                unselectedarray.splice(rem,1);
              }
              delete s_object[page]
              console.log("dsfs",s_object)
            } 
            
          }
          console.log("unselectedarray",unselectedarray)     
          for (var i= 0; i < unselectedarray.length; i++) {
            const rem=selected.indexOf(unselectedarray[i]);
            Rindex.splice(rem,1);
          }
          setSelected(Rindex);
          console.log("selected",Rindex) 
          if (index > -1) { 
              selectPageNo.splice(index, 1);
            }
            //seteditRows([]);
        }else{
            setSelected([]);
            //seteditRows([]);
            if (index > -1) { 
              selectPageNo.splice(index, 1);
          }}
        }
   };
  const handleClick = (event, name) => {
    if ( Object.keys(s_object).length > 0 && s_object.hasOwnProperty(page)){
      s_object[page].push(name)
    }else{
      const arr=[]
      arr.push(name)
      s_object[page]=arr
    }
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      console.log(23)
      setSingleSPageNo(oldArray => [...oldArray, page]);
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      console.log(25)
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      console.log(2345)
      setuncheck(true)
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      setuncheck(true)
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
   console.log("s_object",s_object)
    //console.log("sele newSelected",newSelected);

    setSelected(newSelected);
    //seteditRows(newSelected);    
  
  };

  const handleDelete = () => {
    const id = selected;
    const data = [...tableData];
    const updatedTable = data.filter((val) => {
      return !id.includes(val.TRAN_SEQ_NO);
    });
    setTabledata(updatedTable);
    setSelected([]);
    setDeleteId(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
  
  return (
    <>
    {(selected.length > 0 && pageName == "stage") && 
    <Button variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />} sx={{position:"fixed",top:"75px", zIndex:"99",right:"215px"}} >
    Delete</Button>
    }
      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <CommonTableRev
          handleClick={handleClick}
          handleSearchClick={handleSearchClick}
          freeze={freeze}
          handleCopyDown={handleCopyDown}
          handleSelectAllClick={handleSelectAllClick}
          handleRequestSort={handleRequestSort}
          handleChangePage={handleChangePage}
          isSelected={isSelected}
          handleSearch={handleSearch}
          searchText={searchText}
          handleEdit={handleEdit}
          rows={tableData}
          selected={selected}
          setSelected ={setSelected}
          cancelReverse={cancelReverse} 
          handleClickOpen={handleClickOpen}
          valueSelect={valueSelect}
          setValueSelect={setValueSelect}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          order={order}
          orderBy={orderBy}
          stableSort={stableSort}
          getComparator={getComparator}
          page={page}
          headCells={headCells}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          pageName={pageName}
          tableData={tableData}
          setTabledata={setTabledata}
          setAllData={setAllData}
          allData={allData}
          tabledataclone={tabledataclone}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setSearched={setSearched}
        />
      </Box>
    </>
  );
}

//export default CommonTableRev;
