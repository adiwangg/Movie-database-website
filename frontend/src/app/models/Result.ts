export class Result {
  title: string;
  poster_path: string;
  id: string; //m:xxx => movie; t:xxx => tv shows
  detail_page_url: string;

  constructor(id: string, title: string, poster_path: string, detail_page_url: string) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.detail_page_url = detail_page_url;
  }
}
