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
          <SelectValue placeholder="pays" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>pays</SelectLabel>
            <SelectItem value="dd1">rr</SelectItem>
            <SelectItem value="dd2">rr</SelectItem>
            <SelectItem value="dd3">dd</SelectItem>
            <SelectItem value="dd4">dd</SelectItem>
            <SelectItem value="dd5">dd</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="date" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>date</SelectLabel>
            <SelectItem value="dd1">ee</SelectItem>
            <SelectItem value="dd2">ee</SelectItem>
            <SelectItem value="dd3">ee</SelectItem>
            <SelectItem value="dd4">ee</SelectItem>
            <SelectItem value="dd5">ee</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className="px-3 py-2">Filter</Button>
    </div>
  );
}
