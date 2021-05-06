import TextBlock from "./components/TextBlock"
import MediaBlock from "./components/MediaBlock"
import scss from "./Chapter.module.scss"

const Chapter = ({ chapter }) => {
  return (
    <div className={scss.chapter}>
      {chapter.page_blocks.map((block, index) => {
        return (
          <div key={`page-blocks-${index}`}>
            {block.text &&
              <TextBlock data={block} />
            }
            {block.attachments && block.attachments.map((attachment) => {
              return (<MediaBlock data={attachment}/>)
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Chapter