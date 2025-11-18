export const GetRes = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resoureces`);
        const result = await res.json()
        console.log(result)
        return result
    } catch (err) {
        throw new Error('something went wrong!')
    }

}