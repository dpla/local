

export default async (req, res) => {
    const { exhibitId } = req.query
    const exhibit = await loadExhibit(exhibitId)
    res.status(200).json(exhibit)
    res.end()
}

// we have to do a bunch of work to get the pages out of omeka
// because it doesn't return the pages nested and it doesn't load files

const loadAttachmentFiles = async attachment => {
    const itemUrl = `https://dp.la/api/files?item=${attachment.item.id}`
    const filesRes = await fetch(itemUrl)
    return await filesRes.json()
}

export const loadExhibit = async exhibitId => {
    const res = await fetch('https://dp.la/api/exhibitions')
    const rawExhibits = await res.json()
    if (!rawExhibits) return { notFound: true }
    const exhibitsFiltered = rawExhibits.filter((exhibit) => exhibit.slug === exhibitId)
    if (!exhibitsFiltered) return { notFound: true }
    const exhibit = exhibitsFiltered[0]

    const exhibitUrl = `https://dp.la/api/exhibition_pages?exhibit=${exhibit.id}`
    const exhibitPageRes = await fetch(exhibitUrl);
    const allPages = await exhibitPageRes.json()

    // sort the page blocks, load all the file info
    await Promise.all(allPages.map(async (page) => {
        page.page_blocks = page.page_blocks.sort((b1, b2) => {
            b1.order - b2.order
        })

        await Promise.all(page.page_blocks.map(async (block) => {
            if (block.attachments) {
                await Promise.all(block.attachments.map(async attachment => {
                    attachment.files = await loadAttachmentFiles(attachment)
                }))
            }
        }))
    }))

    // top pages are all the pages that have no parents
    const topPages = allPages
        .filter(page => page.parent === null)
        .sort((p1, p2) => p1.order - p2.order)

    exhibit.pages = topPages

    // assign all the children to their parents and sort them
    // we're assuming one level of nesting
    topPages.forEach(topPage => {
        topPage.children = allPages
            .filter(page => page.parent && page.parent.id === topPage.id)
            .sort((p1, p2) => {
                p1.order - p2.order
            })
    })

    exhibit.frontImage = exhibit?.pages[0]?.page_blocks[0]?.attachments[0]?.files[0]?.file_urls

    return exhibit
}