import React from "react";
import "./BasicTable.scss";

export class Sg3TxtField extends React.Component {
    constructor(props) {
        super(props);
        this.valueArr = ["0", "0"];
        this.state = {
            row: props.row,
            colIdx: props.colIdx,
            colKey: props.colKey,
            cellType: props.cellType,
            value: props.value,
        }

        this.value = props.value;

        this.propValue = props.value;
        this.stateValue = props.value;

        //console.log("sgtxtField cost: ", this.state);
    }

    componentDidUpdate(prevProps, prevState){
        // this.props.cellPos 이랑, row, colIdx가 같으면 input focus
        if(typeof this.props.tableActive!="undefined" && !this.props.tableActive){
            return;
        }
        if(Array.isArray(this.props.cellPos) &&  this.props.cellPos[0]===this.state.row && this.props.cellPos[1]===this.state.colIdx) {
            this.props.refVal.current.focus();
        }        
    }

    shouldComponentUpdate(nextProps, nextState) {
        // prop value save
        // this.propValue =  nextProps.value;

        // if(this.state.row === 0 && this.state.colIdx === 5) {
        //     console.log("cellval : ", nextProps.value, this.props.value, nextState);
        //     console.log("cellval : ", nextProps.isWritePropValue, this.props.isWritePropValue, nextState);
        // }

        // if(nextProps.isWritePropValue) {            
        
        //     // prop으로 써야할 경우 state Value를 prop Value로 초기화
        //     this.value = this.propValue;
        //     this.stateValue = this.propValue;        
        //     if(nextProps.value===this.props.value) {
        //         if(nextProps.cellPos[0]===this.state.row && nextProps.cellPos[1] === this.state.colIdx) {
        
        //             return true;
        //         }
        //         // else {
        //         //     return false;
        //         // }
        //     }
        //     return true;
        // }
        // else {
        
        //     this.value = this.stateValue;
        //     if(nextState.value === this.state.value) {
        //         if(nextProps.cellPos[0]===this.state.row && nextProps.cellPos[1] === this.state.colIdx) {
        //             return true;
        //         }
        //         // else {
        //         //     return false;
        //         // }
        //     }
        // }

        return true;
    }

    onKeyDown = (e) => {
        if (e.key >= 0 && e.key <= 9) {
            // number
            let tempHighVal = this.valueArr[1];
            let lowVal = e.key;
            this.valueArr = [tempHighVal, lowVal];
    
            const {row, colIdx} = this.state;
            let hexVal = this.valueArr[0] + this.valueArr[1];
            let decVal = parseInt(hexVal, 16); 
            
            // 편집모드만 setState
            if(!this.props.isWritePropValue) {
                this.setState({
                    value: decVal,
                })
                this.stateValue = decVal;
            }            

            if(typeof this.props.updateTableData!="undefined") {
                this.props.updateTableData(row, colIdx, decVal);
            }
        }
    
        if (e.key === "w" || e.key === "W") {
            // up
            if (typeof this.props.onMoveRow != "undefined") {
                this.props.onMoveRow(-1, this.props.colIdx);
            }
        } else if (e.key === "s" || e.key === "S") {
        // down
            if (typeof this.props.onMoveRow != "undefined") {
                this.props.onMoveRow(1, this.props.colIdx);
            }
        } else if (e.key === "a") {
          // left
            if (typeof this.props.onMoveCol != "undefined") {
                this.props.onMoveCol(-1, this.props.colIdx);
             }
        } else if (e.key === "d") {
          // right
            if (typeof this.props.onMoveCol != "undefined") {
                this.props.onMoveCol(1, this.props.colIdx);
            }
        }
    }

    checkRenderValue = () => {
        // prop value save
        this.propValue =  this.props.value;

        if(this.state.row === 0 && this.state.colIdx === 5) {
            console.log("cellval1 : ", this.props.value, this.state);
            console.log("cellval2 : ", this.props.isWritePropValue);
        }

        if(this.props.isWritePropValue) {            
        
            // prop으로 써야할 경우 state Value를 prop Value로 초기화
            this.value = this.propValue;
            this.stateValue = this.propValue;        
            if(this.props.value===this.props.value) {
                if(Array.isArray(this.props.cellPos) && this.props.cellPos[0]===this.state.row && this.props.cellPos[1] === this.state.colIdx) {        
                    return true;
                }
              
            }
            return true;
        }
        else {
            this.value = this.stateValue;
        }

        return true;

    }

