import * as request from "request"


class DataSourceService {

    private baseUrl = "http://ws.audioscrobbler.com/2.0/?format=json&api_key=" + process.env.LAST_KEY + "&"

    constructor() {
    }

    public searchTracks(q: string, callback: (tracks: any[]) => void = null) {
        request.get(this.baseUrl + "method=track.search&track=" + q, (err, response, data) => {
            if (err != null) {
                return;
            }

            data = JSON.parse(data)
            let tracks: any[] = data["results"]["trackmatches"]["track"]
            callback(tracks)
        });

    }

    public getSimilarTracks(q: string, callback: (tracks: string[]) => void = null) {
        this.getTrackMbid(q, (mbid) => {
            request.get(this.baseUrl + "method=track.getsimilar&mbid=" + mbid, (err, response, data) => {
                if (err != null) {
                    return;
                }

                data = JSON.parse(data)
                let tracks: any[] = data["similartracks"]["track"]
                callback(tracks.map(t => t["name"] + " - " + t["artist"]["name"]))
            });

        })

    }

    public getTrackInfo(mbid: string, callback: (info: any) => void = null) {
        if (mbid === null || mbid === undefined) {
            callback(null)
            return;
        }

        request.get(this.baseUrl + "method=track.getInfo&mbid=" + mbid, (err, response, data) => {
            if (err != null) {
                return;
            }
            data = JSON.parse(data)
            callback(data["track"])
        });

    }

    public getTrackMbid(q: string, callback: (mbid: string) => void = null) {
        this.searchTracks(q, (tracks) => callback(tracks.length > 0 ? tracks[0]["mbid"] : null))
    }

    public getTrackImage(q: string, callback: (url: string) => void = null) {
        this.getTrackMbid(q, (mbid) => {
            this.getTrackInfo(mbid, (info) => {
                if (info) {
                    let images: any[] = info["album"]["image"]
                    let url = images[images.length - 1]["#text"]
                    callback(url)
                } else {
                    callback(null)
                }

            })
        })
    }

    public getImageFromUrl(url: string, callback: (url: string) => void = null) {
        request.get(url, (err, res, data) => callback(data));
    }

    public getLastTracks(username: string, callback: (tracks: string[]) => void = null) {
        request.get(this.baseUrl + "method=user.getrecenttracks&user=" + username, (err, response, data) => {
            if (err != null || data["error"]) {
                callback(["user non trovato"])
                return;
            }

            data = JSON.parse(data)
            let tracks: any[] = data["recenttracks"]["track"]
            callback(tracks.map(t => t["name"] + " - " + t["artist"]["#text"] ))
        });
    }

}

const dataSourceService = new DataSourceService()
export default dataSourceService;