
class Http {
    baseUrl;

    constructor(base) {
        this.baseUrl = base;
    }


    post(url, data, method = 'POST') {
        return fetch(this._createUrl(url), {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data),
            method: method
        })
        .then(response => response.json())
    }

    _createUrl(url, params) {
        let _str = [];
        if (!params) {
            return `${this.baseUrl}${url}`;
        }
        for (let key in params) {
            _str.push(`${key}=${params[key]}`)
        }

        return `${this.baseUrl}${url}?${_str.join('&')}`;
    }
}


export default Http;
