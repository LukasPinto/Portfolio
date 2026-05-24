import { getFiles } from "../utils/mdxFiles";
import TecnologiasGrid from "./TecnologiasGrid";

export default async function Tecnologias() {
  const images = await getFiles(["public", "tecnologias"]);

  return <TecnologiasGrid images={images} />;
}
