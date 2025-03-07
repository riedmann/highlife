interface HotelRequest {
  header: {
    actor: string;
    user: string;
    password: string;
    version: string;
  };
  request: {
    hotelId: number;
    checkIn: string; // ISO date format (YYYY-MM-DD)
    nights: number;
    guests: number;
    nationality: string; // Country code (e.g., "DE")
  };
}
