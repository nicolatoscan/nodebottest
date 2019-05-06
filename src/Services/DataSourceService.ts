import * as request from "request"
import axios from "axios"
import Track from "../Model/Track";
import Artist from "../Model/Artist";


export default class DataSourceService {

    private static baseUrl = "http://ws.audioscrobbler.com/2.0/?format=json&api_key=" + process.env.LAST_KEY + "&"

    constructor() {
    }

    public static async searchTracks(q: string): Promise<Track[]> {

        let data = (await axios.get(DataSourceService.baseUrl + "method=track.search&track=" + q)).data
        if (data.error)
            return []

        let tracks: Track[] = data.results.trackmatches.track
        return tracks;
    }

    public static async searchArtistsMbid(q: string): Promise<string> {

        let data = (await axios.get(DataSourceService.baseUrl + "method=artist.search&limit=5&artist=" + q)).data
        if (data.error)
            return null

        let artists: Artist[] = data.results.artistmatches.artist
        let mbids: string[] = artists.map(a => a.mbid).filter(m => m != null && m != "")
        return (mbids.length <= 0 ? null : mbids[0])
    }

    public static async getArtistInfo(mbid: string): Promise<Artist> {

        let data = (await axios.get(DataSourceService.baseUrl + "method=artist.getinfo&mbid=" + mbid)).data
        if (data.error)
            return null

        let artist: Artist = data.artist
        return artist
    }

    public static async getSimilarTracks(mbid: string): Promise<Track[]> {
        let data = (await axios.get(DataSourceService.baseUrl + "method=track.getsimilar&mbid=" + mbid)).data
        if (data.error)
            return []

        let tracks: Track[] = data.similartracks.track
        return tracks
    }

    public static async getTrackInfo(mbid: string): Promise<Track> {
        let data = (await axios.get(DataSourceService.baseUrl + "method=track.getinfo&mbid=" + mbid)).data
        console.log(mbid)
        if (data.error)
            return null
        return data.track
    }

    public static async getTrackImage(mbid: string): Promise<string> {
        let track = await DataSourceService.getTrackInfo(mbid)
        let url = null;
        if (track && track.album && track.album.image.length > 0)
            url = track.album.image.slice(-1).pop()["#text"]
        return url
    }

    public static async getLastTracks(username: string): Promise<Track[]> {
        let data = (await axios.get(DataSourceService.baseUrl + "method=user.getrecenttracks&user=" + username)).data
        if (data.error)
            return []

        let tracks: Track[] = data.recenttracks.track
        return tracks
    }

    public static async getTopTracks(username: string): Promise<Track[]> {
        let data = (await axios.get(DataSourceService.baseUrl + "method=user.gettoptracks&user=" + username)).data
        if (data.error)
            return []

        let tracks: Track[] = data.toptracks.track
        return tracks
    }

}