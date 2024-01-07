import React, { useState, ReactNode } from "react";
import './Dropdown.css';
import { Button } from "antd";

interface DropdownProps {
   name: string;
   component: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ name, component }) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   const handleOnMouseLeave = () => {
      setTimeout(() => {
         setIsOpen(false);
      }, 200);
   };

   return (
      <div className="dropdown" onMouseLeave={handleOnMouseLeave}>
         <Button className="dropdown-toggle" onClick={handleToggle}>
            {name}
         </Button>
         {isOpen && (
            <div className="dropdown-menu">
               <div className="dropdown-component">
                  {component}
               </div>
            </div>
         )}
      </div>
   );
};

export default Dropdown;