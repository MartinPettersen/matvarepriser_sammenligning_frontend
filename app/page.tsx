import Image from "next/image";
import ProductsContainer from "./components/ProductsContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-red-400 flex-col items-center justify-between p-24">
      <ProductsContainer />
    </main>
  );
}
