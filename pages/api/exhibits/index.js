
export default async (req, res) => {
    res.status(200).json(loadAllExhibits)
    res.end()
}

export const loadAllExhibits = async () => {
    const apiRes = await fetch('https://dp.la/api/exhibitions')
    const rawExhibits = await apiRes.json()
    return (await Promise.all(rawExhibits.map((exhibit) => loadExhibit(exhibit))))
        .sort((a, b) => b.id - a.id)
}


const loadExhibit = async exhibit => {
    const exhibitPageRes = await fetch(
        `https://dp.la/api/exhibition_pages?exhibit=${exhibit.id}`
    );
    const exhibitJson = await exhibitPageRes.json();

    const pageBlock = exhibitJson.find(
        exhibit =>
            exhibit.slug === "home-page" ||
            exhibit.slug === "homepage" ||
            exhibit.order === 0
    ).page_blocks[0];

    const itemId = pageBlock.attachments[0].item.id;
    const filesRes = await fetch(
        `https://dp.la/api/files?item=${itemId}`
    );
    const filesJson = await filesRes.json();
    exhibit.thumbnailUrl = filesJson[0].file_urls.square_thumbnail

    return exhibit
}