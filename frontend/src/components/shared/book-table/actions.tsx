import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/table-options";

import { Dispatch, SetStateAction } from "react";
import { IBook } from "@/lib/types/books";
import { IBookState } from ".";
interface BookActionsDropdownProps {
  rowData: IBook;
  setModalState: Dispatch<SetStateAction<IBookState>>;
}

export const BookActionsDropdown: React.FC<BookActionsDropdownProps> = ({ rowData, setModalState }) => {
  return (
    <Dropdown>
      <DropdownTrigger />
      <DropdownContent>
        <DropdownItem onClick={() => setModalState({ isOpen: true, type: "delete", data: rowData })}>
          <MdDelete className="icon" />
          <span>Deletar</span>
        </DropdownItem>
        <DropdownItem onClick={() => setModalState({ isOpen: true, type: "edit", data: rowData })}>
          <MdEdit className="icon" />
          <span>Editar</span>
        </DropdownItem>
        <DropdownItem onClick={() => setModalState({ isOpen: true, type: "view", data: rowData })}>
          <MdRemoveRedEye className="icon" />
          <span>Ver</span>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
