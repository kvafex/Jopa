import { useState } from "react";
import icon from "./assets/icon.png";
import BioPage from "./components/Bio/BioPage";
import TargetPage from "./components/Target/TargetPage";
import MatrixPage from "./components/Matrix/MatrixPage";
//import MathanPage from "./components/Mathan/MathanPage";
//import GamePage from "./components/Game/GamePage";
import Canvas3DPage from "./components/Canvas3DPage/Canvas3DPage";
import Canvas2DPage from "./components/Canvas2DPage/Canvas2DPage";
import CalculatorPage from "./components/Calculator/CalculatorPage";
import Tabs from "./components/Tabs/Tabs";
import "./App.css";

export enum EPAGE { BIO, TARGET, MATRIX, CALC, GRAPH2D, GRAPH3D}

const App: React.FC = () => {
  const [page, setPage] = useState<EPAGE>(EPAGE.GRAPH3D);
  const [isTabs, setTabs] = useState(false);

  return (
      <div className="App">
        <div className="flex_r">
          <img onClick={() => setTabs(!isTabs)} className="fixIcon mar_b mar_r" src={icon} width="50px" height="50px"/>
          <div className="fixIcon">{ isTabs ? <Tabs showPage = {setPage} setTabs = {setTabs}/> : <></>}</div>
        </div>
          { page === EPAGE.BIO && <BioPage />}
          { page === EPAGE.TARGET && <TargetPage />}
          { page === EPAGE.MATRIX && <MatrixPage />}
          { page === EPAGE.CALC && <CalculatorPage />}
          { page === EPAGE.GRAPH2D && <Canvas2DPage />}
          { page === EPAGE.GRAPH3D && <Canvas3DPage />}
      </div>
    );  

}
export default App;
