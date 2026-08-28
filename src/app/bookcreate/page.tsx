import BookCreateForms from "@/components/forms/BookCreateForms";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookSphere Book Create",
  description: "BookSphere || Book Create Section",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="w-full">
          <CardTitle className="text-center text-xl">Create Book</CardTitle>
        </CardHeader>
        {/* Call Component */}
        <BookCreateForms />
      </Card>
    </section>
  );
};

export default page;
