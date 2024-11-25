import { MdRemoveRedEye } from "react-icons/md";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/table-options";
import { IAuthor } from "@/lib/types/authors";
import { useRouter } from "next/navigation";
interface AuthorActionsDropdownProps {
  rowData: IAuthor;
}

export const AuthorActionsDropdown: React.FC<AuthorActionsDropdownProps> = ({ rowData }) => {
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger />
      <DropdownContent>
        <DropdownItem onClick={() => router.push(`/books/${rowData.slug}`)}>
          <MdRemoveRedEye className="icon" />
          <span>Ver livros do author</span>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
