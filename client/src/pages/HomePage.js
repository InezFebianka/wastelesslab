import FormSlab from "../components/FormSlab";
import CreditFooter from "../components/CreditFooter";
import style from '../style/homepage.module.css'
function HomePage() {
    
  return (
    <div className={style.home}>
        <div className={style.header}>
          <button>SEE INSTRUCTION</button>
        </div>

        <div className={style.mainSection}>
          <div className={style.section}>
            <div className={style.headSection}>
              <h1 className={style.title}>WASTELESSLAB |</h1>
              <div className={style.desc}>
                <p>GENERATE SLAB'S </p>
                <p>MAXIMUM POSSIBLE AREA</p>
              </div>
            </div>
            <div className={style.inputSection}>
              <FormSlab msg="CALCULATE" input="700px"/>
            </div>
          </div>
        </div>

        <div className={style.footer}>
          <CreditFooter/>
        </div>
    </div>
  );
}

export default HomePage;