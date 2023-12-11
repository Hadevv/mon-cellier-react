import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchBar() {
  return (
    <div className="flex items-center space-x-2">
      <Input type="text" className="px-3 py-2 w-80" placeholder="Search..." />
      <Button className="px-3 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </Button>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel></SelectLabel>
            <SelectItem value=""></SelectItem>
            <SelectItem value=""></SelectItem>
            <SelectItem value=""></SelectItem>
            <SelectItem value=""></SelectItem>
            <SelectItem value=""></SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel></SelectLabel>
            <SelectItem value=""></SelectItem>
            <SelectItem value=""></SelectItem>
            <SelectItem value=""></SelectItem>
            <SelectItem value=""></SelectItem>
            <SelectItem value=""></SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
