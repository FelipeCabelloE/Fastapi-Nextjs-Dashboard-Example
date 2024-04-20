import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AreaChart, Card, EventProps } from "@tremor/react";
import { useState } from "react";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import classes from "./Page.module.css";


	

const inter = Inter({ subsets: ["latin"] });


//rain is mm, snow is cm
const data = [
  {
    month: "January",
    rain: 0.2,
    snow: 3.7,
  },
  {
    month: "February",
    rain: 0,
    snow: 32.5,
  },
  {
    month: "March",
    rain: 0,
    snow: 11,
  },
  {
    month: "April",
    rain: 0,
    snow: 43,
  },
  {
    month: "May",
    rain: 11.3,
    snow: 1,
  },
  {
    month: "June",
    rain: 137.9,
    snow: 0,
  },
  {
    month: "July",
    rain: 64.1,
    snow: 0,
  },
  {
    month: "August",
    rain: 30.1,
    snow: 0,
  },
  {
    month: "September",
    rain: 10.8,
    snow: 0,
  },
  {
    month: "October",
    rain: 5.6,
    snow: 24.2,
  },
  {
    month: "November",
    rain: 0,
    snow: 29.4,
  },
  {
    month: "December",
    rain: 0.3,
    snow: 26.1,
  },
];





export default function HomePage() {
  const [value, setValue] = useState<null | EventProps>(null);
  const mapboxToken = 'pk.eyJ1IjoiZXhlcnQwODMiLCJhIjoiY2x2OGFuM2duMGo4czJqbXViamFwM2lqdyJ9.tXiF2I5Gr_oR0BI0s6A9yA';
  return (
    <main className="mx-auto max-w-4xl px-4 pt-8">
      <nav>
        <Link
          href="/"
          className="dark:text-teal-400 text-indigo-600 underline hover:opacity-80"
        >
          &larr; Back home
        </Link>
      </nav>
      <div className="mx-auto max-w-2xl lg:mx-0 pt-4">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Area chart
        </h2>
      </div>
      <div className="mt-12">
        <Card>
          <AreaChart
            data={data}
            index="month"
            categories={["rain", "snow"]}
            onValueChange={(v: EventProps) => setValue(v)}
          />
        </Card>
      </div>
      <div>
      <Card>
      <Map mapboxAccessToken={mapboxToken}

				mapStyle="mapbox://styles/mapbox/streets-v12"

				// style=mapbox://styles/mapbox/streets-v12

				initialViewState={{ latitude: 35.668641, longitude: 139.750567, zoom: 10 }}

				maxZoom={20}

				minZoom={3}>

				<GeolocateControl position="top-left" />

				<NavigationControl position="top-left" />

			</Map>
      </Card>
      </div>

    </main>
  );
}
