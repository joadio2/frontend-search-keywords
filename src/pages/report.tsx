import MainReport from "../components/reporte/mainReport";
import { useSearchParams } from "react-router-dom";
import React from "react";
export default function Report() {
  const [searchParams] = useSearchParams();
  const [data, setData] = React.useState<any>(null);
  const title = searchParams.get("title");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (!title) return;
        const res = await fetch(
          `https://sea-lion-app-xhc8a.ondigitalocean.app/get-report?title=${encodeURIComponent(
            title
          )}`
        );
        console.log(res);
        if (!res.ok) throw new Error("Error al obtener el reporte");
        const json = await res.json();
        setData(json.report);
      } catch (err) {}
    };

    fetchData();
  }, [title]);

  if (!title) return <div>No se encontro el titulo</div>;

  return (
    <>
      <MainReport data={data} />
    </>
  );
}
