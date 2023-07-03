import axios from 'axios';

export async function axiosAPI(config: any) {
    try {
        const res = await axios(config);
        if (res?.status !== 200) {
            return { data: null };
        }
        return { data: res?.data };
    } catch (error) {
        return { error: 'Bad request internal api' };
    }
}
