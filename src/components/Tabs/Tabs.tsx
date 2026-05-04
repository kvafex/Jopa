import { EPAGE } from '../../App';

import './Tabs.css';

type TTabs = {
    showPage: (value: EPAGE) => void;
    setTabs: (value: boolean) => void;
}

const Tabs: React.FC <TTabs> = ({ showPage, setTabs }) => {
    return (<div className="flex_r iconLeft z2">
            <button className="mar_r" onClick={() => {showPage(EPAGE.BIO); setTabs(false)}}>био</button>
            <button className="mar_r" onClick={() => {showPage(EPAGE.TARGET); setTabs(false)}}>мишень</button>
            <button className="mar_r" onClick={() => {showPage(EPAGE.MATRIX); setTabs(false)}}>матрица</button>
            <button className="mar_r" onClick={() => {showPage(EPAGE.CALC); setTabs(false)}}>калькулятор</button>
            <button className="mar_r" onClick={() => {showPage(EPAGE.GRAPH2D); setTabs(false)}}>графика 2д</button>
            <button className="mar_r" onClick={() => {showPage(EPAGE.GRAPH3D); setTabs(false)}}>графика 3д</button>
        </div>);
}

export default Tabs;