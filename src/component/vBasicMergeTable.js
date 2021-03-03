import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TextField, {ChkBox, Sg3TxtField, NumberField} from './CellComp';
import "./BasicTable.scss";
import "./vBasicMergeTables2.scss";

const SMALL_HEIGHT = 24;
const NORMAL_HEIGHT = 30;

class VBasicMergeTable extends React.Component {
  constructor(props) {
    super(props);

    this.passRowColIdx = [];
    this.propsRows = []; // shouldComponentUpdate 비교용도
    this.tableData = [];    // 실시간 테이블 데이터 관리\
    this.prevTableData = [];    // 실시간 테이블 데이터 관리

    this.firstRender = false;
    this.tableDivH = 0;

    this.end = 0;

    this.state = {
      selectedIdx: 0,
      selectedCol: "",      
      firstColPx: 0,

      tableHeight: (this.props.rowHeight * this.props.rows.length),   // tbody height
      scroll: {
        top: 0,
        index: 0,
      }      
    };
  }

  componentDidMount() {

    this.tableData=[];
    this.props.rows.map((row, rowIdx) => {
        let rowData = {};
        this.props.refColumns.map((col, colIdx) => {                
            rowData[col.id] = row[col.id]
        })
        this.tableData.push(rowData);
    })

    // Init vitualization table info(height, index, end index)
    this.tableDivH = document.getElementById('vTableDiv').clientHeight;
    console.log("vBasicMergeTable componentDidMount :", this.tableDivH);
    this.end = Math.ceil((this.tableDivH * 1) / this.props.rowHeight);

    console.log("comdidM : ", this.props.rowHeight, this.tableDivH);

    // 초기화 정보를 기반으로 rerender
    if(!this.firstRender) {
      this.firstRender = true;
      this.forceUpdate();
    }

    // window evnet listener
    // window.addEventListener('resize', this.onResize)
  }

  // onResize = () => {
  //   let clientWidth  = document.getElementById('vTableDiv').clientWidth;

  //   console.log("[onResize]clientWidth : ", clientWidth);

  //   // 첫번째 컬럼 px스로 변경
  //   console.log("this.props.refColumns[0] : ", parseFloat(this.props.refColumns[0].width));
  //   let percent = parseFloat(this.props.refColumns[0].width);
  //   let firstColPx = Math.ceil(clientWidth / percent);

  //   console.log("firstColPx :", firstColPx);
  //   this.setState({
  //     firstColPx: firstColPx,
  //   })

  // }

  onScroll = ({ target }) => {
    let state = this.state;

    console.log("target scroll : ", target.scrollTop);

    let scrollTop = target.scrollTop;
    let rowHeight = this.props.rowHeight;
    let tableHeight = this.tableDivH;
    let index = Math.floor(scrollTop / rowHeight);
    state.scroll.index = index;
    state.scroll.top = (scrollTop / rowHeight) * rowHeight;

    this.end = index + Math.ceil((tableHeight * 1) / rowHeight);

    console.log("scrollTop : ", scrollTop, index, this.end, rowHeight, state.scroll.top);


    this.setState(state);
  }

  generateRows = () => {
    let rowHeight = this.props.rowHeight
    let rows = this.props.rows
    let index = this.state.scroll.index
    let items = [];

    while(index < this.end) {

      // last index초과
      if (index >= rows.length) {
        index = rows.length
        break
      }

      const rowAttrs = {
        style: {
          position: "absolute",
          //position: "relative",
          top: (index * rowHeight),
          left: 0,
          height: rowHeight,
          lineHeight: `${rowHeight}px`,
          width: '100%',
        },
        className: `tr ttr ${(index % 2) === 0 ? 'tr-odd' : 'tr-even'}`
      }

      items.push(
        <tr {...rowAttrs} key={index}>

          {/* empty td for full percent width */}
          <td style={{width: '1px' , padding: 0, border: 0}}> </td>
          {this.props.refColumns.map((col, colIdx) => {

            let width = col.width;
            let minWidth = col.minWidth;            

            

            return (
              <td className={clsx(colIdx===0?"borderZero":"")} key={colIdx} style={{width: `calc(${width})`, minWidth: minWidth}}>
              {/* <td key={colIdx} style={{flex: `1 0 auto`}}> */}
                {rows[index][col.id]}
              </td>
            )
          })
          }
        </tr>
      )    
      index++
    } 

    return items;
  }

