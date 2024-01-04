import React, { useState, ReactNode } from "react";
import './Dropdown.css';
import { Favorite } from "../types";
import { Button } from "antd";

interface DropdownProps {
   name: string;
   items?: Favorite[];
   component?: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ name, items, component }) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   const handleItemClick = (Item: string) => {
      setIsOpen(false);
   };

   return (
      <div className="dropdown">
         <Button className="dropdown-toggle" onClick={handleToggle}>
            {name}
         </Button>
         {isOpen && (
            <div className="dropdown-menu">
               {items && items.map((item) => (
                  <div
                     key={item.id}
                     className="dropdown-item"
                     onClick={() => handleItemClick(item.title)}
                  >
                     {item.title}
                  </div>
               ))}
               {component && !items && (
                  <div className="dropdown-component">
                     {component}
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default Dropdown;