import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { Button } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon, RevertIcon } from "./icons";
import { useListDataStore } from "../store";

type CardProps = {
  title: ListItem["title"];
  description?: ListItem["description"];
  id: ListItem["id"];
  isDeleted?: boolean; 
};

export const Card: FC<CardProps> = ({ title, description, id, isDeleted = false }) => {
  // state for showing description
  const [isOpen, setIsOpen] = useState<Boolean>();
  // state for animation
  const [isRemoving, setIsRemoving] = useState(false);
  const deleteItem = useListDataStore((state) => state.deleteItem);
  const revertItem = useListDataStore((state) => state.revertItem);

  // setting timeout for animation
  const handleAction = (action: (id: number) => void) => {
    setIsRemoving(true);
    setTimeout(() => action(id), 500);
  };

  return (
    <div className={`border border-black px-2 py-1.5 transition-all duration-500 ${isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title} ({id})</h1>
        {!isDeleted ? (
          <div className="flex">
            <Button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
            <Button onClick={() => handleAction(deleteItem)}>
              <XMarkIcon />
            </Button>
          </div>
        ) : (
          <Button onClick={() => handleAction(revertItem)}>
            <RevertIcon />
          </Button>
        )}
      </div>
      {!isDeleted && description && (
        <div className={`transition-all duration-300 overflow-hidden ${ isOpen ? 'max-h-64' : 'max-h-0' }`}>
          <p className="text-sm">{description}</p>
        </div>
      )}
    </div>
  );
};
