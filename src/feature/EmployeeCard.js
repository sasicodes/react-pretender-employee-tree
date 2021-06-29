import React from "react";

const EmployeeCard = ({ name, team, designation, image, className }) => {
  return (
    <div className={`employee_card ${className}`}>
      <div className="flex items-center justify-start">
        <img draggable={false} src={image} alt="" height={40} />
        <div className="ml-14 col align-start">
          <b>{name}</b>
          <span>{designation}</span>
          <small>{team}</small>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
