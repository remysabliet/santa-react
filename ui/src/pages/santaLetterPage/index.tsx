import { MainLayout } from "../../layouts";

import Form from "./Form";

const footerContent = (
  <>
    Made with
    <a href="https://glitch.com">Glitch</a>!
  </>
);

export const SantaLetterPage: React.FC = () => {
  return (
    <>
      <MainLayout title="A letter to Santa" footerContent={footerContent}>
        <Form />
      </MainLayout>
    </>
  );
};
