export const getPosts = async (queryParams) => {
    const res = await fetch(
 `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts?` + new URLSearchParams(queryParams),)
 return await res.json()
}