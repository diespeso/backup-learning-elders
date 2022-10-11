export const evaluacion_pre = '/evaluacion-pre'
export const evaluacion_post = '/evaluacion-post'
export const evaluacion_results = {
    pre: '/userEvaluation/pre',
    post: '/userEvaluation/post' // TODO
}

const CURRENT_PAGE_URL = '/currentPageCookie';

export const postData = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const getData = async (url: string, queryObj?: any) => {
    let queryString;
    if (queryObj) {
        queryString = '?q=' + JSON.stringify(queryObj);
        url += queryString;
    }
    const response = await fetch(url, {
        method: 'GET',
    })
    return response.json()
}

export const postCurrentPage = async (currentPage: string) => {
    return postData(CURRENT_PAGE_URL, { currentPage })
}

export const getCurrentPageCoockie = async() => {
    return getData(CURRENT_PAGE_URL)
}