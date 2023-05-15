export interface MapPoint {
    lat: number; // in degrees
    lon: number; // in degrees
}

export interface BoundingBox {
    minPoint: MapPoint;
    maxPoint: MapPoint;
}

export class GeoLocation {
    // Semi-axes of WGS-84 geoidal reference
    private WGS84a: number = 6378137.0; // Major semiaxis [m]
    private WGS84b: number = 6356752.3; // Minor semiaxis [m]

    public Deg2Rad(deg: number): number {
        return Math.PI * deg / 180
    }

    public Rad2Deg(rad: number): number {
        return 180 * rad / Math.PI
    }

    // Earth radius at a given latitude, according to the WGS-84 ellipsoid [m]
    public WGS84EarthRadius(lat: number) {

        // http://en.wikipedia.org/wiki/Earth_radius
        var An = this.WGS84a * this.WGS84a * Math.cos(lat);
        var Bn = this.WGS84b * this.WGS84b * Math.sin(lat);
        var Ad = this.WGS84a * Math.cos(lat);
        var Bd = this.WGS84b * Math.sin(lat);
        return Math.sqrt((An*An + Bn*Bn) / (Ad*Ad + Bd*Bd));
    }

    public getBoundingBox(point: MapPoint, halfSideInKm: number): BoundingBox {
        // Bounding box surrounding the point at given coordinates,
        // assuming local approximation of Earth surface as a sphere
        // of radius given by WGS84

        var lat = this.Deg2Rad(point.lat);
        var lng = this.Deg2Rad(point.lon);
        var halfSide = 1000 * halfSideInKm;

        // Radius of Earth at given latitude
        var radius = this.WGS84EarthRadius(lat);
        // Radius of the parallel at given latitude
        var pradius = radius * Math.cos(lat);

        var latMin = lat - halfSide / radius;
        var latMax = lat + halfSide / radius;
        var lngMin = lng - halfSide / pradius;
        var lngMax = lng + halfSide / pradius;

        const boundingBox: BoundingBox = {
            minPoint: {
                lat: this.Rad2Deg(latMin),
                lon: this.Rad2Deg(lngMin)
            },
            maxPoint: {
                lat: this.Rad2Deg(latMax),
                lon: this.Rad2Deg(lngMax)
            }
        }

        return boundingBox
    }
}

export const Geo = new GeoLocation();