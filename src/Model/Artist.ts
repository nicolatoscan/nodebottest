export default class Artist {
    public name: string;
    public mbid: string;
    public image: { size: string, "#text": string }
    public bio: { summary: string, content: string }
}