  componentDidUpdate(prevProps, prevState){
      // rows props이 update 돼었을 경우 this.tableData 'update'
      // let prevTableData = [];
      
      if(this.tableData.length > 0) {
        this.prevTableData = [];
        this.prevTableData = JSON.parse(JSON.stringify(this.tableData));
      }
      
      if(JSON.stringify(prevProps.rows) != JSON.stringify(this.props.rows)) {
        this.tableData=[];
        this.props.rows.map((row, rowIdx) => {
            let rowData = {};
            this.props.refColumns.map((col, colIdx) => {
                rowData[col.id] = row[col.id]
            })
            this.tableData.push(rowData);
        })
      }

      // table data 요청이 있을경우  
      if(this.props.getTableData===2) {
          if(typeof this.props.onGetTableData !="undefined") {
              this.props.onGetTableData(this.prevTableData);
          }

          this.prevTableData = JSON.parse(JSON.stringify(this.tableData));
      }

      // isWritePropValue === false => props call
      if(typeof prevProps.isWritePropValue !="undefined" && prevProps.isWritePropValue) {
        if(typeof this.props.onSetIsWritePropValue != "undefined") {
          this.props.onSetIsWritePropValue(false);
        }
      }
  }

  componentWillUnmount() {
    console.log("basicmerge table unmount...");
  }

  updateTableData = (row, col, value) => {
    if(typeof this.props.isWritePropValue != "undefined" && !this.props.isWritePropValue)
      this.tableData[row][col] = value;

      // if(typeof this.props.onKeyDown!="undefined") {
      //   this.props.onKeyDown(value);
      // }
  }

  onRowClickHandler = (e, row) => {
    this.setState({
      selectedIdx: row
    });
    if (typeof this.props.onRowClickHandler == "undefined") return;

    this.props.onRowClickHandler(e, row);
  };

  onChangeTableData = (row, colKey, value, cellType) => {
    //console.log("onChangeTableData : ", row, colKey, value, cellType);

    if(typeof this.props.onChangeTableData!="undefined") {
      this.props.onChangeTableData(row, colKey, value, cellType);
    }    
  };

  getTableCellFormat = (cellType, value, rowIdx, colKey, colIdx) => {
    // 지원포맷, text, checkbox
    // rowIdx, colIdx => event에 사용될 예정.
        
    const key = String(rowIdx) + String(colKey);
    if (cellType === "text") {
      return (
        <TextField 
            row={rowIdx}
            colKey={colKey}
            colIdx={colIdx}
            value={value}
            isWritePropValue={this.props.isWritePropValue}
            cellType={cellType}
            updateTableData={this.updateTableData}
        />
      );
    } 
    else if(cellType==="number") {
      return (        
        <NumberField
            row={rowIdx}
            colKey={colKey}
            colIdx={colIdx}
            value={value}
            isWritePropValue={this.props.isWritePropValue}
            cellType={cellType}
            updateTableData={this.updateTableData}
        />
      );

    }
    else if(cellType === "checkbox") {
      if (cellType === "checkbox") {
        let isChecked = value === 1 ? true : false;
  
        return (
          <ChkBox
            checked={isChecked}
            isWritePropValue={this.props.isWritePropValue}
            row={rowIdx}
            colKey={colKey}
            colIdx={colIdx}
            cellType={cellType}
            updateTableData={this.updateTableData}
          />
        );
      }
    }
    else if (cellType === "sg3") {
      let refVal;
      if(typeof this.props.userRef!="undefined" && typeof this.props.userRef[rowIdx][colIdx] != "undefined") {
        refVal = this.props.userRef[rowIdx][colIdx];
      }

      return (
        //value
        <Sg3TxtField
          tableActive={this.props.tableActive}
          refVal={refVal}
          value={value}
          isWritePropValue={this.props.isWritePropValue}
          row={rowIdx}          
          colKey={colKey}
          colIdx={colIdx}
          cellType={cellType}
          cellPos={this.props.cellPos}
          updateTableData={this.updateTableData}
          onMoveRow={this.onMoveRow}
          onMoveCol={this.onMoveCol}
        />
      );
    }
    else if (cellType === "value") {
      return value;
    }
    else if (cellType === "col") {
      return <div>{value} </div>;
    }
  };

  onTDClick = (e, row, colKey) => {
    this.setState({
      selectedCol: colKey
    });

    let tag;
    if(typeof this.props.tag != "undefined") {
      tag = this.props.tag;
    }
    if (typeof this.props.onTDClickHandler != "undefined") {
      this.props.onTDClickHandler(row, colKey, tag);
    }
  };  

  onMoveRow = (val, col) => {
    console.log("onMoveRow : ", val, col);
    if (typeof this.props.onMoveRow != "undefined") {
      this.props.onMoveRow(val, col);
    }
  };

  onMoveCol = (val, col) => {
    console.log("onMoveCol : ", val, col);
    if (typeof this.props.onMoveCol != "undefined") {
      this.props.onMoveCol(val, col);
    }
  };

