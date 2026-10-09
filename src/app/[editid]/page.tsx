import EditCreateForms from "@/components/forms/EditCreateForms";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";

const Page = async () => {
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
        <EditCreateForms />
      </Card>
    </section>
  );
};

export default Page;
