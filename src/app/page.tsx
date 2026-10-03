import FormsDataList from "@/components/forms/FormsDataList";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookSphere",
  description: "BookSphere || Read Section",
};

const page = async () => {
  const allBookData = await prisma.bookData.findMany({
    include: {
      authorData: true,
    },
  });

  if (allBookData.length === 0) {
    return (
      <>
        <section className="grid h-dvh place-items-center"></section>
      </>
    );
  }

  return (
    <>
      <section className="mx-4 grid place-items-center gap-10 pt-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allBookData.map((data) => (
          <FormsDataList
            key={data.id}
            bookInfo={data}
          />
        ))}
      </section>
    </>
  );
};

export default page;
