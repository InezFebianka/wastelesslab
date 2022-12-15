import FormSlab from "../components/FormSlab";
import style from '../style/resultpage.module.css'
function ResultPage() {
    
    return (
      <div className={style.result}>
          <FormSlab msg="Add Slab" input="150px"/> 
      </div>
    );
}

export default ResultPage;