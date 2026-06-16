import express, { type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mock Database
const PLACES = [
  {
    id: '1',
    name: 'Aura Dining',
    category: 'Fine Dining',
    rating: 4.9,
    location: 'Zeytinburnu, Istanbul',
    priceLevel: '$$$$',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    description: 'A sensory journey through modern Mediterranean cuisine.',
  },
  {
    id: '2',
    name: 'Vesper Lounge',
    category: 'Boutique Bar',
    rating: 4.8,
    location: 'Bebek, Istanbul',
    priceLevel: '$$$',
    image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&q=80&w=800',
    description: 'Exclusive cocktails in a minimalist, underground setting.',
  },
  {
    id: '3',
    name: 'Ethos Space',
    category: 'Creative Hub',
    rating: 4.7,
    location: 'Kadikoy, Istanbul',
    priceLevel: '$$',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
    description: 'Where art meets community in the heart of the city.',
  },
];

let bookings: any[] = [];

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "LuxeReserve API is live", status: "online" });
});

app.get("/api/places", (req: Request, res: Response) => {
  res.json(PLACES);
});

app.post("/api/bookings", (req: Request, res: Response) => {
  const { placeId, date, time } = req.body;

  if (!placeId || !date || !time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newBooking = {
    id: Math.random().toString(36).substr(2, 9),
    placeId,
    date,
    time,
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  console.log("New Booking Received:", newBooking);

  res.status(201).json({
    message: "Reservation confirmed",
    booking: newBooking
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 LuxeReserve API running on http://localhost:${PORT}`);
});