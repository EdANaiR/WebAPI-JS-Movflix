'use strict';

const api_key = '251ed1c012304cbabbe1bb060cadc6e3';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

/**
 *'url' ve geçişleri kullanarak bir sunucudan veri getir
 * Json verilerindeki sonuç bir 'callback' işlevine,
 *'optionalParam' varsa, isteğe bağlı bir parametre ile birlikte.
*/

const fetchDataFromServer = function (url, callback, optionalParam ) {
    fetch(url)
      .then(response => response.json())
      .then(data => callback(data, optionalParam));
}

export { imageBaseURL, api_key, fetchDataFromServer };    



