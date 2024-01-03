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

export function FilterSelect() {
  return (
    <div className="flex flex-col items-center gap-3 mt-3">
      <Select>
        <SelectTrigger>
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
        <SelectTrigger>
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
    </div>
  );
}
