import { useState} from 'react'
import { Navigate } from 'react-router-dom';
import style from '../style/form.module.css'
import ButtonPrimary from "../components/ButtonPrimary";
import toArr from '../helper/toArr'
import Slab from '../helper/slab';
function FormSlab(props){
    const buttonText = props.msg
    const widthInput = {
        width: props.input,
        marginLeft: "10px",
        padding: "2.5px"
    }

    const [slab, setSlab] = useState({
        slabCode: "",
        length: "",
        width: "",
        aLength: "",
        aWidth: "",
        bLength: "",
        bWidth: "",
        cLength: "",
        cWidth: "",
        dLength: "",
        dWidth: "",
    })


    function inputSlabCode (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            slabCode: value
            })
        )
    }

    function inputLength (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            length: value
            })
        )
    }

    function inputWidth (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            width: value
            })
        )
    }

    function inputLengthA (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            aLength: value
            })
        )
    }

    function inputWidthA (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            aWidth: value
            })
        )
    }

    function inputLengthB (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            bLength: value
            })
        )
    }

    function inputWidthB (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            bWidth: value
            })
        )
    }

    function inputLengthC (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            cLength: value
            })
        )
    }

    function inputWidthC (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            cWidth: value
            })
        )
    }

    function inputLengthD (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            dLength: value
            })
        )
    }

    function inputWidthD (e) {
        const {value} = e.target
        setSlab(slab=>({
            ...slab,
            dWidth: value
            })
        )
    }

    const [form, setForm] = useState({
        redirect: false
    })
    
    const toCalc = []
    function calcSlab(e){
        e.preventDefault()
        let slabs = toArr(slab.slabCode)
        let slabsLength = toArr(slab.length)
        let slabsWidth = toArr(slab.width)
        let slabsLengthA = toArr(slab.aLength)
        let slabsWidthA = toArr(slab.aWidth)
        let slabsLengthB = toArr(slab.bLength)
        let slabsWidthB = toArr(slab.bWidth)
        let slabsLengthC = toArr(slab.cLength)
        let slabsWidthC = toArr(slab.cWidth)
        let slabsLengthD = toArr(slab.dLength)
        let slabsWidthD = toArr(slab.dWidth)

        for(let i = 0; i < slabs.length; i++){
            let temp = new Slab(slabs[i] ,slabsWidth[i], slabsLength[i], slabsLengthA[i], slabsWidthA[i], slabsLengthB[i], slabsWidthB[i], slabsLengthC[i], slabsWidthC[i], slabsLengthD[i], slabsWidthD[i]) 
            toCalc.push(temp)
        }

        //
        // store to global state
        //

        setForm(form=>({
            ...form,
            redirect: true
        }))

    }
    console.log(slab);
    console.log(toCalc);
    return (
      <div >
        {form.redirect && (
            <Navigate to="/result" />
        )}  
        <form onSubmit={calcSlab} className={style.formslab}>
            <div className={style.formcontrol}>
                <label>Slab Code</label>
                <input onChange={inputSlabCode} value={slab.slabCode} type="text" placeholder="input slab code" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>Length</label>
                <input onChange={inputLength} value={slab.length}type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>Width</label>
                <input onChange={inputWidth} value={slab.width} type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>A-Length</label>
                <input onChange={inputLengthA} value={slab.aLength} type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>A-Width</label>
                <input onChange={inputWidthA} value={slab.aWidth} type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>B-Length</label>
                <input onChange={inputLengthB} value={slab.bLength} type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>B-Width</label>
                <input onChange={inputWidthB} value={slab.bWidth} type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>C-Length</label>
                <input onChange={inputLengthC} value={slab.cLength} type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>C-Width</label>
                <input onChange={inputWidthC} value={slab.cWidth} type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>D-Length</label>
                <input onChange={inputLengthD} value={slab.dLength} type="text" placeholder="in mm" style={widthInput}/>
            </div>

            <div className={style.formcontrol}>
                <label>D-Width</label>
                <input onChange={inputWidthD} value={slab.dWidth} type="text" placeholder="in mm" style={widthInput}/>
            </div>
            <div className={style.buttonStyle}>
                <ButtonPrimary msg={buttonText}/>
            </div>
        </form>
      </div>
    )
}

export default FormSlab;