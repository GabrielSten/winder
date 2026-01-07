import { places } from "@/app/conf";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeSearch = searchParams.get("placeName");
  const place = places.find((place) => {
    return place.name.toLowerCase().normalize() === placeSearch;
  });
  if (place) {
  } else {
    throw new Error(`Place ${placeSearch} not found`);
  }
  return new Response(JSON.stringify(place));
}
