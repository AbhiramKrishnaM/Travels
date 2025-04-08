import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Creating tourist places...");

  // Create tourist places one by one
  await prisma.touristPlace.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Miami Beach",
      location: "Florida, USA",
      description: "Beautiful beaches and vibrant nightlife",
      image_url: "https://example.com/miami-beach.jpg",
    },
  });

  await prisma.touristPlace.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Aspen Mountains",
      location: "Colorado, USA",
      description: "World-class skiing and mountain scenery",
      image_url: "https://example.com/aspen.jpg",
    },
  });

  await prisma.touristPlace.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Times Square",
      location: "New York, USA",
      description: "The heart of Manhattan with theaters and attractions",
      image_url: "https://example.com/times-square.jpg",
    },
  });

  await prisma.touristPlace.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Grand Canyon",
      location: "Arizona, USA",
      description: "One of the world's most spectacular natural wonders",
      image_url: "https://example.com/grand-canyon.jpg",
    },
  });

  await prisma.touristPlace.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "Yellowstone National Park",
      location: "Wyoming, USA",
      description:
        "America's first national park with incredible geothermal features",
      image_url: "https://example.com/yellowstone.jpg",
    },
  });

  console.log("Tourist places created successfully!");
  console.log("Creating hotels...");

  // After all tourist places are created, create hotels one by one
  await prisma.hotel.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Grand Palace Resort",
      address: "123 Beachfront Ave, Miami, FL",
      description: "Luxury resort with ocean views",
      amenities: "Pool, Spa, Restaurant, Gym",
      price_per_night: 299.99,
      place_id: 1,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Beachside Inn",
      address: "456 Coastal Road, Miami, FL",
      description: "Affordable hotel steps from the beach",
      amenities: "Pool, Free Breakfast, WiFi",
      price_per_night: 149.99,
      place_id: 1,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Mountain View Lodge",
      address: "567 Alpine Road, Aspen, CO",
      description: "Cozy lodge with mountain views",
      amenities: "Fireplace, Hot Tub, Restaurant",
      price_per_night: 199.99,
      place_id: 2,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Ski Chalet Deluxe",
      address: "789 Powder Lane, Aspen, CO",
      description: "Luxury chalet with ski-in/ski-out access",
      amenities: "Sauna, Fireplace, Equipment Rental",
      price_per_night: 349.99,
      place_id: 2,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "City Center Hotel",
      address: "890 Downtown Blvd, New York, NY",
      description: "Modern hotel in the heart of the city",
      amenities: "Restaurant, Business Center, Gym",
      price_per_night: 249.99,
      place_id: 3,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Broadway Suites",
      address: "123 Theater District, New York, NY",
      description: "Suites with easy access to Broadway shows",
      amenities: "Kitchenette, Concierge, Laundry",
      price_per_night: 279.99,
      place_id: 3,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: "Canyon View Resort",
      address: "543 Rim Drive, Grand Canyon Village, AZ",
      description: "Spectacular views of the Grand Canyon",
      amenities: "Guided Tours, Restaurant, Gift Shop",
      price_per_night: 229.99,
      place_id: 4,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: "Desert Star Lodge",
      address: "678 Canyon Road, Tusayan, AZ",
      description: "Comfortable accommodations near the South Rim",
      amenities: "Pool, Shuttle Service, Restaurant",
      price_per_night: 179.99,
      place_id: 4,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 9 },
    update: {},
    create: {
      name: "Geyser View Inn",
      address: "345 Park Entrance Rd, West Yellowstone, MT",
      description: "Family-friendly hotel near the west entrance",
      amenities: "Wildlife Tours, Breakfast, WiFi",
      price_per_night: 189.99,
      place_id: 5,
    },
  });

  await prisma.hotel.upsert({
    where: { id: 10 },
    update: {},
    create: {
      name: "Old Faithful Lodge",
      address: "789 Geyser Road, Yellowstone National Park, WY",
      description: "Historic lodge with views of Old Faithful",
      amenities: "Dining Hall, Ranger Programs, Gift Shop",
      price_per_night: 259.99,
      place_id: 5,
    },
  });

  console.log(`Database has been seeded with 5 tourist places and 10 hotels.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
