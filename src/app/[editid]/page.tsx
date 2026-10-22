import EditCreateForms from "@/components/forms/EditCreateForms";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";

const Page = async () => {
  // const allEditBookData = await prisma.bookData.findUnique({
  //   include: {
  //     authorData: true,
  //   },
  // });

  const writerList = await prisma.authorData.findMany();
  // if (author === null) {
  //   return (
  //     <>
  //       <section className="grid h-dvh place-items-center">
  //         <h1 className="flex place-items-center gap-2 font-mono text-2xl font-semibold">
  //           Crete your Book Details
  //           <BookAIcon className="hover:size-20 hover:duration-300" />
  //         </h1>
  //       </section>
  //     </>
  //   );
  // }

  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="w-full">
          <CardTitle className="text-center font-mono text-2xl font-semibold">
            Edit 📝
          </CardTitle>
        </CardHeader>
        <EditCreateForms writer={writerList} />
      </Card>
    </section>
  );
};

export default Page;
