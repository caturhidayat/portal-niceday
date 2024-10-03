import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52g",
            amount: 200,
            status: "success",
            email: "a@example.com",
        },
        {
            id: "728ed52h",
            amount: 150,
            status: "failed",
            email: "b@example.com",
        },
        {
            id: "728ed52i",
            amount: 250,
            status: "pending",
            email: "c@example.com",
        },
        {
            id: "728ed52j",
            amount: 300,
            status: "success",
            email: "d@example.com",
        },
        {
            id: "728ed52k",
            amount: 350,
            status: "failed",
            email: "e@example.com",
        },
        {
            id: "728ed52l",
            amount: 400,
            status: "pending",
            email: "f@example.com",
        },
        {
            id: "728ed52m",
            amount: 450,
            status: "success",
            email: "g@example.com",
        },
        {
            id: "728ed52n",
            amount: 500,
            status: "failed",
            email: "h@example.com",
        },
        {
            id: "728ed52o",
            amount: 550,
            status: "pending",
            email: "i@example.com",
        },
        {
            id: "728ed52p",
            amount: 600,
            status: "success",
            email: "j@example.com",
        },
        {
            id: "728ed52q",
            amount: 650,
            status: "failed",
            email: "k@example.com",
        },
        {
            id: "728ed52r",
            amount: 700,
            status: "pending",
            email: "l@example.com",
        },
        {
            id: "728ed52s",
            amount: 750,
            status: "success",
            email: "m@example.com",
        },
        {
            id: "728ed52t",
            amount: 800,
            status: "failed",
            email: "n@example.com",
        },
        {
            id: "728ed52u",
            amount: 850,
            status: "pending",
            email: "o@example.com",
        },
        {
            id: "728ed52v",
            amount: 900,
            status: "success",
            email: "p@example.com",
        },
        {
            id: "728ed52w",
            amount: 950,
            status: "failed",
            email: "q@example.com",
        },
        {
            id: "728ed52x",
            amount: 1000,
            status: "pending",
            email: "r@example.com",
        },
        {
            id: "728ed52y",
            amount: 1050,
            status: "success",
            email: "s@example.com",
        },
        {
            id: "728ed52z",
            amount: 1100,
            status: "failed",
            email: "t@example.com",
        },
        {
            id: "728ed530",
            amount: 1150,
            status: "pending",
            email: "u@example.com",
        },
        {
            id: "728ed531",
            amount: 1200,
            status: "success",
            email: "v@example.com",
        },
        {
            id: "728ed532",
            amount: 1250,
            status: "failed",
            email: "w@example.com",
        },
        {
            id: "728ed533",
            amount: 1300,
            status: "pending",
            email: "x@example.com",
        }
    ];
}

export default async function DataTab() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
