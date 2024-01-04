import React from "react";
import Dropdown from "../components/Dropdown";
import { Slider } from "antd";
import Navbar from "../components/Navbar";

const TestScreen: React.FC = () => {
   return (
      <div>
         <Navbar />
         <h1>Test!</h1>
         <Dropdown 
            name="Select Year" 
            component={
               <div>
                  <label>Select Year:</label>
                  <Slider
                     min={1}
                     max={10}
                     step={0.1} 
                  />
               </div>
            }
         />
      </div>
   );
};

export default TestScreen;