    render() {
        // 렌더링할 value 체크
        this.checkRenderValue();

        //console.log("sgtxtField render: ", this.state.row, this.state.colKey, this.value, this.props.isWritePropValue);

        let valueHex = "00";

        let value = this.value;
        // if(this.props.isWritePropValue) {
        //     value = this.props.value;
        // }
        // else {
        //     value = this.state.value;
        // }
        
        valueHex = value.toString(16).padStart(2, "0");
        
        let firCh = valueHex.substring(0, 1);
        let secCh = valueHex.substring(1, 2);
        let firBg = "";
        let secBg = "";

        if (firCh === "1" || firCh === "5")       firBg = "green 50%";
        else if (firCh === "2" || firCh === "3")  firBg = "yellow 50%";
        else if (firCh === "8")                   firBg = "gray 50%";
        else if (firCh === "0")                   firBg = "white 50%";
        

        if (secCh === "1" || secCh === "5")       secBg = "green 50%";
        else if (secCh === "2" || secCh === "3")  secBg = "yellow 50%";
        else if (secCh === "8")                   secBg = "gray 50%";
        else if (secCh === "0")                   secBg = "white 50%";
    
        let refVal;
        if(typeof this.props.refVal != "undefined") {
            refVal = this.props.refVal;
        }

        let cellPos = this.props.cellPos;
        //console.log("cellPos : ", cellPos, this.props.row, this.props.colIdx);


        let element = <div className="tTxt2" ref={refVal} style={{ background: `linear-gradient(90deg, ${firBg}, ${secBg})` }} onKeyDown={this.onKeyDown}>{valueHex} </div>
        if(typeof this.props.cellPos != "undefiend") {     
            if(Array.isArray(cellPos) && cellPos[0]===this.props.row && cellPos[1]===this.props.colIdx) {

                element = <input
                    ref={refVal}
                    type="text"
                    className="tTxt2"                    
                    style={{ background: `linear-gradient(90deg, ${firBg}, ${secBg})` }}
                    readOnly
                    value={valueHex}
                    onKeyDown={this.onKeyDown}
                    />
            }            
        }
        else {
            console.log("undefined..", cellPos, this.props.row, this.props.colIdx);
            if(Array.isArray(cellPos) &&  cellPos[0]===this.props.row && cellPos[1]===this.props.colIdx) {    
                console.log("selected sg3:", cellPos);
                element = <input
                            ref={refVal}
                            type="text"
                            className="tTxt2"
                            style={{ background: `linear-gradient(90deg, ${firBg}, ${secBg})` }}
                            readOnly
                            value={valueHex}
                            onKeyDown={this.onKeyDown}
                        />
            }
        }
        
        return(
            <div>
                {element}
            </div>
        )
    }
}

export class ChkBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            row: props.row,
            colKey: props.colKey,
            cellType: props.cellType,
        }

        this.checked = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // value가 다를경우만 render!

        if(nextProps.isWritePropValue) {
            // this.setState({
            //     checked: this.props.checked,
            // })
            this.checked = nextProps.checked;            

            return true;
        }
        else {
            this.checked = nextState.checked;            
            
            // value가 다를경우만 render!
            if(nextState.checked === this.state.checked) {
                return false;
            }            
        }

        return true;        
    }

    onChange = (e) => {

        if(e.target.checked != this.state.checked) {
            this.setState({
                checked: e.target.checked,
            })
        }

        const {row, colKey} = this.state;
        if(typeof this.props.updateTableData!="undefined") {
            this.props.updateTableData(row, colKey, e.target.checked);
        }
    }

    render() {      
        return (
            <input type="checkbox" checked={this.checked} onChange={this.onChange} />
        )        
    }
}

