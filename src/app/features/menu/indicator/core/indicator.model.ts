export interface AirIndicator {
    dateTime: Date;
    township: Township;
    aqi: number;
    no2?: number;
    o3?: number;
    pm10?: number;
  }

  export interface MeteoIndicator {
    dateTime: Date;
    township: Township;
    description: string;
    temperature?: number;
	  feelsLike?: number;
	  windSpeed?: number;
	  windDeg?: number;
	  humidity?: number;
  }

  export interface Township {
    inseeCode: string;
    name: string;
    population: number;
  }

