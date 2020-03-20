import config from "../../config";
import { RequestService } from "../Request";
import { GiphySearchParams } from "../../types/giphy";

export class GiphyService {
  static search(params: GiphySearchParams) {
    const { searchQuery, limit, offset, rating, lang } = params;
    const searchParams = {
      api_key: config.constants.GIPHY_API_KEY,
      q: searchQuery,
      limit,
      offset,
      rating,
      lang
    };

    return RequestService.get(
      `${config.constants.GIPHY_API_SEARCH}`,
      searchParams
    );
  }
}
