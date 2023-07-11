/** @type {import('./$types').PageLoad} */
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export async function load({ params }) {
    const { id } = params;
    const course = await fetch(`${PUBLIC_API_ENDPOINT}/courses/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) =>
        res.json()
    );
    return { course };
}
