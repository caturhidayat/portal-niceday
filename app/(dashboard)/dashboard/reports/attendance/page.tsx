import FormSelectData from "./FormSelectData";

export default async function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div className="">
        <FormSelectData />
      </div>
      <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2"></div>
    </div>
  );
}
