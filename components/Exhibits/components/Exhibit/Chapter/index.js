import TextBlock from "./components/TextBlock"
import MediaBlock from "./components/MediaBlock"
import scss from "./Chapter.module.scss"
import Carousel from "react-material-ui-carousel";

const Chapter = ({parentPage}) => {

    const pages = new Array(parentPage) //.concat(parentPage.children)

    return (
        <div className={scss.chapter}>
            {pages.map(page => {
                console.log(`PAGE: ${page.slug}`)
                page.page_blocks.map((block, index) => {
                    console.log(`BLOCK: ${block.id}`)
                    return (
                        <div key={`page-blocks-${index}`}>
                            {block.text && (<TextBlock data={block}/>)}
                            { ! block.text && (
                                <section className={scss.media_block__section}>FOO
                                    {block.attachments && block.attachments.map((attachment, index) => {
                                        console.log(`ATTACHMENT ${attachment.id}`)
                                        return (<MediaBlock key={`media-block-${index}`} data={attachment}/>)
                                    })}
                                </section>
                            )}
                        </div>
                    )
                })
            })}
        </div>
    )
}

export default Chapter