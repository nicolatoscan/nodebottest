export default class Track {
    public name: string;
    public mbid: string;
    public artist: { mbid: string, "#text": string }
    public album: {
        mbid: string,
        "#text": string
        image: { size: string, "#text": string }[]
    }
    public image: { size: string, "#text": string }
    public wiki: { summary: string, content: string }
}