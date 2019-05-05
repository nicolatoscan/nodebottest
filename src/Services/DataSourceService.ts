import * as request from "request"
import axios from "axios"


export default class DataSourceService {

    private static baseUrl = "http://ws.audioscrobbler.com/2.0/?format=json&api_key=" + process.env.LAST_KEY + "&"

    constructor() {
    }

    public static async searchTracks(q: string): Promise<any[]> {

        let data = (await axios.get(DataSourceService.baseUrl + "method=track.search&track=" + q)).data

        let tracks: any[] = data["results"]["trackmatches"]["track"]
        return tracks;
    }

    public static async searchArtists(q: string): Promise<string> {

        let data = (await axios.get(DataSourceService.baseUrl + "method=artist.search&limit=5&artist=" + q)).data

        let artists: any[] = data["results"]["artistmatches"]["artist"]
        let mbids: string[] = artists.map(a => a["mbid"])
        return (mbids.length <= 0 ? null : mbids[0])
    }

    public static async getArtistInfo(mbid: string): Promise<{ name: string, bio: string }> {

        let data = (await axios.get(DataSourceService.baseUrl + "method=artist.getinfo&mbid=" + mbid)).data

        let artist = data["artist"]
        return {
            name: artist ? artist["name"] : "",
            bio: (artist && artist["bio"]) ? artist["bio"]["summary"] : ""
        }
    }



    public static async getSimilarTracks(q: string): Promise<string[]> {
        let mbid = await DataSourceService.getTrackMbid(q)
        let data = (await axios.get(DataSourceService.baseUrl + "method=track.getsimilar&mbid=" + mbid)).data

        let tracks: any[] = data["similartracks"]["track"]
        return tracks.map(t => t["name"] + " - " + t["artist"]["name"])
    }

    public static async getTrackInfo(mbid: string): Promise<any> {
        if (mbid === null || mbid === undefined) {
            return null;
        }

        let data = (await axios.get(DataSourceService.baseUrl + "method=track.getInfo&mbid=" + mbid)).data
        return data["track"]
    }

    public static async getTrackMbid(q: string): Promise<string> {
        let tracks = await DataSourceService.searchTracks(q)
        return (tracks.length > 0 ? tracks[0]["mbid"] : null)
    }

    public static async getTrackImage(q: string): Promise<string> {
        let mbid = await DataSourceService.getTrackMbid(q)
        if (mbid == null || mbid == undefined)
            return null

        let info = await DataSourceService.getTrackInfo(mbid)
        if (info == null || info == undefined)
            return null

        let images: any[] = info["album"]["image"]
        let url = images[images.length - 1]["#text"]
        return url
    }

    public static async getLastTracks(username: string): Promise<string[]> {
        let data = (await axios.get(DataSourceService.baseUrl + "method=user.getrecenttracks&user=" + username)).data

        let tracks: any[] = data["recenttracks"]["track"]
        return (tracks.map(t => t["name"] + " - " + t["artist"]["#text"]))
    }

    public static async getTopTracks(username: string): Promise<string[]> {
        let data = (await axios.get(DataSourceService.baseUrl + "method=user.gettoptracks&user=" + username)).data

        let tracks: any[] = data["toptracks"]["track"]
        return (tracks.map(t => t["name"] + " - " + t["artist"]["name"]))
    }

}