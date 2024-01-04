import React, { useState } from "react";
import './Dropdown.css';
import { Favorite } from "../types";

interface DropdownProps {
   name: string;
   items: Favorite[];
}

const Dropdown: React.FC<DropdownProps> = ({ name, items }) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   const handleItemClick = (Item: string) => {
      setIsOpen(false);
   };

   return (
      <div className="dropdown">
         <button className="dropdown-toggle" onClick={handleToggle}>
            {name}
         </button>
         {isOpen && (
            <div className="dropdown-menu">
               {items.map((item) => (
                  <div
                     key={item.id}
                     className="dropdown-item"
                     onClick={() => handleItemClick(item.title)}
                  >
                     {item.title}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Dropdown;