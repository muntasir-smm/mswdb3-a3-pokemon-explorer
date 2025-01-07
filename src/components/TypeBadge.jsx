// src/components/TypeBadge.jsx
import React from "react";

const TypeBadge = ({ typeName }) => {
  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "normal":
        return "bg-secondary";
      case "fire":
        return "bg-danger";
      case "water":
        return "bg-primary";
      case "grass":
        return "bg-success-subtle";
      case "electric":
        return "bg-warning";
      case "ice":
        return "bg-info-subtle";
      case "fighting":
        return "bg-danger-subtle";
      case "poison":
        return "bg-secondary";
      case "ground":
        return "bg-warning-subtle";
      case "flying":
        return "bg-info";
      case "psychic":
        return "bg-danger";
      case "bug":
        return "bg-dark";
      case "rock":
        return "bg-secondary";
      case "ghost":
        return "bg-dark-subtle";
      case "dragon":
        return "bg-primary";
      case "dark":
        return "bg-dark";
      case "steel":
        return "bg-secondary-subtle";
      case "fairy":
        return "bg-warning-subtle";
      default:
        return "bg-secondary";
    }
  };

  return (
    <span
      className={`badge text-uppercase text-white px-3 py-2 ${getTypeBadgeClass(
        typeName
      )}`}
    >
      {typeName}
    </span>
  );
};

export default TypeBadge;
