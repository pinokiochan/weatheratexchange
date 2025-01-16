import fetch from 'node-fetch';

export async function getTimezoneData(lat, lon){
    const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`);
    const data = await response.json();

    return {
        zoneName: data.zoneName,
        localTime: data.formatted
    };
}