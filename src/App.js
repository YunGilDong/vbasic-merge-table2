import React from "react";
import VBasicMergeTable from "./component/vBasicMergeTable";
import "./App.scss";

function createRow(id, name, text, chkB) {
  return id, name, text, chkB;
}
const column1 = [
  {id: "ppc",  text: "PPC제어", type: "value",    width: "5%", minWidth: "70px", rowSpan: { r: 0, c: 0, count: 2 }},
  //{id: "state",text: "상태", type: "value", width: "15%", rowSpan: { r: 0, c: 1, count: 2 }, colSpan: { r: 0, c: 1, count: 2 }},
  {id: "state",text: "상태",    type: "value",    width: "20%", minWidth: "70px", colSpan: { r: 0, c: 1, count: 2 }},
  {id: "aring",text: "A링",     type: "value",    width: "30%", minWidth: "70px", colSpan: { r: 0, c: 3, count: 3 }},
  {id: "bring",text: "B링",     type: "value",    width: "30%", minWidth: "70px", colSpan: { r: 0, c: 6, count: 3 }},
  {id: "chk"  ,text: "chk",     type: "checkbox", width: "20%", minWidth: "70px", rowSpan: { r: 0, c: 9, count: 2 }}
];

const column2 = [
  { id: "ppc", text: "1", type: "text", width: "5%", minWidth: "70px" },

  { id: "state1", text: "stt1", type: "text", width: "10%", minWidth: "70px" },
  { id: "state2", text: "stt2", type: "text", width: "10%", minWidth: "70px" },

  { id: "aHold", text: "A-Hold", type: "text", width: "10%", minWidth: "70px" },
  { id: "aOff", text: "A-Off", type: "text", width: "10%", minWidth: "70px" },
  { id: "aJmp", text: "A-Jmp", type: "text", width: "10%", minWidth: "70px" },

  { id: "bHold", text: "B-Hold", type: "text", width: "10%", minWidth: "70px" },
  { id: "bOff", text: "B-Off", type: "text", width: "10%", minWidth: "70px" },
  { id: "bJmp", text: "B-Jmp", type: "sg3", width: "10%", minWidth: "70px" },
  {id: "chk",text: "chk123123123", type: "checkbox", width: "20%", minWidth: "70px"}
];

const rows1 = [
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 0, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 4, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 2, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 5, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 8, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 0, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 4, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 2, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 5, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 8, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 0, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 4, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 2, chk: 0 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 5, chk: 1 },
  { ppc: "불가능1", state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 8, chk: 0 },
 
];

function makeRows(count) {
  let arrRows = [];
  for (let idx = 0; idx < count; idx++) {
    arrRows.push({ ppc: "불가능1"+String(idx+1), state1: "Standby", state2: "긴급", aHold: "Hold", aOff: "Off", aJmp: "jmp", bHold: "Hold", bOff: "Off", bJmp: 1, chk: 1 },);
  }
  return arrRows;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefA = new Array(32);
    this.inputRefB = new Array(32);
    for(let idx=0; idx<32; idx++) {
      this.inputRefA[idx] = new Array(16)
      this.inputRefB[idx] = new Array(16)
    }

    //this.inputRef= []
    for(let idx=0; idx < 32; idx++) {     
        for(let j=0; j<=16; j++) {                
            this.inputRefA[idx][j] = React.createRef();        
            this.inputRefB[idx][j] = React.createRef();        
        }      
    }
  }

  state = {
    selectedIdx: 0,
    rows: [],
    getTableData: 1,    //1 ready, 2: get
    selectedCol: "",
  };

  onRowClickHandler = (e, row) => {
    this.setState({
      selectedIdx: row,    
      bringCellPos:[0,1],  
    });
  };

  onChangeTableData = (row, colKey, value, cellType) => {
    console.log(
      "onChangeTableData(locallist) => ",
      row,
      colKey,
      value,
      cellType
    );
  };

  ButtonEvent = (e) => {
    this.setState({
      rows: this.state.rows.filter((item, index) => index > 5)
    })

  }

  ButtonEvent2 = (e) => {
    console.log("button2");
    this.setState({
      getTableData: 2,  // get data
    })

  }

  onGetTableData = (info) => {
    console.log("onGetTableData : ", info);
    this.setState({
      getTableData:1,
    })
  }

  onTDClickHandler = (row, col) => {
    this.setState({
        selectedIdx: row,
        selectedCol: col,
    })
    
}

  onMoveRowB = (val, col) => {
        
    console.log("move : ",val, this.state.selectedIdx, col);
      if(val===1){
      if(this.state.selectedIdx > 31){
          return;
      }
      if(this.state.selectedIdx+val > 31){
          return;
      }
      }
      else if(val === -1) {
      if(this.state.selectedIdx < 1){
          return;
      }
      }
      this.setState({
      selectedIdx: this.state.selectedIdx+val,
      bringCellPos: [this.state.selectedIdx+val, col],

      })
      this.inputRefB[this.state.selectedIdx+val][col].current.focus();
      this.onTDClickHandler(this.state.selectedIdx+val, col)        
    }

    onMoveColB = (val, col) => {
        if(val===1){
        if(this.state.selectedCol > 15){
            return;
        }
        }
        else if(val === -1) {
        if(this.state.selectedCol < 2){
            return;
        }
        }

        this.setState({
        selectedCol: col+val,
        bringCellPos: [this.state.selectedIdx, col+val],

        })
        this.inputRefB[this.state.selectedIdx][col+val].current.focus();
        this.onTDClickHandler(this.state.selectedIdx, col+val);
    }

  render() {    

    let column12 = [];
    column12[0] = column1;
    column12[1] = column2;
    let rows = makeRows(10000);

    return (
      <div style={{height:'95vh', width:'100%'}}>
        <button onClick={this.ButtonEvent}>
          test
        </button>
        <button onClick={this.ButtonEvent2}>
          get
        </button>
        
        <div style={{ height: "100%", width:"99%" }}>
          <VBasicMergeTable
            rowHeight={25}
            userRef={this.inputRefB}
            columns={column12}
            refColumns={column2}
            rows={rows}
            headerVisible={true}
            cellSmall={false}
            containerHeight="100%"
            //tableMinWidth="600px"
            selectedIdx={this.state.selectedIdx}
            onRowClickHandler={this.onRowClickHandler}
            onChangeTableData={this.onChangeTableData}
            onTDClickHandler={this.onTDClickHandler}
            onGetTableData={this.onGetTableData}
            getTableData={this.state.getTableData}
            onMoveRow={this.onMoveRowB}
            onMoveCol={this.onMoveColB}
          />
        </div>
      </div>
    );
  }
}

export default App;