export class NumberField extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            row: props.row,
            colKey: props.colKey,
            initValue: props.value,
            value: props.value,
            cellType: props.cellType,
        }

        this.value = props.value;

        
    }

    shouldComponentUpdate(nextProps, nextState) {       

        if(nextProps.isWritePropValue) {
            // this.setState({
            //     value: this.props.value,
            // })
            this.value = nextProps.value;            

            return true;
        }
        else {
            this.value = nextState.value;            
            
            // value가 다를경우만 render!
            if(nextState.value === this.state.value) {
                return false;
            }
            
        }

        return true;
    }

    componentDidUpdate(prevProps, prevState){
        //props이 바뀌면 state update        

        if(prevProps.value != this.props.value) {
             this.setState({
                 value: this.props.value,
             })
         } 
    }
  
    onKeyDown = (e) => {    
        if(e.keyCode<48 && e.keyCode > 57){
            return;
        }

        this.setState({
            value: e.target.value,
        })

        console.log("onKeyDown:", e.target.value);
  
        const {row, colKey, value} = this.state;
        // update props data (row, col)
        if(typeof this.props.updateTableData!="undefined") {
            //console.log("field : ", row, colIdx, value);
            this.props.updateTableData(row, colKey, e.target.value);
        }
    }

    onChange = (e) => {     

        if(e.target.value != this.state.value) {
            this.setState({
                value: e.target.value,
            })
        }
        
        console.log("e.target.value : ", e.target.value)
        const {row, colKey, value} = this.state;
        // update props data (row, col)
        if(typeof this.props.updateTableData!="undefined") {
            //console.log("field : ", row, colIdx, value);
            this.props.updateTableData(row, colKey, e.target.value);
        }
    }
    onChange2 = (e) => {     
    }
  
    render() {
  
      return (
        // <input type="text" className="tTxt2" value={this.value} onKeyDown={this.onKeyDown}  onChange={this.onChange} />

        // remove spin button (in scss style)
        <input type="number" className="tTxt2" value={this.value} onChange={this.onChange} />
      )
    }
}

class TextField extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            row: props.row,
            colIdx: props.colIdx,
            colKey: props.colKey,
            value: props.value,
            cellType: props.cellType,
        }
        this.value = props.value;
        this.propValue = props.value;
        this.stateValue = props.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // value가 다를경우만 render!
        // if(nextProps.isWritePropValue) {
        //     // this.setState({
        //     //     value: this.props.value,
        //     // })
        //     this.value = nextProps.value; 

        //     return true;
        // }
        // else {
        //     this.value = nextState.value;            
            
        //     // value가 다를경우만 render!
        //     if(nextState.value === this.state.value) {
        //         return false;
        //     }
        // }

        return true;
    }

    componentDidUpdate(prevProps, prevState){
        //props이 바뀌면 state update        

        if(prevProps.value != this.props.value) {
             this.setState({
                 value: this.props.value,
             })
         } 
    }

    onChange = (e) => {

        if(e.target.value != this.state.value) {

            // 편집모드만 setState
            if(!this.props.isWritePropValue) {
                this.setState({
                    value: e.target.value,
                })
                this.stateValue = e.target.value;
            }
        }
        
        const {row, colKey, value} = this.state;
        // update props data (row, col)
        if(typeof this.props.updateTableData!="undefined") {
            this.props.updateTableData(row, colKey, e.target.value);
        }
    }

    checkRenderValue = () => {
        // prop value save
        this.propValue =  this.props.value;

        if(this.state.row === 0 && (this.state.colIdx === 17 || this.state.colIdx === 18)) {
            console.log("cellTxtval1 : ", this.props.value, this.state);
            console.log("cellTxtval2 : ", this.props.isWritePropValue);
        }

        if(this.props.isWritePropValue) {            
        
            // prop으로 써야할 경우 state Value를 prop Value로 초기화
            this.value = this.propValue;
            this.stateValue = this.propValue;

            return true;
        }
        else {
            this.value = this.stateValue;
        }
        return true;
    }


    render() {
        this.checkRenderValue();
        
        return(
            <input type="text" className="tTxt2" value={this.value} onChange={this.onChange} />
        )
    }
}

export default TextField;