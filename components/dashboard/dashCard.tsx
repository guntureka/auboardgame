import { Data } from "@/app/(dashboard)/dashboard/page";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
const DashboardCard = ({ data }: { data: Data[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {data.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription className="h-[65px]">{item.description}</CardDescription>
            <CardContent className="flex flex-col items-center my-auto border rounded-lg">
              <div className=" mt-5">
                <p className="font-bold text-2xl">{item.data}</p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCard;
