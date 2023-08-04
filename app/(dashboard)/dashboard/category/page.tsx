import AddCategory from "@/components/category/addCategory";
import { columns } from "@/components/category/columns";
import { CategoryDataTable } from "@/components/category/dataTable";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const getAllCategory = async () => {
  return await fetch(`${process.env.NEXTAUTH_URL}/api/category`, {
    method: "GET",
  }).then((res) => res.json());
};

const CategoryPage = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (role !== "admin") {
    return <div>Not Found</div>;
  }
  const category = await getAllCategory();
  return (
    <div>
      <div className="text-center py-3 my-5">
        <h1 className=" text-4xl font-bold">Category</h1>
      </div>
      <div>
        <AddCategory />
      </div>
      <div>
        <CategoryDataTable data={category as any} columns={columns} />
      </div>
    </div>
  );
};

export default CategoryPage;
