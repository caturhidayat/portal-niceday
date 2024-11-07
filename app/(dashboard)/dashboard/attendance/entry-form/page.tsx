import FormCreateAttendance from "./form-create-attendance";

export default function Page() {
    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="container m-auto p-4">
                <FormCreateAttendance />
            </div>
        </div>
    );
}