import { UrlMap } from '@/app/lib/data/urls';


// Number of elements per page for every data model.
export const PageSizes = { product: 20, rawMaterial: 20 };


// Add query parameters to base URL.
function addQueryParams(baseUrl, queryParams): string {
  const url = new URL(baseUrl);
  const searchParams = new URLSearchParams();

  Object.keys(queryParams).forEach(key => {
    searchParams.set(key, String(queryParams[key]));
  });

  url.search = searchParams.toString();
  return url.href;
}


// Get a string from another with every non-alphanumerical character removed.
export function cleanString(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
}


// Get datetime string, from a given one, in pt-BR format.
export function formatDateTimeString(
  dateTime: string, includeTime: boolean = true, longMonth: boolean = true
  ): string {
  const date = new Date(dateTime);
  const options = {
    year: 'numeric',
    month: longMonth ? 'long' : 'numeric',
    day: 'numeric'
  }
  if (includeTime) {
    options.hour = options.minute = 'numeric';
  }
  return date.toLocaleDateString('pt-BR', options);
}


// Multiply a number for 100 and return result as percentage.
export function asPercentage(n: number): string {
  return (n * 100).toFixed(2) + '%';
}


// Check whether datetime string has passed.
export function hasDateTimePassed(dateTime: string): boolean {
  const refDateTime = new Date(dateTime);
  return Date.now() >= refDateTime.getTime();
}


// Change "page" field in a query object for appropriate "offset" and "limit" ones.
export function setBoundaries(controller: string, query?: object): object {
  if (!query || !query.page) {
    return;
  }
  query.offset = PageSizes[controller] * (query.page - 1);
  query.limit = PageSizes[controller];
  delete query.page;
}


// Get complete route based on controller, expected keys and query data.
export function buildRoute(
  controller: string, keys: Array, query: object): string {
  const route = keys ?
    `${UrlMap[controller]}/${keys.join('/')}`
    : UrlMap[controller];

  if (query) {
    const url = new URL(route);
    const searchParams = new URLSearchParams();

    Object.keys(query).forEach(key => {
      searchParams.set(key, String(query[key]));
    });

    url.search = searchParams.toString();
    return url.href;
  }

  return route;
}
