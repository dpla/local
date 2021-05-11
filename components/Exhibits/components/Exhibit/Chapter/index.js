import TextBlock from "./components/TextBlock"
import MediaBlock from "./components/MediaBlock"
import scss from "./Chapter.module.scss"
import Carousel from "react-material-ui-carousel";

const Chapter = ({parentPage}) => {

    return (
        <div className={scss.chapter}>
            {/* First, handle parent page */}
            {/* The first block of every parentPage is a small thumbnail we ignore */}
            {/* The second is text and attachments */}
            {/* Every block thereafter is attachments only */}
            <TextBlock
                key={`${parentPage.slug}-text-block`}
                data={parentPage.page_blocks[1]}/>
            <Carousel animation={"slide"} navButtonsAlwaysVisible={true} autoPlay={false}>
                {
                    parentPage.page_blocks
                        .filter((block, index) => { return index > 0 })
                        .map( block => { return block.attachments })
                        .flatMap( (attachment, index) => {
                             return (
                                 <MediaBlock
                                     key={`${parentPage.slug}-media-block-${index}`}
                                     data={attachment}/>
                             )
                        })
                }
            </Carousel>
            {
                parentPage.children.map( (page) => {
                    // in a child page, the first block has text and attachments, and the rest have attachments
                    return (
                        <>
                            <TextBlock
                                key={`${page.slug}-text-block`}
                                data={page.page_blocks[0]}/>
                            <Carousel animation={"slide"} navButtonsAlwaysVisible={true} autoPlay={false}>
                                {
                                    page.page_blocks
                                        .map( block => { return block.attachments })
                                        .flatMap((attachment, index) => {
                                        return (
                                            <MediaBlock key={`media-block-${index}`} data={attachment}/>
                                        )
                                    })
                                }
                           </Carousel>
                        </>
                    )

                })
            }

            {/*{pages.map(page => {*/}
            {/*    console.log(`PAGE: ${page.slug}`)*/}
            {/*    return page.page_blocks.map((block, index) => {*/}
            {/*        console.log(`BLOCK: ${block.id}`)*/}
            {/*        return (*/}
            {/*            <div key={`page-blocks-${index}`}>*/}
            {/*                {block.text && (<TextBlock data={block}/>)}*/}
            {/*                { ! block.text && (*/}
            {/*                    <section className={scss.media_block__section}>FOO*/}
            {/*                        {block.attachments && block.attachments.map((attachment, index) => {*/}
            {/*                            console.log(`ATTACHMENT ${attachment.id}`)*/}
            {/*                            return ()*/}
            {/*                        })}*/}
            {/*                    </section>*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })*/}
            {/*})}*/}
        </div>
    )
}

export default Chapter