  checkPassIndex = (r, c) => {
    let isPass = false;
    for (let data of this.passRowColIdx) {
      if (data.row === r && data.col === c) {
        isPass = true;
        break;
      }
    }

    return isPass;
  };

  render() {

    // -- div가 더 클경우 rowlen에 맞춤
    // let tbHeight = (this.tableDivH > this.state.tableHeight)
    // ? this.state.tableHeight + 2
    // : this.tableDivH;

    let tbHeight = this.tableDivH;
    console.log("this.tableDivH : ", this.tableDivH);
    let tableHeight = this.state.tableHeight;   // rowHeight * rowsLen (body height)

    let rows = this.props.rows.slice(0, this.props.rows.length);
    //let rows = this.props.rows.slice(0, 12);    

    this.propsRows = JSON.parse(JSON.stringify(this.props.rows));

    let containerH = this.props.containerHeight;
    let containerSy = {};
    if (containerH === "auto") {
      containerSy.height = "auto";
    } else {
      containerSy.height = containerH;
    }

    this.passRowColIdx = [];

    for (let cols of this.props.columns) {
      if(Array.isArray(cols)) {
        
      
        for (let col of cols) {
          if (typeof col.rowSpan != "undefined") {
            let start, end;
            start = col.rowSpan.r + 1; // 자기자신은 제외
            end = col.rowSpan.r + col.rowSpan.count;

            for (start; start < end; start++) {
              let data = { row: start, col: col.rowSpan.c };
              this.passRowColIdx.push(data);

              // rowSpan, colSpan같이 있을경우
              if (typeof col.colSpan != "undefined") {
                let cStart, cEnd;
                cStart = col.colSpan.c + 1; // 자기자신은 제외
                cEnd = col.colSpan.c + col.rowSpan.count;
                for (cStart; cStart < cEnd; cStart++) {
                  let data2 = { row: start, col: cStart };
                  this.passRowColIdx.push(data2);
                }
              }
            }
          }
        }
      }
    }

    let tableMinWidth = "100%";
    if (typeof this.props.tableMinWidth != "undefined") {
      tableMinWidth = this.props.tableMinWidth;
    }

    return (
      <div id="vTableDiv" style={{height: "100%"}}>
        <div className="vtContainer">
          <table
            className="table vtable"
            style={{ minWidth: tableMinWidth, height: tbHeight }}
            onScroll={this.onScroll}
          >
            <thead
              className={clsx(
                this.props.headerVisible === true ? "theader" : "disnone"
              )}
            >
              {this.props.columns.map((cols, rowIdx) => {
                let colTRstyle = "ttr";
                if (typeof this.props.colVisible != "undefined" && this.props.colVisible.length > 0) {
                  if (this.props.colVisible[rowIdx] === 0) {
                    colTRstyle = "disnone";
                  }
                }

                let stickyPos = 0;
                //stickyPos = (this.props.cellSmall === true) ? stickyPos = SMALL_HEIGHT*rowIdx : stickyPos = NORMAL_HEIGHT*rowIdx;
                stickyPos = this.props.rowHeight*rowIdx;
                
                return (
                  // <tr className={clsx(colTRstyle, this.props.cellSmall === true?"colSmall":"colSmall")} key={rowIdx} >
                  <tr className={clsx(colTRstyle, "tr")} key={rowIdx} style={{width: '100%', height: this.props.rowHeight}} >
                    
                    {/* empty th for full percent width */}
                    <th style={{width: '1px', padding: 0, border: 0, position: "sticky", top:stickyPos}}> </th>

                    {Array.isArray(cols) && cols.map((col, colIdx) => {
                      let colStyle = col.width;
                      let minWidth = col.minWidth;

                      if (col.width === "auto") {
                        colStyle = "";
                      }

                      let rSpan = 1;
                      let cSpan = 1;
                      if (typeof col.rowSpan != "undefined") {
                        rSpan = col.rowSpan.count;
                      }
                      if (typeof col.colSpan != "undefined") {
                        cSpan = col.colSpan.count;
                      }

                      const key = String(col.id) + String(rowIdx);

                      if (!this.checkPassIndex(rowIdx, colIdx)) {
                        return (
                          <th
                            className={clsx("theader tth", this.props.cellSmall === true?"ttrSmall":"ttrNormal", colIdx===0?"borderZero":"")}
                            style={{ width: `calc(${colStyle})`, minWidth:minWidth , position: "sticky", top:stickyPos}}
                            //style={{flex: `1 0 auto` , position: "sticky", top:stickyPos}}
                            key={key}
                            rowSpan={rSpan}
                            colSpan={cSpan}
                          >
                            <span key={key}>{col.text} </span>
                          </th>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </thead>
          {/* </table>
          <table className="tMergeTable" style={{ minWidth: tableMinWidth }}> */}
            <tbody className="ttbody tbody" style={{height: tableHeight, maxHeight: tableHeight}}>
              {this.generateRows()}
              {/* {rows.map((row, rowIdx) => {
                
                return (
                  <tr
                    id={rowIdx}
                    className={clsx(
                      "ttr",
                      this.props.selectedIdx === rowIdx ? "ttr-selected" : "",
                      this.props.colorFocusRows[rowIdx] === 1 ? "eopColor" : ""
                    )}
                    style={{
                      background:
                        this.props.colorFocusRows2[rowIdx] === 1
                          ? this.props.highlightBgColor
                          : ""
                    }}
                    onClick={(e) => this.onRowClickHandler(e, rowIdx)}
                    key={rowIdx}
                  >
                    {this.props.refColumns.map((col, colIdx) => {
                      const value = row[col.id];
                      const colType = col.type;
                      const key = String(col.id) + String(rowIdx);
                      let colStyle = col.width;
                      if (col.width === "auto") {
                        colStyle = "";
                      }

                      //-----------------------------------------------------
                      //Check Row Span
                      //-----------------------------------------------------
                      let rSpan = 1;
                      let isTDrender = true;
                      let lastRspanIdx = 0;

                      if (typeof col.rowMerge != "undefined") {
                        for (let idxData of col.rowMergeIndex) {
                          lastRspanIdx = idxData[1];
                          if (idxData[0] === rowIdx) {
                            rSpan = idxData[1] - idxData[0] + 1;
                            isTDrender = true; // rowspan 처음 인덱스 render
                            break;
                          } else {
                            isTDrender = false;
                          }
                        }
                      }

                      // 마지막 merge row가 td rowindex보다 작을경우는 td render
                      if (lastRspanIdx < rowIdx) {
                        isTDrender = true;
                      }

                      if (isTDrender) {
                        // 강조하려는 cell background color
                        let cellBg=""
                        if(Array.isArray(this.props.cellBgArray)) {
                          if(Array.isArray(this.props.cellBgArray[rowIdx]) && this.props.cellBgArray[rowIdx][colIdx] === 1) {
                            cellBg = "cellbgRed";
                          }
                        }

                        return (
                          <td
                            className={clsx(
                              this.props.cellSmall === true
                                ? "cellSmall"
                                : "cellNormalSize",
                              "ttd ttdBorder",
                              this.props.selectedCol === col.id
                                ? "td-selected"
                                : "",
                              col.type === "col" ? "colBgColor" : "",
                              cellBg
                            )}
                            style={{ width: colStyle }}
                            key={key}
                            rowSpan={rSpan}
                            onClick={(e) => this.onTDClick(e, rowIdx, col.id)}                            
                          >
                            <span
                              className="spanCenter"
                              style={{ width: "100%" }}
                              key={key}
                            >
                              {this.getTableCellFormat(colType, value, rowIdx, col.id, colIdx)}
                            </span>
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

VBasicMergeTable.propTypes = {  
  columns: PropTypes.array.isRequired,
  refColumns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  colorFocusRows: PropTypes.array, // data record background color array
  colorFocusRows2: PropTypes.array, // data record background color array
  highlightBgColor: PropTypes.string, // highlight background color
  isWritePropValue: PropTypes.bool.isRequired,
  cellBgArray: PropTypes.array,     // 강조하려는 cell index(row, col)

  headerVisible: PropTypes.bool,
  containerHeight: PropTypes.string.isRequired,
  tableMinWidth: PropTypes.string.isRequired, // table min-width (min-width 이하로 줄어들경우 스크롤)
  selectedIdx: PropTypes.number,
  cellSmall: PropTypes.bool,

  onChangeTableData: PropTypes.func,
  onRowClickHandler: PropTypes.func,
  onTDClick: PropTypes.func,

  rowHeight: PropTypes.number.isRequired,
  tableHeight: PropTypes.number.isRequired,
};

VBasicMergeTable.defaultProps = {  
  columns: [],
  refColumns: [], // row data reference column
  rows: [],
  colorFocusRows: [],
  colorFocusRows2: [],
  highlightBgColor: "#b36d6d", // default highlight bg color
  isWritePropValue: false,
  headerVisible: true,
  containerHeight: "500px",
  tableMinWidth: "100%",
  selectedIdx: 0, // selected row index, default : 0
  cellSmall: false,
  // onChangeTableData: PropTypes.func.isRequired, // parameter : => (row, colKey, value, cellType)
  // onRowClickHandler: PropTypes.func.isRequired, // parameter : => (e, row)
  // onTDClick: PropTypes.func.isRequired, // parameter : => (row, col)

  rowHeight: 35,
  tableHeight: 300
};
export default VBasicMergeTable;
