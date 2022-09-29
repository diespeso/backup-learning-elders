export const evaluacion_pre = '/evaluacion-pre'
export const evaluacion_post = '/evaluacion-post'

export const postData = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}