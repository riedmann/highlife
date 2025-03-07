export interface ApiRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  bodytype: "json" | "xml" | "form-data";
  header: Record<string, string>;
  body?: object;
  xmlbody?: object;
}

export interface InhouseFormat {
  header: {
    target: string;
  };
  request: {
    hotelId: number;
    checkIn: string; // Format: YYYY-MM-DD
    checkOut: string; // Format: YYYY-MM-DD
    nights: number;
    guests: number;
    nationality: string;
  };
}
