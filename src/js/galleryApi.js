import axios from 'axios';

export class GalleryApi {
  #apiKey = '18667452-b6cf3b15ecb06490e1251bb0b';
  #baseUrl = "https://pixabay.com/api";

  constructor() {
    this.searchQuery = '';
    this.perPage = 40;
    this.page = 1;
    this.imageType = 'photo';
    this.orientation = 'horizontal';
    this.safeSearch = true;
  }

  async fetchPhotos() {
    const params = {
      q: this.query,
      image_type: this.imageType,
      orientation: this.orientation,
      per_page: this.perPage,
      key: this.#apiKey,
      page: this.page,
    };

    try {
      const response = await axios.get(`${this.#baseUrl}/`, { params });
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery.trim();
  }

  set query(value) {
    this.searchQuery = value;
  }
}

