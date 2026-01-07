import { SMHIdata, SortedTime } from "../../types";
import NavBar from "@/app/components/NavBar";
import {
  parseSwe,
  formatWeekDay,
  formatDayMonth,
  formatDateKey,
} from "@/app/utils";
import { places } from "@/app/conf";
import GraphFill from "@/app/components/GraphFill";

async function getData(placeName: string) {
  const placeData = places.find(
    (element) => parseSwe(element.name) === placeName,
  );

  if (!placeData) {
    console.log(`Place not found: ${placeName}`);
    return null;
  }

  try {
    const res = await fetch(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${placeData.longitude}/lat/${placeData.latitude}/data.json`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.log("error: " + e);
    return null;
  }
}

export default async function Place({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: SMHIdata | null = await getData(id);

  if (!data || !data.timeSeries) {
    return (
      <main className="bg-bg dark:bg-dark-bg">
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          <p className="text-orange">
            Unable to load weather data. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  const sortedTime: SortedTime[] = [];
  data.timeSeries.map((stamp) => {
    const validTime = new Date(stamp.validTime);
    const weekDay: string = formatWeekDay(validTime);

    if (sortedTime[sortedTime.length - 1]?.weekDay != weekDay) {
      const dayTimeSeries: SortedTime["timeSeries"] = [];
      data.timeSeries.map((s) => {
        const vT = new Date(s.validTime);

        if (formatDateKey(validTime) === formatDateKey(vT)) {
          dayTimeSeries.push(s);
        }
      });
      sortedTime.push({
        weekDay: weekDay,
        weekDayDate: validTime,
        timeSeries: dayTimeSeries,
      });
    }
  });

  return (
    <main className="bg-bg dark:bg-dark-bg">
      <NavBar />
      <div className="flex flex-col divide-y divide-divide px-6">
        {sortedTime.map(({ weekDay, weekDayDate, timeSeries }, index) => {
          return (
            <div
              key={index + "_weekday"}
              className="h-32 w-full items-center flex flex-row"
            >
              <div className="flex-none w-8 mx-2 mt-10">
                <div className="text-xs text-orange">{weekDay}</div>
                <div className="text-xs text-orange">
                  {formatDayMonth(weekDayDate)}
                </div>
              </div>
              <div className="w-full h-full min-h-32">
                <GraphFill data={timeSeries} />
              </div>
            </div>
          );
        })}
      </div>
      {id} page
    </main>
  );
}
