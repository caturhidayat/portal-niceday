import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getData } from "./actions/actions";

type TGetData = {
  id: number;
  name: string;
};

export default async function SelectInput<T>({
  path,
  name,
  label,
}: {
  path: string;
  name: string;
  label: string;
}) {
  const data = await getData<TGetData>(path);
  return (
    <Select
      name={name}
      //   defaultValue={employees.departmentId?.toString()}
      required
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select a ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {data ? (
            data.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="">No departments available</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
