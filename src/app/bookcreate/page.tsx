import BookCreateForms from "@/components/forms/BookCreateForms";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookSphere Book Create",
  description: "BookSphere || Book Create Section",
};

const page = async () => {
  const writerList = await prisma.authorData.findMany();
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="w-full">
          <CardTitle className="text-center font-mono text-2xl font-semibold">
            Create 📔
          </CardTitle>
        </CardHeader>
        {/* Call Component */}

        <BookCreateForms writer={writerList} />
      </Card>
    </section>
  );
};

export default page;
