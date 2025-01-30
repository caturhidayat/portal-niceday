import { useState } from "react"
import { Check, ChevronsUpDown, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Branches, Departments, User } from "./table/columns"

// Assuming these are your API endpoints
const searchEmployees = async (query: string) => {
  const res = await fetch(`/api/employees/search?q=${query}`)
  return res.json()
}

const searchDepartments = async (query: string) => {
  const res = await fetch(`/api/departments/search?q=${query}`)
  return res.json()
}

const searchBranches = async (query: string) => {
  const res = await fetch(`/api/branches/search?q=${query}`)
  return res.json()
}

export default function EmployeeForm({ employees, departments, branches} : { employees: User[], departments: Departments[], branches: Branches[] }) {
  const [employeeSearch, setEmployeeSearch] = useState("")
  const [departmentOpen, setDepartmentOpen] = useState(false)
  const [branchOpen, setBranchOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")



  return (
    <form className="space-y-4">
      <Input type="hidden" name="id" />
      
      <div>
        <Label>Name</Label>
        <Command>
          <CommandInput
            placeholder="Search employee..."
            value={employeeSearch}
            onValueChange={setEmployeeSearch}
          />
          <CommandEmpty>No employee found.</CommandEmpty>
          <CommandGroup>
            {employees?.map((employee) => (
              <CommandItem
                key={employee.id}
                value={employee.name}
                onSelect={(value) => {
                  setEmployeeSearch(value)
                  // Auto-fill other fields based on selected employee
                  setSelectedDepartment(employee.departmentId.toString())
                  setSelectedBranch(employee.branchId.toString())
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    employeeSearch === employee.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {employee.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </div>

      <div>
        <Label>Department</Label>
        <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={departmentOpen}
              className="w-full justify-between"
            >
              {selectedDepartment
                ? departments?.find((dept) => dept.id.toString() === selectedDepartment)?.name
                : "Select department..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search department..." />
              <CommandEmpty>No department found.</CommandEmpty>
              <CommandGroup>
                {departments?.map((department) => (
                  <CommandItem
                    key={department.id}
                    value={department.id.toString()}
                    onSelect={(value) => {
                      setSelectedDepartment(value)
                      setDepartmentOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedDepartment === department.id.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {department.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label>Branch</Label>
        <Popover open={branchOpen} onOpenChange={setBranchOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={branchOpen}
              className="w-full justify-between"
            >
              {selectedBranch
                ? branches?.find((branch) => branch.id.toString() === selectedBranch)?.name
                : "Select branch..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search branch..." />
              <CommandEmpty>No branch found.</CommandEmpty>
              <CommandGroup>
                {branches?.map((branch) => (
                  <CommandItem
                    key={branch.id}
                    value={branch.id.toString()}
                    onSelect={(value) => {
                      setSelectedBranch(value)
                      setBranchOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedBranch === branch.id.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {branch.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit">
        <Save className="mr-2 h-4 w-4" />
        Update
      </Button>
    </form>
  )
}