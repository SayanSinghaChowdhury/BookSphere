import AuthorCreateForms from "@/components/forms/AuthorCreateForms";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookSphere Author Create ",
  description: "BookSphere || Author Login Section",
};
const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="grid w-sm place-items-center">
        <CardHeader className="w-full">
          <CardTitle className="text-center text-xl">Login Author</CardTitle>
        </CardHeader>
        {/* Call Component */}
        <AuthorCreateForms />
      </Card>
    </section>
  );
};

export default page;
