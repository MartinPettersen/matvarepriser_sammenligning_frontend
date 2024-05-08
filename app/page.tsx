import Image from "next/image";
import ProductsContainer from "./components/(home)/ProductsContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      <ProductsContainer />
    </main>
  );
}
